# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

https://fkhadra.github.io/react-toastify/introduction - toastify

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
          }} >
{candidate}
</button>
))}
</div>
);
};

function Votes() {
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

import { useState } from "react";
import "./votes.css";

// Sample data for candidates categorized by position
const positions = [
{
position: "President",
candidates: [
{ id: 1, name: "John Doe" },
{ id: 2, name: "Jane Smith" },
],
},
{
position: "Vice President",
candidates: [
{ id: 3, name: "Alice Johnson" },
{ id: 4, name: "Bob Brown" },
],
},
{
position: "Secretary",
candidates: [
{ id: 5, name: "Charlie Green" },
{ id: 6, name: "Diana Blue" },
],
},
];

const Votes = () => {
const [activeAccordion, setActiveAccordion] = useState(null); // Tracks active position accordion
const [selectedCandidate, setSelectedCandidate] = useState(null); // Tracks selected candidate
const [voteSubmitted, setVoteSubmitted] = useState(false); // Tracks vote submission

const toggleAccordion = (index) => {
setActiveAccordion(activeAccordion === index ? null : index);
};

const handleVote = (candidateId) => {
setSelectedCandidate(candidateId);
setVoteSubmitted(true);
};

return (

<div className="dashboard-container">
<h1 className="title">Election Voting Dashboard</h1>
<div className="card">
{voteSubmitted ? (
<div className="vote-confirmation">
<h2>Thank you for voting!</h2>
<p>
You voted for:{" "}
<strong>
{
positions
.flatMap((p) => p.candidates)
.find((c) => c.id === selectedCandidate)?.name
}
</strong>
</p>
</div>
) : (
<>
<h2>Select a candidate</h2>
{positions.map((position, index) => (
<div key={index} className="accordion-item">
<div
className={`accordion-header ${
                    activeAccordion === index ? "active" : ""
                  }`}
onClick={() => toggleAccordion(index)} >
{position.position}
</div>
<div
className={`accordion-body ${
                    activeAccordion === index ? "show" : ""
                  }`} >
{position.candidates.map((candidate) => (
<div key={candidate.id} className="candidate-card">
<p>{candidate.name}</p>
<button
onClick={() => handleVote(candidate.id)}
className="vote-button" >
Vote
</button>
</div>
))}
</div>
</div>
))}
</>
)}
</div>
</div>
);
};

export default Votes;

/_ General container styling _/
.dashboard-container {
max-width: 1200px;
margin: 20px auto;
padding: 10px;
width: 90%;
border-radius: 10px;
box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
background-color: #f8f9fa;
}

/_ Title styling _/
.title {
text-align: center;
font-size: 24px;
color: #333;
margin-bottom: 20px;
}

/_ Card for voting _/
.card {
background-color: #fff;
padding: 20px;
border-radius: 10px;
box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
text-align: center;
}

/_ Accordion styling _/
.accordion-item {
margin-bottom: 10px;
border: 1px solid #ccc;
border-radius: 5px;
}

/_ Accordion header styling _/
.accordion-header {
padding: 15px;
font-size: 16px;
font-weight: bold;
cursor: pointer;
background-color: #f7f7f7;
transition: background-color 0.3s ease;
text-align: left;
}

.accordion-header:hover {
background-color: #e9ecef;
}

/_ Accordion body styling _/
.accordion-body {
padding: 10px 15px;
display: none;
background-color: #fff;
}

.accordion-body.show {
display: block;
}

/_ Candidate card styling _/
.candidate-card {
display: flex;
justify-content: space-between;
align-items: center;
padding: 10px;
margin-top: 5px;
border-radius: 5px;
border: 1px solid #ddd;
background-color: #f1f1f1;
transition: background-color 0.3s ease;
}

.candidate-card:hover {
background-color: #e9ecef;
}

/_ Vote button _/
.vote-button {
padding: 8px 16px;
border: none;
background-color: #007bff;
color: #fff;
border-radius: 5px;
cursor: pointer;
transition: background-color 0.3s ease;
}

.vote-button:hover {
background-color: #0056b3;
}

/_ Confirmation message _/
.vote-confirmation h2 {
color: #28a745;
}

/_ Responsive styling _/
@media (max-width: 600px) {
.candidate-card {
flex-direction: column;
align-items: flex-start;
}

.vote-button {
width: 100%;
margin-top: 10px;
}
}
