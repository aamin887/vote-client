import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import { FaClock, FaLocationDot } from "react-icons/fa6";

import "./election.css";

function Election() {
  return (
    <Link to={"/asas"}>
      <div className="test__card">
        <div className="test__card-header">
          <img src={logo} alt="" />
          <span className="test__card-header_status">Live</span>
        </div>

        <div className="test__card-content">
          <h2 className="test__card-content_title">
            Braintree Elections is on the rising edge
          </h2>
          <div className="test__card-content_details">
            <div className="test__card-content-details_date">
              <span>
                <FaClock />
              </span>
              <p>Monday 19th, September</p>
            </div>
            <div className="test__card-content-details_location">
              <span>
                <FaLocationDot />
              </span>
              <p>Online</p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default Election;
