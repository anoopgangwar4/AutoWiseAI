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

# ========================
# Session store
# ========================
sessions = defaultdict(lambda: {
    "step": 0,
    "data": {
        "type": None,
        "company": None,
        "model": None,
        "year": None,
        "fuel": None,
        "km": None
    }
})

FIELDS = ["type", "company", "model", "year", "fuel", "km"]

QUESTIONS = {
    "type": "Is it a car or a bike?",
    "company": "What is the company (e.g., Honda, Toyota)?",
    "model": "What is the model name?",
    "year": "Which year is it?",
    "fuel": "What fuel type does it use?",
    "km": "How many kilometers has it driven?"
}

# ========================
# Extractors
# ========================
def parse_type(text):
    t = text.lower()
    if "bike" in t or "motorcycle" in t:
        return "bike"
    if "car" in t or "suv" in t or "sedan" in t:
        return "car"
    return None

def parse_year(text):
    m = re.search(r"\b(19|20)\d{2}\b", text)
    return int(m.group()) if m else None

def parse_km(text):
    m = re.search(r"\b\d{4,7}\b", text)
    return int(m.group()) if m else None

def parse_fuel(text):
    fuels = ["petrol", "diesel", "electric", "cng", "hybrid"]
    for f in fuels:
        if f in text.lower():
            return f.capitalize()
    return None

def parse_company(text):
    if text.isalpha():
        return text.capitalize()
    return None

def parse_model(text):
    if re.search(r"[a-zA-Z]", text):
        return text.capitalize()
    return None

# ========================
# Chat Route
# ========================
@app.route("/api/chat", methods=["POST"])
def chat():
    body = request.get_json()
    msg = body.get("message", "").strip()
    session_id = body.get("session_id")

    if not session_id:
        session_id = str(uuid.uuid4())

    session = sessions[session_id]
    step = session["step"]
    field = FIELDS[step]

    value = None

    if field == "type":
        value = parse_type(msg)
    elif field == "company":
        value = parse_company(msg)
    elif field == "model":
        value = parse_model(msg)
    elif field == "year":
        value = parse_year(msg)
    elif field == "fuel":
        value = parse_fuel(msg)
    elif field == "km":
        value = parse_km(msg)

    # ❌ Invalid input — ask same question again
    if value is None:
        return jsonify({
            "reply": QUESTIONS[field],
            "session_id": session_id
        })

    # ✅ Save valid value
    session["data"][field] = value
    session["step"] += 1

    # ------------------
    # Ask next question
    # ------------------
    if session["step"] < len(FIELDS):
        next_field = FIELDS[session["step"]]
        return jsonify({
            "reply": QUESTIONS[next_field],
            "session_id": session_id
        })

    # ------------------
    # Predict
    # ------------------
    d = session["data"]

    if d["type"] == "car":
        df = pd.DataFrame([[d["company"], d["model"], d["year"], d["fuel"], d["km"]]],
                          columns=["company", "name", "year", "fuel_type", "kms_driven"])
        log_price = car_model.predict(df)
    else:
        df = pd.DataFrame([[d["company"], d["model"], d["year"], d["km"], d["fuel"]]],
                          columns=["company", "name", "year", "kms_driven", "fuel_type"])
        log_price = bike_model.predict(df)

    price = np.expm1(log_price[0])

    # Reset session
    sessions.pop(session_id, None)

    return jsonify({
        "reply": f"💰 Estimated value of your {d['company']} {d['model']} ({d['year']}) is ₹{round(float(price), 2)}",
        "session_id": None
    })


if __name__ == "__main__":
    app.run(debug=True)
