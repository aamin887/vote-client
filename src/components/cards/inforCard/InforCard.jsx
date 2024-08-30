import { FaWallet } from "react-icons/fa6";
import "./inforCard.css";

function InforCard({ icon, title, stats }) {
  return (
    <div className="inforcard">
      <div className="inforcard__content">
        <div className="inforcard__content-left">
          <span>
            <FaWallet size={26} />
          </span>
        </div>
        <div className="inforcard__content-right">
          <p>Staff</p>
          <h3>200</h3>
        </div>
      </div>
    </div>
  );
}

export default InforCard;
