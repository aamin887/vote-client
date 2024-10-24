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

          <div className="election__card-header_info">
            <p>Election Name:</p>
            <h5>{data?.electionName}</h5>
          </div>
        </div>
        <div className="election__card-content">
          <p>Close Date:</p>
          <h5>{data?.endDate}</h5>
        </div>
      </article>
    </Link>
  );
}

export default ElectionCard;
