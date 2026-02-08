import { useEffect, useState } from "react";
import { predictCarPrice } from "../services/api";
import { carData } from "../data/carData";
import "bootstrap/dist/css/bootstrap.min.css";

export default function CarPredictor() {
  const [company, setCompany] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [fuelType, setFuelType] = useState("");
  const [kmDriven, setKmDriven] = useState("");
  const [models, setModels] = useState([]);
  const [prediction, setPrediction] = useState("");

  const companies = [...new Set(carData.map((c) => c.company))];
  const years = Array.from({ length: 25 }, (_, i) => 2000 + i);
  const fuelTypes = ["Petrol", "Diesel", "CNG", "Electric"];

  useEffect(() => {
    if (company) {
      const filtered = carData
        .filter((c) => c.company === company)
        .map((c) => c.name);
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
      const res = await predictCarPrice(data);
      setPrediction(` Predicted Price: ₹ ${res.price} (Approx)`);
    } catch (err) {
      setPrediction("❌ Prediction failed");
    }
  }

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card">
            <div className="card-header text-center bg-primary text-white">
              <h2>🚗 Car Price Predictor</h2>
            </div>

            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>
                    <b>Select Company</b>
                  </label>
                  <select
                    className="form-control"
                    id="company"
                    name="company"
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
                    id="model"
                    name="model"
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
                    id="year"
                    name="year"
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
                    id="fuelType"
                    name="fuelType"
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
                    id="kmDriven"
                    name="kmDriven"
                    value={kmDriven}
                    onChange={(e) => setKmDriven(e.target.value)}
                    placeholder="e.g. 45000"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary form-control mt-3"
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
