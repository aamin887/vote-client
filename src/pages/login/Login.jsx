import "./login.css";
import one from "../../assets/Group13.png";
import useAuth from "../../hooks/useAuth";
import { handleLogin } from "../../api/actions";

import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { CgDanger } from "react-icons/cg";
import { toast } from "react-toastify";

import { SlEnvolope } from "react-icons/sl";

import {
  IoEyeOutline,
  IoEyeOffOutline,
  IoLockClosedOutline,
} from "react-icons/io5";
import { Loader } from "../../components";

function Login() {
  const refEmail = useRef();

  const navigate = useNavigate();
  const location = useLocation();
  // check to see where we came from, otherwise to the dashboard
  const from = location.state?.from?.pathname || "/dashboard";

  const { setAuth, persist, setPersist } = useAuth();

  const [togglePassword, setPTogglePassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [validEmail, setValidEmail] = useState(false);
  const [formData, setFormData] = useState({
    email: "alhassanamin96@gmail.com",
    password: "Test@123",
    remember_me: persist,
  });

  const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const { email, password } = formData;

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(import.meta.env.VITE_API, "link");

    if (!email || !password) {
      return toast.error("Fill all fields", {
        toastId: "emptyFields",
      });
    }

    try {
      setLoading(true);
      const response = await handleLogin({ email, password });
      console.log(response, "login", import.meta.env.VITE_API);
      const { id, email: userEmail, accessToken, terms } = response.data;
      setAuth({ id, userEmail, accessToken, terms });
      setFormData({
        email: "",
        password: "",
      });

      if (response.status === 200) {
        toast.success("welcome", {
          toastId: "success",
        });
      }
      navigate(from, { replace: true });
    } catch (error) {
      console.log(error, ";>>>");
      const errStatus = error?.response.status;
      if (errStatus === 401) {
        return toast.error(
          "Your account is not verified. Please verify your email.",
          {
            toastId: "emptyfields",
          }
        );
      } else if (errStatus === 404 || errStatus === 422) {
        return toast.error("user does not exist", {
          toastId: "invalid",
        });
      } else if (errStatus === 400) {
        return toast.error("Incorrect email or password", {
          toastId: "incorrectCredentials",
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
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      setPersist((prev) => !prev);
    } else {
      setFormData((data) => ({ ...data, [name]: value }));
    }
  };

  useEffect(() => {
    localStorage.setItem("persist", persist);
  }, [persist]);

  const handlePasswordToggle = () => {
    setPTogglePassword(!togglePassword);
  };

  useEffect(() => {
    refEmail.current.focus();
  }, []);

  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email));
  }, [email]);

  return (
    <div className="login__site section__padding">
      <div className="login__left">
        <div className="login__left-header">
          <h1 className="section__heading title__text">Log in</h1>
        </div>

        {loading && <Loader />}

        <div className="login__left-form">
          <form onSubmit={handleSubmit}>
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
                  autoComplete="off"
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
                <CgDanger size={20} color="#b3790cf" className="error__icons" />
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

            <div className="form__control form__control-margin inline">
              <div className="form__control-checkbox">
                <input
                  type="checkbox"
                  name="remember_me"
                  id="remember_me"
                  onChange={handleChange}
                  checked={persist}
                />
                <label htmlFor="remember_me">Remember me</label>
              </div>
              <div className="form__control-reset">
                <Link to={"/change-password"}>Forget password</Link>
              </div>
            </div>

            <div className="form__control">
              <button type="submit" className="btn auth__btns">
                Login
              </button>
              <p className="form__control-footnote">
                Don&rsquo;t have an account?{" "}
                <span className="form__control-footnote-link">
                  <Link to={"/register"}>Signup</Link>
                </span>
              </p>
            </div>
          </form>
        </div>
      </div>
      <div className="login__right">
        <div className="login__right-img">
          <img src={one} alt="illustration" className="noselect" />
        </div>
        <div className="login__right-heading">
          <h2 className="">Votes</h2>
          <p className="section__text">
            Vote today and shape a brighter future
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
