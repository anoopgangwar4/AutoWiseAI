from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import pandas as pd
import numpy as np
import os

app = Flask(__name__)
CORS(app)

# ========================
# Load ML Models
# ========================
try:
    car_model = pickle.load(open("models/Car_LinearRegressionModel.pkl", "rb"))
    bike_model = pickle.load(open("models/Bike_LinearRegressionModel.pkl", "rb"))
except Exception as e:
    print("Model loading error:", e)
    car_model = None
    bike_model = None


# ========================
# Root Route
# ========================
@app.route("/")
def home():
    return jsonify({
        "status": "success",
        "message": "Vehicle Price Prediction API is running 🚀"
    })


# ========================
# Health Check (Important for Railway)
# ========================
@app.route("/health")
def health():
    return jsonify({"status": "healthy"}), 200


# ========================
# Car Prediction
# ========================
@app.route('/predict_car', methods=['POST'])
def predict_car():
    try:
        if car_model is None:
            return jsonify({"error": "Car model not loaded"}), 500

        data = request.form

        company = data.get('company')
        car_model_name = data.get('car_model')
        year = int(data.get('year'))
        fuel_type = data.get('fuel_type')
        driven = int(data.get('kilo_driven'))

        input_df = pd.DataFrame([[company, car_model_name, year, fuel_type, driven]],
                                columns=['company', 'name', 'year', 'fuel_type', 'kms_driven'])

        log_pred = car_model.predict(input_df)
        real_price = np.expm1(log_pred[0])

        return jsonify({
            "predicted_price_inr": round(float(real_price), 2)
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 400


# ========================
# Bike Prediction
# ========================
@app.route('/predict_bike', methods=['POST'])
def predict_bike():
    try:
        if bike_model is None:
            return jsonify({"error": "Bike model not loaded"}), 500

        data = request.form

        company = data.get('company')
        bike_model_name = data.get('bike_model')
        year = int(data.get('year'))
        kilo_driven = int(data.get('kilo_driven'))
        fuel_type = data.get('fuel_type', 'Petrol')

        input_df = pd.DataFrame([[company, bike_model_name, year, kilo_driven, fuel_type]],
                                columns=['company', 'name', 'year', 'kms_driven', 'fuel_type'])

        log_pred = bike_model.predict(input_df)
        real_price = np.expm1(log_pred[0])

        return jsonify({
            "predicted_price_inr": round(float(real_price), 2)
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 400


# ========================
# Run App (For Local Testing Only)
# ========================
if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8080))
    app.run(host="0.0.0.0", port=port)
