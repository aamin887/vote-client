import "./candidatecard.css";
import photo from "../../assets/User.png";
import { Link } from "react-router-dom";

function CandidateCard({ data }) {
  return (
    <Link to={`/candidates/${data?._id}`}>
      <div className="candidate__card ">
        <div className="card-inner">
          <div className="box">
            <div className="imgBox">
              <img src={data?.photoUrl || photo} alt="Shower Gel" />
            </div>
            <div className="candidate_info">
              <h5>{data?.fullName}</h5>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default CandidateCard;
