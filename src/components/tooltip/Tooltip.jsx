import { useState } from "react";
import "./tooltip.css";

const Tooltip = ({ children, message }) => {
  const [visible, setVisible] = useState(false);

  setTimeout(() => {
    setVisible(false);
  }, 5000);

  return (
    <div
      className="tooltip-container"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {children}
      {visible && <div className="tooltip-message">{message}</div>}
    </div>
  );
};

export default Tooltip;
