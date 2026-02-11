import { useEffect, useState } from "react";
import { predictCarPrice } from "../services/api";
import { carData } from "../data/carData";
import "bootstrap/dist/css/bootstrap.min.css";

export default function CarPredictor() {
  const [company, setCompany] = useState("");
  const [carModel, setCarModel] = useState("");
  const [year, setYear] = useState("");
  const [fuelType, setFuelType] = useState("");
  const [kmDriven, setKmDriven] = useState("");
  const [models, setModels] = useState([]);
  const [prediction, setPrediction] = useState("");

  const companies = [...new Set(carData.map((c) => c.company))];
  const years = Array.from({ length: 26 }, (_, i) => 2000 + i);
  const fuelTypes = ["Petrol", "Diesel", "CNG", "Electric"];

  useEffect(() => {
    if (company) {
      const filtered = carData
        .filter((c) => c.company === company)
        .map((c) => c.name);

      setModels(filtered);
      setCarModel(filtered[0] || "");
    }
  }, [company]);

  async function handleSubmit(e) {
    e.preventDefault();
    setPrediction("⏳ Predicting...");

    const data = {
      company: company,
      car_model: carModel,
      year: Number(year),
      fuel_type: fuelType,
      kilo_driven: Number(kmDriven),
    };

    try {
      const res = await predictCarPrice(data);

      if (res.predicted_price_inr) {
        setPrediction(
          `💰 Predicted Price: ₹ ${res.predicted_price_inr} (Approx)`,
        );
      } else {
        setPrediction("❌ Prediction failed");
      }
    } catch (err) {
      console.error(err);
      setPrediction("❌ Server error");
    }
  }

  return (
    <div className="container mt-5">
      <div className="card p-4 shadow">
        <h2 className="text-center mb-4">🚗 Car Price Predictor</h2>

        <form onSubmit={handleSubmit}>
          {/* Company */}
          <div className="mb-3">
            <label>
              <b>Select Company</b>
            </label>
            <select
              className="form-control"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              required
            >
              <option value="">-- Select --</option>
              {companies.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          {/* Model */}
          <div className="mb-3">
            <label>
              <b>Select Model</b>
            </label>
            <select
              className="form-control"
              value={carModel}
              onChange={(e) => setCarModel(e.target.value)}
              required
            >
              {models.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
          </div>

          {/* Year */}
          <div className="mb-3">
            <label>
              <b>Select Year</b>
            </label>
            <select
              className="form-control"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              required
            >
              <option value="">-- Select --</option>
              {years.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          </div>

          {/* Fuel */}
          <div className="mb-3">
            <label>
              <b>Fuel Type</b>
            </label>
            <select
              className="form-control"
              value={fuelType}
              onChange={(e) => setFuelType(e.target.value)}
              required
            >
              <option value="">-- Select --</option>
              {fuelTypes.map((f) => (
                <option key={f} value={f}>
                  {f}
                </option>
              ))}
            </select>
          </div>

          {/* KM */}
          <div className="mb-3">
            <label>
              <b>Kilometers Driven</b>
            </label>
            <input
              type="number"
              className="form-control"
              value={kmDriven}
              onChange={(e) => setKmDriven(e.target.value)}
              required
            />
          </div>

          <button className="btn btn-primary w-100">Predict Price</button>
        </form>

        <div className="text-center mt-4">
          <h4>{prediction}</h4>
        </div>
      </div>
    </div>
  );
}
