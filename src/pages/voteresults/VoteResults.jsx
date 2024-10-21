import { Outlet } from "react-router-dom";
import "./VoteResults.css";

function VoteResults() {
  return (
    <div className="voteresults__page">
      <div className="voteresults__page-container">
        <div className="voteresults__page-header">
          <h2>Votes Results</h2>
          <p>all voting result can be found here</p>
        </div>
        <div className="voteresults__page-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default VoteResults;
