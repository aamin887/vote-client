import { FaUsersRectangle } from "react-icons/fa6";

import { Link } from "react-router-dom";
import "./style.css";

function PositionCard({ data }) {
  return (
    <Link to={`/results/elections/${data?.positionName}/${data?._id}`}>
      <article className="positioncard__result">
        <div className="positioncard__result-content">
          <div className="positioncard__result-left">
            <span className="positioncard__result-icon">
              {<FaUsersRectangle size={30} />}
            </span>
          </div>

          <div className="positioncard__result-right">
            <div className="positioncard__result-info">
              <h5>Position</h5>
              <p>{data?.positionName}</p>
            </div>
            <div className="positioncard__result-info">
              <h5>Description</h5>
              <p>{data?.positionDescription}</p>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}

export default PositionCard;
