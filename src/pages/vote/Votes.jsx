import { useState } from "react";
import "./votes.css";
import UserCard from "../../components/usercard/Usercard";
import VotersNav from "../../components/votersnav/VotersNav";
// Sample data for categories and candidates
const data = [
  {
    category: "Best Actor",
    candidates: ["Robert Downey Jr.", "Chris Hemsworth", "Tom Holland"],
  },
  {
    category: "Best Actress",
    candidates: ["Scarlett Johansson", "Gal Gadot", "Emma Watson"],
  },
  // Add more categories as needed
];

function Votes() {
  // State to store selected candidate for each category
  const [selections, setSelections] = useState({});
  // State to manage which category accordion is open
  const [openCategory, setOpenCategory] = useState(null);

  // Handle selection of a candidate
  const handleSelect = (category, candidate) => {
    setSelections((prevSelections) => ({
      ...prevSelections,
      [category]: candidate,
    }));
  };

  // Toggle accordion
  const toggleAccordion = (category) => {
    setOpenCategory(openCategory === category ? null : category);
  };

  // Submit selections
  const handleSubmit = () => {
    console.log("Selected candidates:", selections);
    // Implement further submission logic here
  };

  return (
    <div className="votes__page">
      <VotersNav />
      <h1>Voting Panel</h1>

      {data.map(({ category, candidates }) => (
        <div
          key={category}
          style={{
            marginBottom: "20px",
            border: "1px solid #ccc",
            borderRadius: "5px",
          }}
        >
          <div
            // className="txx"
            style={{
              padding: "10px",
              cursor: "pointer",
            }}
            onClick={() => toggleAccordion(category)}
          >
            {category}
          </div>
          {openCategory === category && (
            <div className="txx">
              {candidates.map((candidate) => (
                <>
                  {/* <button
                    key={candidate}
                    onClick={() => handleSelect(category, candidate)}
                    style={{
                      display: "block",
                      width: "100%",
                      marginBottom: "10px",
                      padding: "10px",
                      backgroundColor:
                        selections[category] === candidate
                          ? "#4CAF50"
                          : "#e0e0e0",
                      color:
                        selections[category] === candidate
                          ? "#ffffff"
                          : "#000000",
                      fontWeight:
                        selections[category] === candidate ? "bold" : "normal",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer",
                    }}
                  >
                    {candidate}
                  </button> */}
                  <UserCard />
                </>
              ))}
            </div>
          )}
        </div>
      ))}
      <button
        onClick={handleSubmit}
        style={{ marginTop: "20px", padding: "10px", fontWeight: "bold" }}
      >
        Submit Vote
      </button>
    </div>
  );
}

export default Votes;
