import "./electionCard.css";
import ProfileImage from "../../profileImage/ProfileImage";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Link } from "react-router-dom";
import { IoMdAddCircle } from "react-icons/io";
import { useState } from "react";
import { MdDeleteSweep } from "react-icons/md";
import { FaCircleInfo } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";

const images = [
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2550&q=80",
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2550&q=80",
];

function ElectionCard({ data }) {
  const [options, setOption] = useState(false);
  const showOptions = function () {
    setOption(true);
  };

  const closeShowOptions = function () {
    setOption(false);
  };

  return (
    <Link to={`/elections/${data?._id}`}>
      <div
        className="electioncard"
        onMouseLeave={closeShowOptions}
        onClick={closeShowOptions}
      >
        <div onMouseEnter={showOptions}>
          <span className="electioncard__options-btn">
            <BsThreeDotsVertical />
          </span>
        </div>

        {/* options */}

        <div className={`electioncard__options ${options ? "show" : ""}`}>
          <ul>
            <Link to={`/elections/${data?._id}`}>
              <li>
                <span>
                  <FaCircleInfo />
                </span>
                <p>View </p>
              </li>
            </Link>
            <Link to={`/elections/${data?._id}`}>
              <li>
                <span>
                  <FaEdit />
                </span>
                <p>Edit </p>
              </li>
            </Link>
            <Link to={"/elections/:id"}>
              <li>
                <span>
                  <MdDeleteSweep />
                </span>
                <p>Delete </p>
              </li>
            </Link>
          </ul>
        </div>

        {/* end options */}
        <div className="electioncard__header">
          {/* <h3>2020 Academic Election</h3> */}
          <h3>{data?.electionName}</h3>
          {/* <p>University of cape coast</p> */}
          <p>{data?.organisation}</p>
        </div>
        {/*  */}
        <div className="electioncard__content ">
          <h4>Election Date</h4>
          {/* <p>12-12-20</p> */}
          <p>{data?.startDate}</p>
        </div>
        {/*  */}
        <div className=" electioncard__footer">
          <div className="electioncard__footer-profile">
            {/* <div className="electioncard__footer-profile_img"> */}
            {<ProfileImage images={images} />}
            {/* </div> */}
            <Link title="Add a candidate" to={"/add-candidates"}>
              {<IoMdAddCircle size={20} />}
            </Link>
          </div>
          <div className="electioncard__footer-remaining">
            <p>20 days remaining</p>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default ElectionCard;
