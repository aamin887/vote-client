import "./electionCard.css";
import { useState } from "react";
import { format } from "date-fns";

import { BsThreeDotsVertical } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { IoMdAddCircle } from "react-icons/io";
import { FaTimes, FaEdit } from "react-icons/fa";
import { FaCircleInfo } from "react-icons/fa6";
import { MdDeleteSweep } from "react-icons/md";

import useDateDiff from "../../../hooks/useDateDiff";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { ConfirmationDialog } from "../../../components";
import ProfileImage from "../../profileImage/ProfileImage";
import { toast } from "react-toastify";

function ElectionCard({ data }) {
  const navigate = useNavigate();
  const [options, setOptions] = useState(false);
  const [show, setShow] = useState(false);
  const axiosPrivate = useAxiosPrivate();

  // delete an election
  const handleDeleteElection = async function (id) {
    try {
      const res = await axiosPrivate.delete(`/api/v1/elections/${id}`);
      console.log(res, "asas===>");
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

  const dateDiff = useDateDiff(data?.endDate);
  return (
    <Link to={`/elections/${data?._id}`}>
      <ConfirmationDialog
        title={`Are you sure?`}
        icon={<FaTimes />}
        isOpened={show}
        id={data?._id}
        onProceed={handleDeleteElection}
        onClose={() => setShow(false)}
      >
        <p>
          Do you really want to delete {data?.name} election? This process
          cannot be undone.
        </p>
      </ConfirmationDialog>
      <div className="electioncard">
        <div className="electioncard__footer-remaining">
          {dateDiff != "Time expired" ? "Time remaining" : ""}
          <p>{dateDiff}</p>
        </div>
        {options && (
          <div className={`electioncard__options`}>
            <ul>
              <Link to={`/elections/${data?._id}`}>
                <li>
                  <span>
                    <FaCircleInfo />
                  </span>
                  <p>View </p>
                </li>
              </Link>

              <li
                onClick={() =>
                  navigate(`/elections/${data?._id}`, { state: true })
                }
              >
                <span>
                  <FaEdit />
                </span>
                <p>Edit </p>
              </li>

              <button
                onClick={(e) => {
                  e.preventDefault();
                  setShow(true);
                  return;
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
        )}

        <span
          className="electioncard__options-btn"
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            setOptions(!options);
          }}
        >
          <BsThreeDotsVertical />
        </span>

        <div className="electioncard__header">
          <h3>{data?.name}</h3>
        </div>
        {/*  */}
        <div className="electioncard__content ">
          <h4>Election Date</h4>
          <p>{format(data?.endDate, "MMMM do, yyyy")}</p>
        </div>
        {/*  */}
        <div className=" electioncard__footer">
          <div className="electioncard__footer-profile">
            {<ProfileImage />}
            <Link title="Add a candidate" to={"/add-candidates"}>
              {<IoMdAddCircle size={20} />}
            </Link>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default ElectionCard;
