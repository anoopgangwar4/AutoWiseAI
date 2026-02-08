import { useEffect, useState } from "react";
import { predictBikePrice } from "../services/api";
import { bikeData } from "../data/bikeData";
import "bootstrap/dist/css/bootstrap.min.css";

export default function BikePredictor() {
  const [company, setCompany] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [fuelType, setFuelType] = useState("");
  const [kmDriven, setKmDriven] = useState("");
  const [models, setModels] = useState([]);
  const [prediction, setPrediction] = useState("");

  const companies = [...new Set(bikeData.map((b) => b.company))];
  const years = Array.from({ length: 20 }, (_, i) => 2005 + i);
  const fuelTypes = ["Petrol", "Diesel", "Electric"];

  useEffect(() => {
    if (company) {
      const filtered = bikeData
        .filter((b) => b.company === company)
        .map((b) => b.name);
      setModels(filtered);
      setModel(filtered[0] || "");
    }
  }, [company]);

  async function handleSubmit(e) {
    e.preventDefault();
    setPrediction("⏳ Predicting...");

    const data = {
      company,
      model,
      year,
      fuel: fuelType,
      km: kmDriven,
    };

    try {
      const res = await predictBikePrice(data);
      setPrediction(
        `💰 Predicted Price: ₹ ${res.price.toLocaleString("en-IN")} (Approx)`,
      );
    } catch (err) {
      setPrediction("❌ Prediction failed");
    }
  }

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card">
            <div className="card-header text-center bg-success text-white">
              <h2>🏍️ Bike Price Predictor</h2>
            </div>

            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
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

                <div className="form-group">
                  <label>
                    <b>Select Model</b>
                  </label>
                  <select
                    className="form-control"
                    value={model}
                    onChange={(e) => setModel(e.target.value)}
                    required
                  >
                    {models.map((m) => (
                      <option key={m} value={m}>
                        {m}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label>
                    <b>Select Year of Purchase</b>
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

                <div className="form-group">
                  <label>
                    <b>Select Fuel Type</b>
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

                <div className="form-group">
                  <label>
                    <b>Enter Kilometers Driven</b>
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

                <button
                  type="submit"
                  className="btn btn-success form-control mt-3"
                >
                  Predict Price
                </button>
              </form>

              <div className="text-center mt-4">
                <h4>{prediction}</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
