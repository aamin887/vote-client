import { Outlet } from "react-router-dom";
import "./VoteResults.css";

function VoteResults() {
  return (
    <div className="voteresults__page">
      <div className="voteresults__page-container">
        <div className="voteresults__page-header">
          <h2 className="section__heading title__text">Votes Results</h2>
          <p className="section__text">all voting result can be found here</p>
        </div>
        <div className="voteresults__page-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default VoteResults;
