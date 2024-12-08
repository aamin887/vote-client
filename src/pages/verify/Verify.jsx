import "./style.css";
import logo from "../../assets/logo.png";
import { useEffect, useState } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import { Loader } from "../../components";
import { toast } from "react-toastify";

function Verify() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { token } = Object.fromEntries([...searchParams]);

  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // check database for token to allow access to this page
  // create an endpoint on server to check tokens
  // if no token redirect to login page
  //

  const verification = async function () {
    try {
      setIsLoading(true);
      const response = await axios.put(`/auth/users/verify?token=${token}`);
      if (response.status === 200) {
        setMessage("Email successfully Verified");
        toast.success("Email verified", {
          toastId: "success",
        });
      }
    } catch (error) {
      console.log(error);
      const errStatus = error?.response.status;
      console.log(errStatus);
      if (errStatus === 409) {
        setMessage("Email already verified");
        toast.error("Email already verified", {
          toastId: "err",
        });
        return navigate("/login", { replace: true });
      } else if (errStatus === 404) {
        setMessage("Can not verify email");
        return toast.error("Email cannot be verified", {
          toastId: "err",
        });
      } else if (errStatus === 400) {
        setMessage("Can not verify email");
        return toast.error("Email cannot be verified", {
          toastId: "err",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    verification();
  }, []);

  return (
    <div className="success section__padding">
      <div className="success__content">
        {isLoading && <Loader />}
        <div className="success__content-img section__margin">
          <img src={logo} alt="" />
          <h2 className="section__heading">Success</h2>
          <p className="section__text lead__text">{message}</p>
          <Link className="btn" to={"/login"}>
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Verify;
