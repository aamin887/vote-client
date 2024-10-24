import "./result.css";
import ResultTable from "../resultTable/ResultTable";
import ResultGraph from "../resultGraph/ResultGraph";
import { useParams } from "react-router-dom";
import { useState } from "react";

function Result() {
  const { id: positionId, position } = useParams();

  const [activeTab, setActiveTab] = useState("table");
  return (
    <div className="vote__result">
      <div className="vote__result-header">
        <h1>Vote result for {position}</h1>
        <div className="vote__result-header_tabs">
          <button
            className={activeTab === "table" ? "active" : ""}
            onClick={() => setActiveTab("table")}
          >
            Candidates
          </button>
          <button
            className={activeTab === "graph" ? "active" : ""}
            onClick={() => setActiveTab("graph")}
          >
            Graph
          </button>
        </div>
      </div>

      <div className="vote__result-content">
        {activeTab === "table" && <ResultTable positionId={1} />}
        {activeTab === "graph" && <ResultGraph />}
      </div>
    </div>
  );
}

export default Result;
