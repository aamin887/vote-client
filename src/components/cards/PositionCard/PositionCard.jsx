import "./positionCard.css";
import { useNavigate } from "react-router-dom";

import { RiDeleteBin2Fill } from "react-icons/ri";
import { FaFolderOpen } from "react-icons/fa6";
import { axiosPrivate } from "../../../api/axios";
import { toast } from "react-toastify";


function PositionCard({ data, setAllPosition }) {
  const navigate = useNavigate();

  const handleDeleteProfile = async function (id) {
    try {
      const res = await axiosPrivate.delete(`/api/v1/positions/${id}`);
      if (res.status === 204) {
        setAllPosition((pos) => {
          const d = pos.filter((p) => p._id !== id);
          return d;
        });
      }
      return;
    } catch (error) {
      const statusCode = error?.response?.data?.status;
      if (statusCode === 404) {
        return toast.error("election not found");
      } else {
        return toast.error("network error");
      }
    }
  };

  return (
    <div className="positioncard">
      <div className="positioncard__header">
        <h3>{data?.positionName}</h3>
        <p>{data?.positionDescription}</p>
      </div>
      {/*  */}
      <div className="positioncard__content">
        <h4>Number of candicates</h4>
        <div className="positioncard__content-inline">
          <p>{data?.candidates.length}</p>
        </div>
      </div>
      {/*  */}
      <div className=" positioncard__footer">
        <div className="positioncard__footer-remaining">
          <button
            className="positioncard__footer-remaining_btn"
            onClick={() => navigate(`/elections/positions/${data?._id}`)}
          >
            {<FaFolderOpen size={20} />}View
          </button>
          <button
            className="positioncard__footer-remaining_btn"
            onClick={() => {
              handleDeleteProfile(data?._id);
            }}
          >
            {<RiDeleteBin2Fill size={20} />}
            delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default PositionCard;
