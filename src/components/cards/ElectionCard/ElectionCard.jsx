import "./electionCard.css";
import ProfileImage from "../../profileImage/ProfileImage";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Link } from "react-router-dom";
import { IoMdAddCircle } from "react-icons/io";
import { useState } from "react";
import { axiosPrivate } from "../../../api/axios";
import { MdDeleteSweep } from "react-icons/md";
import { FaCircleInfo } from "react-icons/fa6";

const images = [
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2550&q=80",
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2550&q=80",
];

function ElectionCard({ data, handleDelete }) {
  const [options, setOption] = useState(false);

  const date_diff_indays = function (date1, date2) {
    const dt1 = new Date(data?.startDate);
    const dt2 = new Date(data?.endDate);
    let remains = Math.floor(
      (Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) -
        Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate())) /
        (1000 * 60 * 60 * 24)
    );

    return remains > 1
      ? `${remains} days remaining`
      : `${remains} day remaining`;
  };

  console.log(date_diff_indays());

  const showOptions = function () {
    setOption(true);
  };

  const closeShowOptions = function () {
    setOption(false);
  };

  console.log(data);

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
            <li>
              <span>
                <FaCircleInfo />
              </span>
              <p>View </p>
            </li>

            <button
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                handleDelete(data._id);
              }}
            >
              <li>
                <span>
                  <MdDeleteSweep />
                </span>
                <p>Delete </p>
              </li>
            </button>
          </ul>
        </div>

        {/* end options */}

        <div className="electioncard__header">
          <h3>{data?.electionName}</h3>
          <p>{data?.organisation}</p>
        </div>
        {/*  */}
        <div className="electioncard__content ">
          <h4>Election Date</h4>
          <p>{data?.startDate}</p>
        </div>
        {/*  */}
        <div className=" electioncard__footer">
          <div className="electioncard__footer-profile">
            {/* <div className="electioncard__footer-profile_img"> */}
            {<ProfileImage images={images} />}
            {/* </div> */}

            {<IoMdAddCircle size={20} />}
          </div>
          <div className="electioncard__footer-remaining">
            <p>{date_diff_indays()}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default ElectionCard;
