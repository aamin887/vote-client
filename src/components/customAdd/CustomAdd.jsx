import { Link } from "react-router-dom";
import "./customadd.css";
import { FaPlus } from "react-icons/fa6";

function CustomAdd() {
  return (
    <Link to={"/elections/create"} className="customadd__btn">
      <div className="customadd__btn-content">
        <div className="customadd__btn-content_left">
          <span>
            <FaPlus size={28} />
          </span>
        </div>
        <div className="customadd__btn-content_right">
          <p>Create an election</p>
        </div>
      </div>
    </Link>
  );
}

export default CustomAdd;
