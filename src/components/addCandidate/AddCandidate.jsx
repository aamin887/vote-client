import "./addcandidateform.css";
import { useState, useRef } from "react";
import useAuth from "../../hooks/useAuth";
import { axiosPrivate } from "../../api/axios";
import { useNavigate } from "react-router-dom";

const AddCandidateForm = () => {
  const [formData, setFormData] = useState({
    electionName: "",
    startDate: "",
    description: "",
  });
  const descRef = useRef();
  const navigate = useNavigate();

  const { auth } = useAuth();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFocus = function (e) {
    const desValue = descRef.current;

    if (desValue.value.length > 0) {
      desValue.classList.add("valid");
    } else {
      desValue.classList.remove("valid");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const organisationId = auth.id;
    const res = await axiosPrivate.post("/api/v1/elections", {
      electionName,
      description,
      startDate,
      organisation: organisationId,
    });

    console.log(res.status);

    if (res.status === 201) {
      console.log("dd");
      return navigate("/elections");
    }
  };

  const { electionName, startDate, description } = formData;
  return (
    <div className="addcandidate">
      <div className="addcandidate__content">
        <div className="addcandidate__content-title">
          <h2 className="section__heading">Create an election</h2>
          <p className="section__text lead__text">
            Fill in all required field to create election
          </p>
        </div>

        <form onSubmit={handleSubmit} className="addcandidate__form">
          <div className="addcandidate__form-details">
            {/* elections name */}
            <div className="addcandidate__form-details_control">
              <span className="details">Election Title</span>
              <input
                type="text"
                placeholder="E.g 2022 Leadership"
                onChange={handleChange}
                name="electionName"
                value={electionName}
                required
              />
            </div>
            <div className="addcandidate__form-details_control">
              <span className="details">Election Date</span>
              <input
                type="text"
                name="startDate"
                placeholder="E.g 2022 Leadership"
                value={startDate}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="addcandidate__form-details-fl">
            {/* elections name */}
            <div className="addcandidate__form-details_control">
              <span className="details">Description</span>
              <textarea
                name="description"
                ref={descRef}
                onBlur={handleFocus}
                placeholder="What is the election about?"
                onChange={handleChange}
                value={description}
              ></textarea>
            </div>
          </div>

          <div className="button">
            <button type="submit">Submit</button>
            <button type="button">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCandidateForm;

{
  /* <div className="gender__details">
            <input type="radio" name="gender" id="dot-1" />
            <input type="radio" name="gender" id="dot-2" />
            <input type="radio" name="gender" id="dot-3" />
            <span className="gender__title">Gender</span>

            <div className="category">
              <label htmlFor="dot-1">
                <span className="dot one"></span>
                <span>Male</span>
              </label>
              <label htmlFor="dot-2">
                <span className="dot two"></span>
                <span>Female</span>
              </label>
              <label htmlFor="dot-3">
                <span className="dot three"></span>
                <span>Prefer not to say</span>
              </label>
            </div>
          </div> */
}
