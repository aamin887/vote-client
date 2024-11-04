import { LuVote } from "react-icons/lu";
import "./UserCard.css"; // Import custom styles

import photo from "../../assets/User.png";

const UserCard = ({ data }) => {
  const handleVoteCast = () => {
    console.log("vote sent");
    alert("hi");
  };

  return (
    <div className="usercard">
      <div className="usercard-left">
        <div className="usercard__left-box">
          <div className="usercard__left-img">
            <img src={data?.profilePhoto || photo} alt="candidate" />
          </div>
          <div className="usercard__left-icon">
            <button
              onClick={handleVoteCast}
              className="usercard__left-icon_btn "
            >
              {" "}
              {<LuVote />}
              <p>Vote</p>
            </button>
          </div>
        </div>
      </div>
      <div className="usercard__right">
        <div className="usercard__right-content">
          <h3>{data?.fullName || "Amin Alhhasan"}</h3>
          <p>
            {/* {data?.manifesto.split(" ").slice(0, 5).join(" ").toString()}
          {data?.manifesto.split(" ").length > 5 ? "...." : ""} */}
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Accusantium, repudiandae eligendi soluta nihil placeat a pariatur,
            at recusandae ab nam, omnis eaque! Voluptatibus consectetur quis,
            repellendus ducimus adipisci doloribus quidem.
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
