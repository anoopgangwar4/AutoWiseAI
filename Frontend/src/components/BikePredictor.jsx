import { useEffect, useState } from "react";
import { predictBikePrice } from "../services/api";
import { bikeData } from "../data/bikeData";
import "bootstrap/dist/css/bootstrap.min.css";

export default function BikePredictor() {
  const [company, setCompany] = useState("");
  const [bikeModel, setBikeModel] = useState("");
  const [year, setYear] = useState("");
  const [fuelType, setFuelType] = useState("");
  const [kmDriven, setKmDriven] = useState("");
  const [models, setModels] = useState([]);
  const [prediction, setPrediction] = useState("");

  const companies = [...new Set(bikeData.map((b) => b.company))];
  const years = Array.from({ length: 20 }, (_, i) => 2005 + i);
  const fuelTypes = ["Petrol", "Electric"];

  useEffect(() => {
    if (company) {
      const filtered = bikeData
        .filter((b) => b.company === company)
        .map((b) => b.name);

      setModels(filtered);
      setBikeModel(filtered[0] || "");
    }
  }, [company]);

  async function handleSubmit(e) {
    e.preventDefault();
    setPrediction("⏳ Predicting...");

    const data = {
      company: company,
      bike_model: bikeModel,
      year: Number(year),
      kilo_driven: Number(kmDriven),
      fuel_type: fuelType || "Petrol",
    };

    try {
      const res = await predictBikePrice(data);

      if (res.predicted_price_inr) {
        const formattedPrice = Number(res.predicted_price_inr).toLocaleString(
          "en-IN",
        );

        setPrediction(`💰 Predicted Price: ₹ ${formattedPrice} (Approx)`);
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
      <div className="card shadow p-4">
        <h2 className="text-center mb-4">🏍️ Bike Price Predictor</h2>

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
              value={bikeModel}
              onChange={(e) => setBikeModel(e.target.value)}
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

          {/* KM Driven */}
          <div className="mb-3">
            <label>
              <b>Kilometers Driven</b>
            </label>
            <input
              type="number"
              className="form-control"
              value={kmDriven}
              onChange={(e) => setKmDriven(e.target.value)}
              placeholder="e.g. 25000"
              required
            />
          </div>

          <button className="btn btn-success w-100">Predict Price</button>
        </form>

        <div className="text-center mt-4">
          <h4>{prediction}</h4>
        </div>
      </div>
    </div>
  );
}
