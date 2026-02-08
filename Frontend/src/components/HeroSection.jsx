import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import ReviewsSection from "./ReviewSection";

export default function HeroSection() {
  return (
    <>
      <div className="container mt-5">
        <h1 className="text-center">Product Valuation Predictor</h1>
        <p className="text-center lead mb-5">
          Predict prices for Cars, Bikes, Trucks, Real Estate, Electronics &
          more!
        </p>

        <div className="row justify-content-center">
          {/* Car */}
          <div className="col-md-3 col-sm-6 mb-4">
            <div className="card text-center shadow hover-card">
              <div className="card-body">
                <i className="fas fa-car fa-5x mb-3 text-primary"></i>
                <h5 className="card-title">Car</h5>
                <Link to="/car" className="btn btn-primary btn-block">
                  Predict Price
                </Link>
              </div>
            </div>
          </div>

          {/* Bike */}
          <div className="col-md-3 col-sm-6 mb-4">
            <div className="card text-center shadow hover-card">
              <div className="card-body">
                <i className="fas fa-motorcycle fa-5x mb-3 text-success"></i>
                <h5 className="card-title">Bike</h5>
                <Link to="/bike" className="btn btn-success btn-block">
                  Predict Price
                </Link>
              </div>
            </div>
          </div>

          {/* Truck */}
          <div className="col-md-3 col-sm-6 mb-4">
            <div className="card text-center shadow hover-card">
              <div className="card-body">
                <i className="fas fa-truck fa-5x mb-3 text-warning"></i>
                <h5 className="card-title">Truck</h5>
                <button className="btn btn-warning btn-block" disabled>
                  Coming Soon
                </button>
              </div>
            </div>
          </div>

          {/* Bus */}
          <div className="col-md-3 col-sm-6 mb-4">
            <div className="card text-center shadow hover-card">
              <div className="card-body">
                <i className="fas fa-bus fa-5x mb-3 text-info"></i>
                <h5 className="card-title">Bus</h5>
                <button className="btn btn-info btn-block" disabled>
                  Coming Soon
                </button>
              </div>
            </div>
          </div>

          {/* Real Estate */}
          <div className="col-md-3 col-sm-6 mb-4">
            <div className="card text-center shadow hover-card">
              <div className="card-body">
                <i className="fas fa-home fa-5x mb-3 text-danger"></i>
                <h5 className="card-title">Real Estate</h5>
                <button className="btn btn-danger btn-block" disabled>
                  Coming Soon
                </button>
              </div>
            </div>
          </div>

          {/* Mobile */}
          <div className="col-md-3 col-sm-6 mb-4">
            <div className="card text-center shadow hover-card">
              <div className="card-body">
                <i className="fa-solid fa-mobile-screen fa-5x mb-3 text-dark"></i>
                <h5 className="card-title">Mobile</h5>
                <button className="btn btn-dark btn-block" disabled>
                  Coming Soon
                </button>
              </div>
            </div>
          </div>

          {/* Laptop */}
          <div className="col-md-3 col-sm-6 mb-4">
            <div className="card text-center shadow hover-card">
              <div className="card-body">
                <i className="fa-solid fa-laptop-code fa-5x mb-3 text-secondary"></i>
                <h5 className="card-title">Laptop</h5>
                <button className="btn btn-secondary btn-block" disabled>
                  Coming Soon
                </button>
              </div>
            </div>
          </div>

          {/* Tablet */}
          <div className="col-md-3 col-sm-6 mb-4">
            <div className="card text-center shadow hover-card">
              <div className="card-body">
                <i className="fa-solid fa-tablet-screen-button fa-5x mb-3 text-purple"></i>
                <h5 className="card-title">Tablet</h5>
                <button className="btn btn-danger btn-block" disabled>
                  Coming Soon
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ReviewsSection />
    </>
  );
}
