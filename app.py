from flask import Flask, jsonify, render_template
import requests

app = Flask(__name__)

STATION_ID = "IBOGOR126"
API_KEY = "d912d0a48d3347ff92d0a48d33f7ff17"
BASE_URL = f"https://api.weather.com/v2/pws/observations/current"

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/cuaca')
def get_weather():
    params = {
        "stationId": STATION_ID,
        "format": "json",
        "units": "m",
        "apiKey": API_KEY
    }
    try:
        r = requests.get(BASE_URL, params=params)
        return jsonify(r.json())
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)
