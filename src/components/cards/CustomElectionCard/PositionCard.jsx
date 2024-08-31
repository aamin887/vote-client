import "./positionCard.css";
import ProfileImage from "../../profileImage/ProfileImage";
import { Link } from "react-router-dom";
import { IoMdAddCircle } from "react-icons/io";
import { RiDeleteBin2Fill } from "react-icons/ri";

const images = [
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2550&q=80",
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2550&q=80",
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2550&q=80",
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2550&q=80",
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2550&q=80",
];

function PositionCard() {
  return (
    <div className="positioncard">
      <div className="positioncard__header">
        <h3>President</h3>
        <p>University of cape coast</p>
      </div>
      {/*  */}
      <div className="positioncard__content">
        <h4>Number of candicates</h4>
        <div className="positioncard__content-inline">
          <p>10</p>
          {<ProfileImage images={images} />}
        </div>
      </div>
      {/*  */}
      <div className=" positioncard__footer">
        <div className="postioncard__footer-profile">
          <div className="positioncard__footer-profile_img">
            {/* {<ProfileImage images={images} />} */}
          </div>
          <Link title="Add a candidate" to={"/add-candidates"}>
            {<IoMdAddCircle size={20} />}
          </Link>
          <Link title="Add a candidate" to={"/add-candidates"}>
            {<RiDeleteBin2Fill size={20} />}
          </Link>
          <Link title="Add a candidate" to={"/add-candidates"}>
            {<IoMdAddCircle size={20} />}
          </Link>
        </div>
        <div className="positioncard__footer-remaining">
          <p>20 days remaining</p>
        </div>
      </div>
    </div>
  );
}

export default PositionCard;
