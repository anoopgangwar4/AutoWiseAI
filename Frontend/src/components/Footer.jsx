export default function Footer() {
  return (
    <footer className="bg-success sticky bottom-0 text-white mt-5 pt-4 pb-3">
      <div className="container">
        <div className="row text-center text-md-start">
          {/* Brand */}
          <div className="col-md-4 mb-3">
            <h4 className="fw-bold">AutoWise AI</h4>
            <p className="small">
              Smart vehicle price prediction powered by Machine Learning & AI
              🚗🏍️
            </p>
          </div>

          {/* Links */}
          <div className="col-md-4 mb-3">
            <h6 className="fw-bold">Quick Links</h6>
            <ul className="list-unstyled">
              <li>
                <a href="/" className="text-white text-decoration-none">
                  Home
                </a>
              </li>
              <li>
                <a href="/car" className="text-white text-decoration-none">
                  Car Predictor
                </a>
              </li>
              <li>
                <a href="/bike" className="text-white text-decoration-none">
                  Bike Predictor
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="col-md-4 mb-3">
            <h6 className="fw-bold">Contact</h6>
            <p className="small mb-1">📧 support@autowise.ai</p>
            <p className="small mb-1">📍 India</p>
          </div>
        </div>

        <hr className="border-light" />

        <div className="text-center small">
          © {new Date().getFullYear()} AutoWise AI — All Rights Reserved 🚀
        </div>
      </div>
    </footer>
  );
}
