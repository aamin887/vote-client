import "./candidatecard.css";
import photo from "../../assets/User.png";
import { FaInfo } from "react-icons/fa";

function CandidateCard() {
  return (
    <div className="candidatecard">
      <div className="candidatecard__top">
        <span className="candidatecard__top-info">
          <FaInfo />
        </span>

        <div className="candidatecard__top-name">
          <h4>Amin Alhassan</h4>
        </div>
        <img src={photo} alt="" />
      </div>
      <div className="candidatecard__bottom">
        <p>President</p>
      </div>
    </div>
  );
}

export default CandidateCard;
