import "./result.css";
import ResultTable from "../resultTable/ResultTable";
import ResultGraph from "../resultGraph/ResultGraph";
import { useParams } from "react-router-dom";
import { useState } from "react";

function Result() {
  const { id: positionId } = useParams();

  const [activeTab, setActiveTab] = useState("table");
  return (
    <div>
      <div className="table-header">
        <h1>Position Detail - {positionId}</h1>
        <div className="tabs">
          <button
            className={activeTab === "candidates" ? "active" : ""}
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

      <div className="content">
        {activeTab === "table" && <ResultTable positionId={1} />}
        {activeTab === "graph" && <ResultGraph />}
      </div>
    </div>
  );
}

export default Result;
