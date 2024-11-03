import { FaEdit } from "react-icons/fa";
import { MdDeleteSweep } from "react-icons/md";
import { Link } from "react-router-dom";

import { FaCircleInfo } from "react-icons/fa6";

function OptionsDropdown({ data, handleDelete }) {
  return (
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

        <Link to={"/elections/:id"}>
          <li>
            <span>
              <FaEdit />
            </span>
            <p>Edit </p>
          </li>
        </Link>
        <button
          onClick={(event) => {
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
  );
}

export default OptionsDropdown;
