import { FaWallet } from "react-icons/fa6";
import "./inforCard.css";

function InforCard({ icon, title, stats }) {
  return (
    <div className="inforcard">
      <div className="inforcard__content">
        <div className="inforcard__content-left">
          <span>{icon}</span>
        </div>
        <div className="inforcard__content-right">
          <p>{title}</p>
          <h3>{stats}</h3>
        </div>
      </div>
    </div>
  );
}

export default InforCard;
