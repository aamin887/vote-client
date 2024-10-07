import "./candidatecard.css";
import photo from "../../assets/User.png";
import { FaInfo } from "react-icons/fa";
import { Link } from "react-router-dom";

function CandidateCard({ data }) {
  return (
    <div className="candidate__card ">
      <div className="card-inner">
        <div className="box">
          <div className="imgBox">
            <img src={data?.profilePhoto || photo} alt="Shower Gel" />
          </div>
          <div className="icon">
            <Link to={`/candidates/${data?._id}`} className="iconBox">
              {" "}
              {<FaInfo />}
            </Link>
          </div>
        </div>
      </div>
      <div className="content">
        <h3>{data?.fullName}</h3>
        <p>
          {data?.manifesto.split(" ").slice(0, 5).join(" ").toString()}
          {data?.manifesto.split(" ").length > 5 ? "...." : ""}
        </p>
      </div>
    </div>
  );
}

export default CandidateCard;
