import "./passwordrequest.css";
import one from "../../assets/Group13.png";

import { requestPasswordChange } from "../../api/actions";

import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { CgDanger } from "react-icons/cg";
import { FaCheck } from "react-icons/fa";
import { toast } from "react-toastify";

import { SlEnvolope } from "react-icons/sl";

function PasswordRequest() {
  const refEmail = useRef();
  const [showMessage, setShowMessage] = useState(false);
  const [validEmail, setValidEmail] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
  });
  const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const { email } = formData;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      return toast.error("Fill all fields ", {
        toastId: "emptyFields",
      });
    }

    try {
      const response = await requestPasswordChange(email);

      if (response.status === 201) {
        setShowMessage(true);
      }
      setFormData({
        email: "",
      });
    } catch (error) {
      const errStatus = error?.response.status;

      if (errStatus === 401) {
        return toast.error("Invalid email", {
          toastId: "invalid",
        });
      } else {
        return toast.error("Internal error", {
          toastId: "error",
        });
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((data) => ({ ...data, [name]: value }));
  };

  useEffect(() => {
    refEmail.current.focus();
  }, []);

  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email));
  }, [email]);

  return (
    <div className="reset__site section__padding">
      {/* right */}
      <div className="reset__left">
        <div className="register__right-img">
          <img src={one} style={{}} alt="illustration" className="noselect" />
        </div>
        <div className="reset__right-heading">
          <h2 className="">Votes</h2>
          <p className="section__text">
            Vote today and shape a brighter future
          </p>
        </div>
      </div>

      <div className="reset__right">
        <div className="reset__left-header">
          <h1 className="section__heading title__text">Forgot password?</h1>
          <p className="section__text lead__text">
            Don&apos;t worry we can help you out! if you still remember your
            email address you can quickly reset your password. Just input that
            information in the fields below and click on the button. This will
            send you a new email that will link you to the password change
            website.
          </p>
        </div>

        {showMessage && (
          <div className="form__control-margin">
            <p className="form__control-input_instructions">
              <FaCheck size={20} color="#ffc42a" className="check__icons" />
              The password reset link has been sent to your email. If you didn’t
              receive the password reset link, check your email spam.
            </p>
          </div>
        )}

        <div className="reset__left-form">
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

            <div className="form__control">
              <button type="submit" className="btn auth__btns">
                Reset password
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
    </div>
  );
}

export default PasswordRequest;
