import "./style.css";
import logo from "../../assets/logo.png";
import { useLocation } from "react-router-dom";

function PasswordRequest() {
  const location = useLocation();

  // check database for token to allow access to this page
  // create an endpoint on server to check tokens
  // if no token redirect to login page
  //

  console.log(location);
  return (
    <div className="success section__padding">
      <div className="success__content">
        <div className="success__content-img section__margin">
          <img src={logo} alt="" />
          <h2 className="section__heading">Success</h2>
          <p className="section__text lead__text">
            We have succsefuly created your new password. Head back to the login
            page to get access your account
          </p>
        </div>
      </div>
    </div>
  );
}

export default PasswordRequest;
