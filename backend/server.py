import os
import requests
import time
import twitter
from hashlib import md5
from email.utils import parsedate
from datetime import datetime
from flask import Flask, Response
try:
    import simplejson as json
except ImportError:
    import json


SIGNAGE_SPACE_ID = 'wo8ajfmrrki1'
WEATHER_CONTENT_TYPE = 'weatherAlert'
TWEET_CONTENT_TYPE = 'tweet'

CONTENTFUL_MANAGEMENT_TOKEN = os.environ['CONTENTFUL_MANAGEMENT_TOKEN']
TWITTER_ACCESS_TOKEN = os.environ['TWITTER_ACCESS_TOKEN']
TWITTER_ACCESS_TOKEN_SECRET = os.environ['TWITTER_ACCESS_TOKEN_SECRET']
TWITTER_CONSUMER_TOKEN = os.environ['TWITTER_CONSUMER_TOKEN']
TWITTER_CONSUMER_SECRET = os.environ['TWITTER_CONSUMER_SECRET']

def twitter_search(term):
    twitter_api = twitter.Api(
        consumer_key=TWITTER_CONSUMER_TOKEN,
        consumer_secret=TWITTER_CONSUMER_SECRET,
        access_token_key=TWITTER_ACCESS_TOKEN,
        access_token_secret=TWITTER_ACCESS_TOKEN_SECRET
    )

    return twitter_api.GetSearch(
        term=term,
        count=1,
        result_type='recent'
    )

def fetch_management_entry(space_id, entry_id):
    headers = {
        'Authorization': 'Bearer {0}'.format(CONTENTFUL_MANAGEMENT_TOKEN),
        'Content-Type': 'application/vnd.contentful.management.v1+json',
    }

    result = requests.get(
        'https://api.contentful.com/spaces/{0}/entries'.format(space_id),
        params={'sys.id': entry_id},
        headers=headers
    ).json()

    if result['items']:
        return result['items'][0]

def create_management_entry(space_id, content_type_id, entry_id, data):
    headers = {
        'Authorization': 'Bearer {0}'.format(CONTENTFUL_MANAGEMENT_TOKEN),
        'Content-Type': 'application/vnd.contentful.management.v1+json',
        'X-Contentful-Content-Type': content_type_id
    }

    entry = fetch_management_entry(
        space_id,
        entry_id
    )

    if entry:
        entry['fields'] = data
        headers['X-Contentful-Version'] = str(entry['sys']['version'])
    else:
        entry = {'fields': data}

    return requests.put(
        'https://api.contentful.com/spaces/{0}/entries/{1}'.format(space_id, entry_id),
        json=entry,
        headers=headers
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
def weather(city):
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

@app.route('/twitter/<term>')
def tweet(term):
    results = []
    search_result = twitter_search(term)

    if search_result:
        status = search_result[0]
        tweet_data = {
            'name': 'Latest Tweet for {0}'.format(term),
            'userId': status.user.screen_name,
            'userName': status.user.name,
            'userProfilePic': status.user.profile_image_url,
            'text': status.text,
            'date': datetime(*parsedate(status.created_at)[:-2]).isoformat()
        }
        entry = create_management_entry(
            SIGNAGE_SPACE_ID,
            TWEET_CONTENT_TYPE,
            'latest_tweet_{0}'.format(md5(term.encode('utf-8')).hexdigest()),
            localize_values(tweet_data)
        )
        entry = publish_management_entry(
            SIGNAGE_SPACE_ID,
            entry
        )
        results.append(entry)

    return json_response({"results": results})


if __name__ == '__main__':
    app.run(use_reloader=True)
