// src/components/RadiantButton.js
import { useState } from "react";
import "./RadiantButton.css";

const RadiantButton = () => {
  const [rippleStyle, setRippleStyle] = useState({});

  const handleClick = (e) => {
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    const newRippleStyle = {
      top: `${y}px`,
      left: `${x}px`,
      width: `${size}px`,
      height: `${size}px`,
    };

    setRippleStyle(newRippleStyle);

    // Remove the effect after animation
    setTimeout(() => setRippleStyle({}), 600);
  };

  return (
    <button className="radiant-button" onClick={handleClick}>
      Click Me
      <span className="ripple" style={rippleStyle}></span>
    </button>
  );
};

export default RadiantButton;
