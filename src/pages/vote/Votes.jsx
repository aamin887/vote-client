import { useState } from "react";
import "./vote.css";

const VotingSection = ({ sectionName, candidates, onVote }) => {
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [isDisabled, setIsDisabled] = useState(false);

  const handleVote = (candidate) => {
    setSelectedCandidate(candidate);
    setIsDisabled(true);
    onVote(sectionName, candidate);
  };

  return (
    <div className="voting-section">
      <h2>{sectionName}</h2>
      {candidates.map((candidate) => (
        <button
          key={candidate}
          onClick={() => handleVote(candidate)}
          disabled={isDisabled}
          style={{
            backgroundColor:
              selectedCandidate === candidate ? "lightgreen" : "",
          }}
        >
          {candidate}
        </button>
      ))}
    </div>
  );
};

function Votes() {
  const votes = "Candidate A";

  const sections = {
    "Section 1": ["Candidate A", "Candidate B", "Candidate C"],
    "Section 2": ["Candidate D", "Candidate E", "Candidate F"],
  };

  const handleVote = (sectionName, candidate) => {
    console.log(`User voted for ${candidate} in ${sectionName}`);
    // Send vote to backend
    fetch("/vote", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ section: sectionName, candidate }),
    });
  };

  return (
    <div>
      {Object.entries(sections).map(([sectionName, candidates]) => (
        <VotingSection
          key={sectionName}
          sectionName={sectionName}
          candidates={candidates}
          onVote={handleVote}
        />
      ))}
    </div>
  );
}

export default Votes;
