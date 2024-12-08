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
            {/* <div className="icon">
              <Link to={`/candidates/${data?._id}`} className="iconBox">
                {" "}
                {<FaInfo />}
                <p>See more</p>
              </Link>
            </div> */}
          </div>
        </div>
        <div className="content">
          <h3>{data?.fullName}</h3>
        </div>
      </div>
    </Link>
  );
}

export default CandidateCard;
