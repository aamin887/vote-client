import "./style.css";
import newpassword from "../../assets/newpassword.png";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "../../api/axios";
import { toast } from "react-toastify";

function PasswordSuccess() {
  const location = useLocation();
  const navigate = useNavigate();

  const { token } = useParams();

  const checkToken = async function () {
    try {
      const res = await axios.get(`/auth/users/token?token=${token}`);
    } catch (error) {
      console.log(error);

      if (error.response.status) {
        toast.warn("Invalid token");
      }
    }
  };

  useEffect(() => {
    checkToken();
  }, []);

  const handleNavigate = () => {
    navigate("/login", { replace: true });
  };

  return (
    <div className="success section__padding">
      <div className="success__content">
        <div className="success__content-img section__margin">
          <img src={newpassword} alt="" />
          <h2 className="section__heading">Success</h2>
          <p className="section__text lead__text">
            We have succsefuly created your new password. Go back to the login
            page to get access your account
          </p>
          <button onClick={() => handleNavigate()} className="btn auth__btns">
            Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default PasswordSuccess;
