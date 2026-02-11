from flask import Flask, render_template, request
import pickle
import pandas as pd
import numpy as np

app = Flask(__name__)

# ----------------------------
# Load Models
# ----------------------------
car_model = pickle.load(open('models/Car_LinearRegressionModel.pkl', 'rb'))
bike_model = pickle.load(open('models/Bike_LinearRegressionModel.pkl', 'rb'))

# ----------------------------
# Load Datasets
# ----------------------------
car_data = pd.read_csv('data/Car_Data.csv')
bike_data = pd.read_csv('data/Bike_Data.csv')

# ----------------------------
# Home Route
# ----------------------------
@app.route('/')
def home():
    return render_template('index.html')

# ----------------------------
# Car Page
# ----------------------------
@app.route('/car')
def car_page():
    companies = sorted(car_data['company'].unique())
    car_models = sorted(car_data['name'].unique())
    years = sorted(car_data['year'].unique(), reverse=True)
    fuel_type = sorted(car_data['fuel_type'].unique())

    return render_template('Car.html',
                           companies=companies,
                           car_models=car_models,
                           years=years,
                           fuel_type=fuel_type)

# ----------------------------
# Bike Page
# ----------------------------
@app.route('/bike')
def bike_page():
    companies = sorted(bike_data['company'].unique())
    bike_models = sorted(bike_data['name'].unique())
    years = sorted(bike_data['year'].unique(), reverse=True)
    fuel_type = sorted(bike_data['fuel_type'].unique())

    # Pass bike_data as a dictionary to Jinja
    return render_template('Bike.html',
                           companies=companies,
                           bike_models=bike_models,
                           years=years,
                           fuel_type=fuel_type,
                           bike_data=bike_data.to_dict(orient='records'))

# ----------------------------
# Car Prediction
# ----------------------------
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

# ----------------------------
# Run Server
# ----------------------------
if __name__ == '__main__':
    app.run(debug=True)
