import numpy as np
from flask import Flask, request, jsonify, render_template
import pickle
from urllib.parse import quote as url_quote
from flask_cors import CORS

# Create flask app
flask_app = Flask(__name__)
model = pickle.load(open("model.pkl", "rb"))

@flask_app.route('/')
def index():
    return 'Welcome to the testing unit'


@flask_app.route("/predict", methods=["GET"])
def predict():
    sl = float(request.json())
    sw = float(request.json())
    pl = float(request.json())
    pw = float(request.json())
    features = [np.array([sl, sw, pl, pw])]
    prediction = model.predict(features)
    print(prediction)
    return jsonify(prediction)

if __name__ == "__main__":
    flask_app.run()
