from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import pandas as pd
import numpy as np
import uuid
import re
from collections import defaultdict

app = Flask(__name__)
CORS(app)

# ========================
# Load ML models
# ========================
car_model = pickle.load(open("models/Car_LinearRegressionModel.pkl", "rb"))
bike_model = pickle.load(open("models/Bike_LinearRegressionModel.pkl", "rb"))


@app.route('/')
def home():
    return "Welcome to the Vehicle Price Prediction API!"





@app.route('/predict_car', methods=['POST'])
def predict_car():
    company = request.form.get('company')
    car_model_name = request.form.get('car_model')
    year = int(request.form.get('year'))
    fuel_type = request.form.get('fuel_type')
    driven = int(request.form.get('kilo_driven'))

    input_df = pd.DataFrame([[company, car_model_name, year, fuel_type, driven]],
                            columns=['company', 'name', 'year', 'fuel_type', 'kms_driven'])

    log_pred = car_model.predict(input_df)
    real_price = np.expm1(log_pred[0])  # Convert log price back to real INR

    return f" {np.round(real_price, 2):,.2f}"

# ----------------------------
# Bike Prediction
# ----------------------------
@app.route('/predict_bike', methods=['POST'])
def predict_bike():
    company = request.form.get('company')
    bike_model_name = request.form.get('bike_model')
    year = int(request.form.get('year'))
    kilo_driven = int(request.form.get('kilo_driven'))
    fuel_type = request.form.get('fuel_type', 'Petrol')  # default Petrol if not provided

    input_df = pd.DataFrame([[company, bike_model_name, year, kilo_driven, fuel_type]],
                        columns=['company', 'name', 'year', 'kms_driven', 'fuel_type'])

    log_pred = bike_model.predict(input_df)
    real_price = np.expm1(log_pred[0])  # Convert log price back to real INR

    return f" {np.round(real_price, 2):,.2f}"








if __name__ == "__main__":
    app.run(debug=True)
