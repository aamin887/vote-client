import React from "react";
import { FaUsersRectangle } from "react-icons/fa6";

import { Link } from "react-router-dom";
import "./style.css";

function PositionCard({ data }) {
  return (
    <Link to={`/results/elections/${data?.positionName}/${data?._id}`}>
      <article className="position__card">
        <div className="position__card-header">
          <span className="position__card-icon">
            {<FaUsersRectangle size={30} />}
          </span>
          <div className="position__card-header_info">
            <p>Position:</p>
            <h5>{data?.positionName}</h5>
          </div>
        </div>
        <div className="position__card-content">
          <p>Close Date:</p>
          <h5>{data?.positionDescription}</h5>
        </div>
      </article>
    </Link>
  );
}

export default PositionCard;
