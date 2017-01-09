import os
import requests
import time
from datetime import datetime
from flask import Flask, request, Response
try:
    import simplejson as json
except ImportError:
    import json


SIGNAGE_SPACE_ID = 'wo8ajfmrrki1'
WEATHER_CONTENT_TYPE = 'weatherAlert'

CONTENTFUL_MANAGEMENT_TOKEN = os.environ['CONTENTFUL_MANAGEMENT_TOKEN']

def create_management_entry(space_id, content_type_id, entry_id, data):
    return requests.put(
        'https://api.contentful.com/spaces/{0}/entries/{1}'.format(space_id, entry_id),
        json={'fields': data},
        headers={
            'Authorization': 'Bearer {0}'.format(CONTENTFUL_MANAGEMENT_TOKEN),
            'Content-Type': 'application/vnd.contentful.management.v1+json',
            'X-Contentful-Content-Type': content_type_id
        }
    ).json()


def publish_management_entry(space_id, entry):
    entry_id = entry['sys']['id']
    return requests.put(
        'https://api.contentful.com/spaces/{0}/entries/{1}/published'.format(space_id, entry_id),
        headers={
            'Authorization': 'Bearer {0}'.format(CONTENTFUL_MANAGEMENT_TOKEN),
            'Content-Type': 'application/vnd.contentful.management.v1+json',
            'X-Contentful-Version': str(entry['sys']['version'])
        }
    ).json()


def localize_values(json_object, locale='en-US'):
    result = {}
    for k, v in json_object.items():
        result[k] = {locale: v}
    return result


def json_response(json_object, status=200, **kwargs):
    return Response(
        json.dumps(json_object),
        status=status,
        mimetype='application/json',
        **kwargs
    )


def fix_weather_event(weather_event):
    for k in ['start', 'end']:
        fixed_timestamp = int(str(weather_event[k])[:10])
        weather_event[k] = datetime.fromtimestamp(fixed_timestamp).isoformat()
    weather_event['name'] = '{0} - {1}'.format(weather_event['regionName'], weather_event['start'])
    return weather_event


app = Flask(__name__)

@app.route('/')
def alive():
    return "I'm alive"

@app.route('/weather/<city>')
def berlin_weather(city):
    response = requests.get('http://www.dwd.de/DWD/warnungen/warnapp/json/warnings.json', headers={'User-Agent': 'Mozilla/5.0'})
    response_json = json.loads(response.text.split('warnWetter.loadWarnings(')[1][:-2])
    results = []
    region_events = []
    for event_id, event_list in response_json['warnings'].items():
        events = [event for event in event_list if event['regionName'].lower() == city]
        region_events = region_events + events

    if not region_events:
        # remove events that correspond to that region
        pass

    for index, event in enumerate(region_events):
        entry = create_management_entry(
            SIGNAGE_SPACE_ID,
            WEATHER_CONTENT_TYPE,
            'weather_{0}_{1}_{2}'.format(event_id, index, city),
            localize_values(fix_weather_event(event))
        )
        entry = publish_management_entry(
            SIGNAGE_SPACE_ID,
            entry
        )
        results.append(entry)
        time.sleep(0.1)
    return json_response({"results": results})

@app.route('/receive', methods=['POST'])
def receive():
    try:
        return json_response(request.get_json())
    except:
        return json_response({"error": "unparsable_json"}, status=400)


if __name__ == '__main__':
    app.run()
