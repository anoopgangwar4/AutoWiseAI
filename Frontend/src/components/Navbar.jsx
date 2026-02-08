import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "../public/css/navbar.css";

export default function Navbar() {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark",
  );

  useEffect(() => {
    document.body.className = darkMode ? "dark" : "";
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  return (
    <nav className={`navbar ${darkMode ? "dark" : ""}`}>
      {/* Logo */}
      <h2 className="logo">AutoWise</h2>

      {/* Desktop Menu */}
      <div className="menu">
        
        <NavLink to="/" className="link">
          Home
        </NavLink>
        <NavLink to="/chatWithUs" className="link">
          ChatBot
        </NavLink>
        <NavLink to="/car" className="link">
          Car
        </NavLink>
        <NavLink to="/bike" className="link">
          Bike
        </NavLink>


        <button className="btn primary">Login</button>
        <button className="btn secondary">Signup</button>

        <button className="btn toggle" onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? "Light" : "Dark"}
        </button>
      </div>

      {/* Hamburger */}
      <div
        className={`hamburger ${mobileMenu ? "active" : ""}`}
        onClick={() => setMobileMenu(!mobileMenu)}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>

      {/* Mobile Menu */}
      {mobileMenu && (
        <div className="mobileMenu">
          <NavLink to="/" onClick={() => setMobileMenu(false)}>
            Home
          </NavLink>
          <NavLink to="/car" onClick={() => setMobileMenu(false)}>
            Car
          </NavLink>
          <NavLink to="/bike" onClick={() => setMobileMenu(false)}>
            Bike
          </NavLink>

          <button className="btn primary">Login</button>
          <button className="btn secondary">Signup</button>
          <button className="btn toggle" onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? "Light Mode" : "Dark Mode"}
          </button>
        </div>
      )}
    </nav>
  );
}
