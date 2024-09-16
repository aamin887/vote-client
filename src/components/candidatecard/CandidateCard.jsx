import "./candidatecard.css";
import photo from "../../assets/User.png";
import { FaInfo } from "react-icons/fa";
import { Link } from "react-router-dom";

function CandidateCard({ data }) {
  return (
    <Link to={`/candidates/${data?._id}`}>
      <div className="candidatecard">
        <div className="candidatecard__top">
          <span className="candidatecard__top-info">
            <FaInfo />
          </span>

          <div className="candidatecard__top-name">
            <h4>{data?.fullName}</h4>
          </div>
          <img src={photo} alt="" />
        </div>
        <div className="candidatecard__bottom">
          <p>President</p>
        </div>
      </div>
    </Link>
  );
}

export default CandidateCard;
