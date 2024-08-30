import "./election.css";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";

function Election() {
  return (
    <div className="election">
      <Link to={"/"}>
        <div className="election__content">
          <div className="election__content-header">
            <div className="election__content-logo">
              <img src={logo} alt="" />
            </div>
            <div className="election__content-title">
              <h5>Braintree election</h5>
            </div>
          </div>
          <div className="election__content-due">
            <p>23/11/2002</p>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default Election;
