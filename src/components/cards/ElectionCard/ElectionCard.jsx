import "./electionCard.css";
import ProfileImage from "../../profileImage/ProfileImage";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Link } from "react-router-dom";
import { IoMdAddCircle } from "react-icons/io";
import { useState } from "react";

import { format } from "date-fns";
import OptionsDropdown from "../../optionsdropdown/OptionsDropdown";

function ElectionCard({ data, handleDelete }) {
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
        {/* options */}

        {options && <OptionsDropdown data={data} handleDelete={handleDelete} />}

        {/* end options */}
        <div className="electioncard__header">
          <div onMouseEnter={showOptions}>
            <span className="electioncard__options-btn">
              <BsThreeDotsVertical />
            </span>
          </div>
          <h3>{data?.electionName}</h3>
          <p>{data?.organisation}</p>
        </div>
        {/*  */}
        <div className="electioncard__content ">
          <h4>Election Date</h4>
          <p>{format(data?.startDate, "MMMM do, yyyy")}</p>
        </div>
        {/*  */}
        <div className=" electioncard__footer">
          <div className="electioncard__footer-profile">
            {/* <div className="electioncard__footer-profile_img"> */}
            {<ProfileImage />}
            {/* </div> */}
            <Link title="Add a candidate" to={"/add-candidates"}>
              {<IoMdAddCircle size={20} />}
            </Link>
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
