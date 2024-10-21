import "./header.css";
import hero from "../../assets/hero-banner.jpeg";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="header">
      <nav className="navbar">
        <div className="logo">
          <img src={logo} alt="votes-logo" />
        </div>
        <ul className="nav-links">
          <li>
            <a href="#features">Features</a>
          </li>
          <li>
            <a href="#how-it-works">How It Works</a>
          </li>
          <li>
            <a href="#why-use-us">Why Use Us</a>
          </li>
          <li>
            <a href="#contact">Contact Us</a>
          </li>
        </ul>
        <Link to="/login">
          <button className="cta-btn">Signin</button>
        </Link>
      </nav>

      <div className="hero">
        <div className="hero-text">
          <h1>Your Voting Solution</h1>
          <p>Fast, secure, and easy voting platform.</p>
          <Link to="/register">
            <button className="cta-btn">Signup</button>
          </Link>
        </div>
        <div className="hero-image">
          <img src={hero} alt="Voting" />
        </div>
      </div>
    </header>
  );
};

export default Header;
