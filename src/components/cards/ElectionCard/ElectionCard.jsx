import "./electionCard.css";
import ProfileImage from "../../profileImage/ProfileImage";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { IoMdAddCircle } from "react-icons/io";
import { ConfirmationDialog } from "../../../components";
import { useState } from "react";

import { format } from "date-fns";
import OptionsDropdown from "../../optionsdropdown/OptionsDropdown";
import { FaTimes } from "react-icons/fa";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";

function ElectionCard({ data }) {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();

  // delete an election
  const handleDeleteElection = async function (id) {
    try {
      const res = axiosPrivate.delete(`/api/v1/elections/${id}`);
      console.log(res);
      return navigate("/elections");
    } catch (error) {
      const statusCode = error.response.status;

      if (statusCode === 404) {
        return toast.error("election does not exit");
      }
      if (statusCode === 401) {
        return toast.error("not allowed");
      }
    } finally {
      setLoading(false);
    }
  };

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
    <div
      className="electioncard"
      onMouseLeave={closeShowOptions}
      onClick={closeShowOptions}
    >
      {/* options */}

      {options && <OptionsDropdown data={data} setShow={setShow} />}
      {/* end options */}
      <div onMouseEnter={showOptions}>
        <span className="electioncard__options-btn">
          <BsThreeDotsVertical />
        </span>
      </div>
      <Link to={`/elections/${data?._id}`}>
        <div className="electioncard__header">
          <h3>{data?.name}</h3>
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
      </Link>
    </div>
  );
}

export default ElectionCard;
