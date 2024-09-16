import "./UserCard.css"; // Import custom styles
import { FiMoreHorizontal } from "react-icons/fi"; // More options icon from react-icons

const UserCard = ({ user }) => {
  return (
    <div className="user-card">
      <div className="user-card-header">
        <h3>Amiin</h3>
        <button className="more-options">
          <FiMoreHorizontal size={24} />
        </button>
      </div>
    </div>
  );
};

export default UserCard;
