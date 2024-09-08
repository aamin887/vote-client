import "./positionCard.css";
import { Link, useNavigate } from "react-router-dom";
import { IoMdAddCircle } from "react-icons/io";
import { RiDeleteBin2Fill } from "react-icons/ri";

function PositionCard({ data, election }) {
  const navigate = useNavigate();
  console.log(data, ">>><<<>><<");
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
          <button className="positioncard__footer-remaining_btn">
            {<RiDeleteBin2Fill size={20} />}
            delete position
          </button>

          <button
            className="positioncard__footer-remaining_btn"
            onClick={() =>
              navigate(`/elections/positions/${data?._id}`, {
                state: election,
              })
            }
          >
            {<IoMdAddCircle size={20} />}View
          </button>
        </div>
      </div>
    </div>
  );
}

export default PositionCard;
