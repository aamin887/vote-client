import "./changepassword.css";
import one from "../../assets/Group13.png";
import axios from "../../api/axios";

import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { CgDanger } from "react-icons/cg";
import { toast } from "react-toastify";

import {
  IoEyeOutline,
  IoEyeOffOutline,
  IoLockClosedOutline,
} from "react-icons/io5";
import { Error } from "../../components/toasts/Main";

function ChangePassword() {
  const refNewPassword = useRef();
  const navigate = useNavigate();
  const [urlQuery, setUrlQuery] = useSearchParams();

  const PASSWORD_REGEX =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;

  const token = urlQuery.get("token");
  const id = urlQuery.get("id");

  const [toggleNewPassword, setPToggleNewPassword] = useState(false);
  const [toggleConfirmNewPassword, setToggleConfirmNewPassword] =
    useState(false);
  const [validNewPassword, setValidNewPassword] = useState(false);
  const [formData, setFormData] = useState({
    newPassword: "",
    confirmNewPassword: "",
  });

  const handleNewPasswordToggle = () => {
    setPToggleNewPassword(!toggleNewPassword);
  };
  const handleConfirmNewPasswordToggle = () => {
    setToggleConfirmNewPassword(!toggleConfirmNewPassword);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((data) => ({ ...data, [name]: value }));
  };

  const { newPassword, confirmNewPassword } = formData;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newPassword || !confirmNewPassword) {
      return toast.error(<Error message={"Fill in fields"} />, {
        toastId: "emptyFields",
      });
    }
    try {
      const response = await axios.post(
        `/auth/password-new-link?token=${token}&id=${id}`,
        {
          newPassword,
          confirmNewPassword,
        }
      );

      console.log(response);

      if (response.status === 204) {
        toast.success(<Error message={"Password change successful "} />, {
          toastId: "loginSuccessful",
        });
        setFormData({
          newPassword: "",
          confirmNewPassword: "",
        });

        navigate("/login", { replace: true });
      }
    } catch (error) {
      if (!error?.response) {
        return toast.error(<Error message={"Network error "} />, {
          toastId: "networkError",
        });
      } else if (error?.response.status === 400) {
        return toast.error(<Error message={"Check form fields"} />, {
          toastId: "emptyField",
        });
      } else if (error?.response.status === 403) {
        toast.error(<Error message={"Password reset link expired"} />, {
          toastId: "tokenExpired",
        });
        return navigate("/password-reset", { replace: true });
      } else {
        return toast.error(<Error message={"Network error "} />, {
          toastId: "networkError",
        });
      }
    }
  };

  useEffect(() => {
    refNewPassword.current.focus();
  }, []);

  const checkToken = async function () {
    try {
      const response = await axios.post(`/auth/token`, {
        token,
      });

      if (response.status === 429) {
        toast.warn(<Error message={"Reset used, request a new one"} />, {
          toastId: "usedToken",
        });
        return navigate("/login", { replace: true });
      }
    } catch (error) {
      if (error.response.status) {
        toast.warn("Reset link expired");
        navigate("/login");
      }
    }
  };

  useEffect(() => {
    checkToken();
  }, []);

  useEffect(() => {
    setValidNewPassword(PASSWORD_REGEX.test(newPassword));
  }, [newPassword]);

  return (
    <div className=" section__padding">
      <div className="login__site">
        <div className="login__left">
          <div className="login__left-header">
            <h1 className="section__heading title__text">Change password</h1>
            <p className="section__text lead__text">
              Input your new desired password in the input fields below to
              create a new password. We strongly advise you to store it safely.
            </p>
          </div>

          <div className="login__left-form">
            <form onSubmit={handleSubmit}>
              {/* email */}
              <div className="form__control form__control-margin underline">
                <label htmlFor="newPassword" className="form__control-label">
                  New password
                </label>
                <div className="form__control-input">
                  <span className="form__control-input_icon">
                    <IoLockClosedOutline color={"#fffff"} size={32} />
                  </span>
                  <input
                    type={toggleNewPassword ? "text" : "password"}
                    name="newPassword"
                    id="newPassword"
                    autoComplete="off"
                    ref={refNewPassword}
                    value={newPassword}
                    onChange={handleChange}
                  />
                  <span
                    className="form__control-password_toggle"
                    onClick={handleNewPasswordToggle}
                  >
                    {toggleNewPassword ? (
                      <IoEyeOffOutline size={18} color={"#ffc42a"} />
                    ) : (
                      <IoEyeOutline size={18} color={"#ffc42a"} />
                    )}
                  </span>
                </div>
              </div>
              {/* info notice */}
              <div className="form__control-margin">
                <p
                  className={
                    newPassword && !validNewPassword
                      ? "form__control-input_instructions"
                      : "form__control-input_offscreen"
                  }
                >
                  <CgDanger
                    size={20}
                    color="#b3790cf"
                    className="error__icons"
                  />
                  <br />
                  Must between 8 and 20 characters
                  <br /> atleast an uppercase letter and a number
                  <br />a symbol (@ $ ! % * ?&)
                </p>
              </div>
              {/* confirm password */}
              <div className="form__control form__control-margin underline">
                <label htmlFor="password" className="form__control-label">
                  Confirm new password
                </label>
                <div className="form__control-input">
                  <span className="form__control-input_icon">
                    <IoLockClosedOutline color={"#fffff"} size={32} />
                  </span>
                  <input
                    type={toggleConfirmNewPassword ? "text" : "password"}
                    name="confirmNewPassword"
                    id="confirmNewPassword"
                    autoComplete="off"
                    value={confirmNewPassword}
                    onChange={handleChange}
                  />
                  <span
                    className="form__control-password_toggle"
                    onClick={handleConfirmNewPasswordToggle}
                  >
                    {toggleConfirmNewPassword ? (
                      <IoEyeOffOutline size={18} color={"#ffc42a"} />
                    ) : (
                      <IoEyeOutline size={18} color={"#ffc42a"} />
                    )}
                  </span>
                </div>
              </div>

              <div className="form__control-margin">
                <p
                  className={
                    confirmNewPassword !== newPassword
                      ? "form__control-input_instructions"
                      : "form__control-input_offscreen"
                  }
                >
                  <CgDanger
                    size={20}
                    color="#b3790cf"
                    className="error__icons"
                  />
                  <br />
                  password do not match
                </p>
              </div>

              <div className="form__control">
                <button
                  disabled={
                    newPassword === confirmNewPassword && validNewPassword
                      ? false
                      : true
                  }
                  type="submit"
                  className="btn"
                >
                  Change password
                </button>
                <p className="form__control-footnote">
                  Do you need help?{" "}
                  <span className="form__control-footnote-link">
                    <Link to={"/register"}>Customer support</Link>
                  </span>
                </p>
              </div>
            </form>
          </div>
        </div>
        <div className="login__right">
          <div className="login__right-img">
            <img src={one} style={{}} alt="illustration" className="noselect" />
          </div>
          <div className="login__right-heading">
            <h2 className="">Votes</h2>
            <p className="section__text">
              Vote today and shape a brighter future
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChangePassword;
