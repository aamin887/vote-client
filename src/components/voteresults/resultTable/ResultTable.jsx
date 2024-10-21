import React from "react";

const ResultTable = ({ positionId }) => {
  const candidates = [
    { name: "John Doe", party: "Party A", votes: 1000 },
    { name: "Jane Smith", party: "Party B", votes: 850 },
    // Add more candidates as needed
  ];

  return (
    <div className="candidates-table">
      <h2>Candidates for Position {positionId}</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Party</th>
            <th>Votes</th>
          </tr>
        </thead>
        <tbody>
          {candidates.map((candidate, index) => (
            <tr key={index}>
              <td>{candidate.name}</td>
              <td>{candidate.party}</td>
              <td>{candidate.votes}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ResultTable;
