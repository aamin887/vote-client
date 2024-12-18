import "./candidatecard.css";
import photo from "../../assets/User.png";
import { Link } from "react-router-dom";

function CandidateCard({ url, data }) {
  return (
    <Link to={url || `/candidates/${data?._id}`}>
      <div className="candidate__card ">
        <div className="card-inner">
          <div className="box">
            <div className="imgBox">
              <img
                src={data?.photoUrl || "https://via.placeholder.com/150"}
                alt={`voter thumbnail for ${data?.fullName}`}
              />
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
