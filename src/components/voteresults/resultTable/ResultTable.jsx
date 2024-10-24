import "./resulttable.css";
const ResultTable = ({ positionId }) => {
  const candidates = [
    { candidate: "John Doe", votes: 1, voteShare: 1000 },
    { candidate: "Jane Smith", votes: 1, voteShare: 850 },
  ];

  return (
    <div className="table-container">
      <table className="candidate-table">
        <thead>
          <tr>
            <th>Candidate</th>
            <th>Votes</th>
            <th>Vote Share(%)</th>
          </tr>
        </thead>
        <tbody>
          {candidates.map((row, index) => (
            <tr key={index}>
              <td>{row.candidate}</td>
              <td>{row.votes}</td>
              <td>{row.voteShare}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ResultTable;
