import "./header.css";
import hero from "../../assets/hero-banner.jpeg";
import logo from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";

const Header = () => {
  const navigate = useNavigate();

  const handleSignUp = () => {
    return navigate("/register");
  };

  useEffect(() => {
    const setCookies = async function () {
      const res = await axios.get("");

      console.log(await res);
    };

    setCookies();
  }, []);

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
        <button className="cta-btn" onClick={handleSignUp}>
          Get Started
        </button>
      </nav>

      <div className="hero">
        <div className="hero-text">
          <h1>Your Voting Solution</h1>
          <p>Fast, secure, and easy voting platform.</p>
          <button className="hero-btn" onClick={handleSignUp}>
            Try Now
          </button>
        </div>
        <div className="hero-image">
          <img src={hero} alt="Voting" />
        </div>
      </div>
    </header>
  );
};

export default Header;
