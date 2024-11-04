// Navbar.jsx
import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="votersnav">
      <div className="votersnav__container">
        <Link to="/" className="votersnav__logo">
          Logo
        </Link>
        <ul className="votersnav__links">
          <li>
            <Link to="/" className="votersnav__link">
              Home
            </Link>
          </li>
          <li>
            <Link to="/about" className="votersnav__link">
              About
            </Link>
          </li>
          <li>
            <Link to="/services" className="votersnav__link">
              Services
            </Link>
          </li>
          <li>
            <Link to="/contact" className="votersnav__link">
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
