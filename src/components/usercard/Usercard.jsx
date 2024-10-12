import { LuVote } from "react-icons/lu";
import "./UserCard.css"; // Import custom styles
import { Link } from "react-router-dom";
import photo from "../../assets/User.png";

const UserCard = ({ data }) => {
  const handleVoteCast = () => {
    console.log("vote sent");
  };

  return (
    <div className="candidate__card ">
      <div className="card-inner">
        <div className="box">
          <div className="imgBox">
            <img src={data?.profilePhoto || photo} alt="Shower Gel" />
          </div>
          <div className="icon">
            <button onClick={handleVoteCast} className="iconBox">
              {" "}
              {<LuVote />}
              <p>Vote</p>
            </button>
          </div>
        </div>
      </div>
      <div className="content">
        <h3>{data?.fullName}</h3>
        <p>
          {data?.manifesto.split(" ").slice(0, 5).join(" ").toString()}
          {data?.manifesto.split(" ").length > 5 ? "...." : ""}
        </p>
      </div>
    </div>
  );
};

export default UserCard;
