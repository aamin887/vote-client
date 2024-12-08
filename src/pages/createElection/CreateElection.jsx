import "./createelection.css";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { DateTimePicker, Loader } from "../../components";

const CreateElection = () => {
  const axiosPrivate = useAxiosPrivate();
  // textarea reference
  const descRef = useRef();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/dashboard";

  // form data state
  const [formData, setFormData] = useState({
    electionName: "",
    startDate: "",
    endDate: "",
    description: "",
  });

  // changing form fields
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // handle Focus form TextArea to add border to indicate input availability
  const handleFocusTextArea = function () {
    const desValue = descRef.current;
    if (desValue.value.length > 0) {
      desValue.classList.add("valid");
    } else {
      desValue.classList.remove("valid");
    }
  };

  // form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const res = await axiosPrivate.post("/api/v1/elections", {
        name: electionName,
        description,
        startDate,
        endDate,
      });

      console.log(res);

      if (res.status === 201) {
        toast.success("Election successfully created");
        return navigate("/dashboard");
      }
    } catch (error) {
      console.log(error);
      const statusCode = error.response.data.status;
      if (statusCode === 409) {
        return toast.error(`Election already exists.`);
      } else if (statusCode === 422) {
        return toast.error(
          `check form inputs to make sure all fields are valid`
        );
      } else if (statusCode === 400) {
        return toast.error(`could not create election`);
      } else {
        return toast.error(`network error`);
      }
    } finally {
      setLoading(false);
    }
  };

  // form data
  const { electionName, startDate, description, endDate } = formData;

  return (
    <div className="createelection">
      {loading && <Loader />}
      <div className="createelection__content">
        <div className="createelection__content-title">
          <h2 className="section__heading">Create a new election</h2>
          <p className="section__text lead__text">
            Fill in all required field to create election
          </p>
        </div>

        <form onSubmit={handleSubmit} className="createelection__form">
          {/* election name */}
          <div className="createelection__form-details-fl">
            {/* elections name */}
            <div className="createelection__form-details_control">
              <span className="details">Election Name</span>
              <input
                type="text"
                placeholder="E.g 2022 Leadership"
                onChange={handleChange}
                name="electionName"
                value={electionName}
                required
              />
            </div>
          </div>

          <div className="createelection__form-details">
            {/* elections dates */}
            <div className="createelection__form-details_control">
              {/* <span className="details">Start Date</span>
              <input
                type="text"
                placeholder="E.g 2022 Leadership"
                onChange={handleChange}
                name="startDate"
                value={startDate}
                required
              /> */}

              <DateTimePicker
                label={"Start Date"}
                name={"startDate"}
                setDate={setFormData}
              />
            </div>
            <div className="createelection__form-details_control">
              {/* <span className="details">End Date</span> */}
              {/* <input
                type="text"
                name="endDate"
                placeholder="E.g 2022"
                value={endDate}
                onChange={handleChange}
                required
              /> */}

              <DateTimePicker
                label={"End Date"}
                name={"endDate"}
                setDate={setFormData}
              />
            </div>
          </div>

          <div className="createelection__form-details-fl">
            {/* elections name */}
            <div className="createelection__form-details_control">
              <span className="details">Description</span>
              <textarea
                name="description"
                ref={descRef}
                onBlur={handleFocusTextArea}
                placeholder="What is the election about?"
                onChange={handleChange}
                value={description}
                required
              ></textarea>
            </div>
          </div>
          <div className="button">
            <button type="submit">create election</button>
            <button
              type="button"
              onClick={() => {
                navigate(from, { replace: true });
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateElection;
