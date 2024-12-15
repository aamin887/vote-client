import { useState } from "react";
import "./votercard.css";

function VoterCard({ items }) {
  const [activeIndex, setActiveIndex] = useState(null);

  const handleClick = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <ul style={{ listStyleType: "none", padding: 0 }}>
      {items.map((item, index) => (
        <li key={index} style={{ margin: "10px 0" }}>
          <div
            style={{
              padding: "10px",
              background: "#f5f5f5",
              cursor: "pointer",
              border: "1px solid #ccc",
              borderRadius: "5px",
            }}
            onClick={() => handleClick(index)}
          >
            <h3 style={{ margin: 0 }}>{item.title}</h3>
          </div>
          {activeIndex === index && (
            <div
              style={{
                padding: "10px",
                border: "1px solid #ccc",
                borderTop: "none",
                background: "#fff",
                borderRadius: "0 0 5px 5px",
              }}
            >
              <p style={{ margin: 0 }}>{item.content}</p>
            </div>
          )}
        </li>
      ))}
    </ul>
  );
}

export default VoterCard;
