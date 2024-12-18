import "./register.css";
import one from "../../assets/Group13.png";

import { handleSignup } from "../../api/actions";
import { Loader } from "../../components/index";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { CgDanger } from "react-icons/cg";
import { SlEnvolope } from "react-icons/sl";

import {
  IoEyeOutline,
  IoEyeOffOutline,
  IoLockClosedOutline,
} from "react-icons/io5";
import { toast } from "react-toastify";

function Register() {
  const refEmail = useRef();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [togglePassword, setPTogglePassword] = useState(false);
  const [validEmail, setValidEmail] = useState(false);
  const [validPassword, setValidPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const PASSWORD_REGEX =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;
  const UNIQUE_REGEX = /^[A-Z][a-z]+(?: [A-Z][a-z]+)*$/;

  const { email, password, confirmPassword } = formData;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password || !confirmPassword) {
      return toast.error("Fill all fields", {
        toastId: "emptyFields",
      });
    }

    if (!validEmail || !validPassword) {
      return toast.error("Make sure all fields are valid", {
        toastId: "emptyFields",
      });
    }

    try {
      setLoading(true);
      const response = await handleSignup({
        email,
        password,
        confirmPassword,
      });

      if (response.status === 201) {
        toast.success("Account successfully created.", {
          toastId: "success",
        });

        setFormData({
          email: "",
          password: "",
          confirmPassword: "",
        });

        navigate("/login", { replace: true });
      }
    } catch (error) {
      const errStatus = error?.response?.status;

      if (errStatus === 500) {
        return toast.error("Internal error ", {
          toastId: "networkError",
        });
      } else if (errStatus === 400) {
        return toast.error("Fill all fields", {
          toastId: "emptyFields",
        });
      } else if (errStatus === 409) {
        return toast.error("User already taken!", {
          toastId: "userTaken",
        });
      } else if (errStatus === 422) {
        return toast.error("passwords do not match ", {
          toastId: "networkError",
        });
      } else {
        return toast.error("Network error ", {
          toastId: "networkError",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((data) => ({ ...data, [name]: value }));
  };

  const handlePasswordToggle = () => {
    setPTogglePassword(!togglePassword);
  };

  useEffect(() => {
    refEmail.current.focus();
  }, []);

  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email));
    setValidPassword(PASSWORD_REGEX.test(password));
  }, [email, password]);

  return (
    <div className="register__site section__padding">
      <div className="register__left">
        <div className="register__left-header">
          <h1 className="section__heading title__text">Create an Account</h1>
        </div>

        {loading && <Loader />}
        <div className="register__left-form">
          <form onSubmit={handleSubmit} autoComplete="off">
            {/* email */}
            <div className="form__control form__control-margin">
              <label htmlFor="email" className="form__control-label">
                Email
              </label>
              <div className="form__control-input underline">
                <span className="form__control-input_icon">
                  <SlEnvolope color="#fffff" size={32} />
                </span>
                <input
                  type="email"
                  ref={refEmail}
                  name="email"
                  id="email"
                  value={email}
                  autoComplete={"off"}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="form__control-margin">
              <p
                className={
                  email && !validEmail
                    ? "form__control-input_instructions"
                    : "form__control-input_offscreen"
                }
              >
                <CgDanger
                  size={20}
                  color={"#b3790c"}
                  className="error__icons"
                />
                <br />
                Must be a valid email:
                <br /> E.g example@gmail.com
                <br />
                example@yahoo.co.uk
              </p>
            </div>

            {/* password */}
            <div className="form__control form__control-margin underline">
              <label htmlFor="password" className="form__control-label">
                Password
              </label>
              <div className="form__control-input">
                <span className="form__control-input_icon">
                  <IoLockClosedOutline color={"#fffff"} size={32} />
                </span>
                <input
                  type={togglePassword ? "text" : "password"}
                  name="password"
                  id="password"
                  autoComplete="off"
                  value={password}
                  onChange={handleChange}
                />
                <span
                  className="form__control-password_toggle"
                  onClick={handlePasswordToggle}
                >
                  {togglePassword ? (
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
                  password && !validPassword
                    ? "form__control-input_instructions"
                    : "form__control-input_offscreen"
                }
              >
                <CgDanger
                  size={20}
                  color={"#b3790c"}
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
              <label htmlFor="confirmPassword" className="form__control-label">
                Confirm password
              </label>
              <div className="form__control-input">
                <span className="form__control-input_icon">
                  <IoLockClosedOutline color={"#fffff"} size={32} />
                </span>
                <input
                  type={togglePassword ? "text" : "password"}
                  name="confirmPassword"
                  id="confirmPassword"
                  autoComplete="off"
                  value={confirmPassword}
                  onChange={handleChange}
                />
                <span
                  className="form__control-password_toggle"
                  onClick={handlePasswordToggle}
                >
                  {togglePassword ? (
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
                  confirmPassword !== password
                    ? "form__control-input_instructions"
                    : "form__control-input_offscreen"
                }
              >
                <CgDanger
                  size={20}
                  color={"#b3790c"}
                  className="error__icons"
                />
                <br />
                Passwords must match
              </p>
            </div>

            {/* <div className="form__control form__control-margin inline">
                <div className="form__control-checkbox">
                  <input
                    type="checkbox"
                    name="remember_me"
                    id="remember_me"
                    onChange={handleChange}
                  />
                  <label htmlFor="remember_me">Remember me</label>
                </div>
                <div className="form__control-reset">
                  <Link to={"/password-reset"}>Forget password</Link>
                </div>
              </div> */}

            <div className="form__control">
              <button type="submit" className="btn auth__btns">
                Register
              </button>
              <p className="form__control-footnote">
                Already have an account?{" "}
                <span className="form__control-footnote-link">
                  <Link to={"/login"}>Login</Link>
                </span>
              </p>
            </div>
          </form>
        </div>
      </div>
      <div className="register__right">
        <div className="register__right-img">
          <img src={one} style={{}} alt="illustration" className="noselect" />
        </div>
        <div className="register__right-heading">
          <h2 className="">Votes</h2>
          <p className="section__text">
            Vote today and shape a brighter future
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
