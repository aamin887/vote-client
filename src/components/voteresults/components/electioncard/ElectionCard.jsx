import React from "react";
import "./styles.css";
import { Link } from "react-router-dom";
import { GiVote } from "react-icons/gi";

function ElectionCard({ data }) {
  console.log(data);
  return (
    <Link to={`elections/${data?._id}`}>
      <article className="election__card">
        <div className="election__card-header">
          <span className="election__card-header_icon">
            {<GiVote size={30} />}
          </span>
        </div>
        <div className="election__card-content">
          <div className="election__card-content_info">
            <h5>Election Name</h5>
            <p>{data?.electionName}</p>
          </div>
          <div className="election__card-content_info">
            <h5>Close Date</h5>
            <p>{data?.endDate}</p>
          </div>
        </div>
      </article>
    </Link>
  );
}

export default ElectionCard;
