import "./positionCard.css";
import { useNavigate } from "react-router-dom";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { FaFolderOpen } from "react-icons/fa6";

function PositionCard({ data, isOpened }) {
  const navigate = useNavigate();

  return (
    <div className="positioncard">
      <div className="positioncard__header">
        <h3>{data?.position}</h3>
        <p>
          {data?.description.split(" ").slice(0, 5).join(" ").toString()}
          {data?.description.split(" ").length > 5 ? "...." : ""}
        </p>
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
            {<FaFolderOpen size={20} />}Open
          </button>
          <button
            className="positioncard__footer-remaining_btn"
            onClick={() => {
              isOpened(true);
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
