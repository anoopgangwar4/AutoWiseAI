
// const API_BASE = "http://localhost:5000";
// const API_BASE = "http://0.0.0.0:8080";
const API_BASE = import.meta.env.VITE_API_BASE;


export async function predictCarPrice(data) {
  const res = await fetch(`${API_BASE}/predict_car`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function predictBikePrice(data) {
  const res = await fetch(`${API_BASE}/predict_bike`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}
