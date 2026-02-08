from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import pandas as pd
import numpy as np

app = Flask(__name__)


CORS(app, resources={r"/*": {"origins": "*"}})


car_model = pickle.load(open("models/Car_LinearRegressionModel.pkl", "rb"))
bike_model = pickle.load(open("models/Bike_LinearRegressionModel.pkl", "rb"))

@app.route("/", methods=["GET"])
def home():
    return jsonify({"status": "Backend running"})



@app.route("/predict_car", methods=["POST", "OPTIONS"])
def predict_car():
    if request.method == "OPTIONS":
        return "", 200

    data = request.get_json()

    company = data["company"]
    model = data["model"]
    year = int(data["year"])
    fuel = data["fuel"]
    km = int(data["km"])

    # Same format as training
    input_df = pd.DataFrame([[company, model, year, fuel, km]],
                            columns=["company", "name", "year", "fuel_type", "kms_driven"])

    log_pred = car_model.predict(input_df)
    real_price = np.expm1(log_pred[0])

    return jsonify({"price": round(float(real_price), 2)})



@app.route("/predict_bike", methods=["POST", "OPTIONS"])
def predict_bike():
    if request.method == "OPTIONS":
        return "", 200

    data = request.get_json()

    company = data["company"]
    model = data["model"]
    year = int(data["year"])
    fuel = data.get("fuel", "Petrol")
    km = int(data["km"])

    input_df = pd.DataFrame([[company, model, year, km, fuel]],
                            columns=["company", "name", "year", "kms_driven", "fuel_type"])

    log_pred = bike_model.predict(input_df)
    real_price = np.expm1(log_pred[0])

    return jsonify({"price": round(float(real_price), 2)})


if __name__ == "__main__":
    app.run(port=5000, debug=True)
