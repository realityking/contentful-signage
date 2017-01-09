from flask import Flask, request, Response
try:
    import simplejson as json
except ImportError:
    import json


def json_response(json_object, status=200, **kwargs):
    return Response(
        json.dumps(json_object),
        status=status,
        mimetype='application/json',
        **kwargs
    )


app = Flask(__name__)

@app.route('/')
def alive():
    return "I'm alive"

@app.route('/receive', methods=['POST'])
def receive():
    try:
        return json_response(request.get_json())
    except:
        return json_response({"error": "unparsable_json"}, status=400)


if __name__ == '__main__':
    app.run()
