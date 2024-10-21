// src/components/VoteResults.js
import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import "./resultgraph.css";

// Sample vote data
const allVoteData = [
  { candidate: "Candidate A", votes: 4000, ageGroup: "18-25", region: "North" },
  { candidate: "Candidate B", votes: 3000, ageGroup: "18-25", region: "South" },
  { candidate: "Candidate C", votes: 2000, ageGroup: "26-40", region: "East" },
  { candidate: "Candidate A", votes: 2780, ageGroup: "26-40", region: "West" },
  { candidate: "Candidate B", votes: 1890, ageGroup: "41-60", region: "North" },
  { candidate: "Candidate C", votes: 2390, ageGroup: "41-60", region: "South" },
  { candidate: "Candidate A", votes: 3490, ageGroup: "60+", region: "East" },
  { candidate: "Candidate B", votes: 4300, ageGroup: "60+", region: "West" },
];

// Filter options
const ageGroups = ["All", "18-25", "26-40", "41-60", "60+"];
const regions = ["All", "North", "South", "East", "West"];

const ResultGraph = () => {
  // State for filters
  const [selectedAgeGroup, setSelectedAgeGroup] = useState("All");
  const [selectedRegion, setSelectedRegion] = useState("All");

  // Filter vote data based on selected filters
  const filteredVoteData = allVoteData.filter((item) => {
    const ageMatch =
      selectedAgeGroup === "All" || item.ageGroup === selectedAgeGroup;
    const regionMatch =
      selectedRegion === "All" || item.region === selectedRegion;
    return ageMatch && regionMatch;
  });

  return (
    <div className="vote-results-container">
      <h1>Vote Results</h1>

      {/* Filters */}
      <div className="filters">
        <div className="filter">
          <label>Age Group:</label>
          <select
            value={selectedAgeGroup}
            onChange={(e) => setSelectedAgeGroup(e.target.value)}
          >
            {ageGroups.map((group) => (
              <option key={group} value={group}>
                {group}
              </option>
            ))}
          </select>
        </div>

        <div className="filter">
          <label>Region:</label>
          <select
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
          >
            {regions.map((region) => (
              <option key={region} value={region}>
                {region}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Chart */}
      <div className="responsive-container">
        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            data={filteredVoteData}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="candidate" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="votes" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ResultGraph;
