import React, { useState } from "react";
import "./votingsection.css";
import UserCard from "../../components/usercard/Usercard";

const users = [
  { _id: 1, fullName: "John Doe", manifesto: "john.doe@example.com", age: 28 },
  {
    _id: 2,
    fullName: "Jane Smith",
    manifesto: "jane.smith@example.com",
    age: 32,
  },
  {
    _id: 3,
    fullName: "Alice Johnson",
    manifesto: "alice.johnson@example.com",
    age: 24,
  },
];

const UserCardAccordion = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="accordion">
      {users.map((user, index) => (
        <div className="accordion-item" key={user._id}>
          <div
            className={`accordion-header ${
              activeIndex === index ? "active" : ""
            }`}
            onClick={() => toggleAccordion(index)}
          >
            {user.name}
          </div>
          <div
            className={`accordion-body ${activeIndex === index ? "show" : ""}`}
          >
            <UserCard data={user} />
            <UserCard data={user} />
            <UserCard data={user} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserCardAccordion;
