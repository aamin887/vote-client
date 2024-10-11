import "./electionCard.css";
import { Link } from "react-router-dom";
import { IoMdAddCircle } from "react-icons/io";
import { useState } from "react";

function ElectionCard({ data }) {
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

  console.log(data);

  return (
    <Link to={`/elections/${data?._id}`}>
      <div className="electioncard">
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
