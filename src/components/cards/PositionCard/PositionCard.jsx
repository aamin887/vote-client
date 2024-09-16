import "./positionCard.css";
import { Link, useNavigate } from "react-router-dom";

import { RiDeleteBin2Fill } from "react-icons/ri";
import { FaFolderOpen } from "react-icons/fa6";

function PositionCard({ data }) {
  const navigate = useNavigate();

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
              alert(data?._id);
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
