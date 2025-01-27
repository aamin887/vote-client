import "./registervoter.css";

import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useAuth from "../../hooks/useAuth";
import { Loader } from "../../components";

function RegisterVoter() {
  const { electionId } = useParams();
  const { auth } = useAuth();
  const organisationId = auth.id;

  const axiosPrivate = useAxiosPrivate();

  const [electionDetails, setElectionDetails] = useState({});
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    imgfile: "",
  });

  const descRef = useRef();
  const navigate = useNavigate();

  const handleFocus = function () {
    const desValue = descRef.current;
    if (desValue.value.length > 0) {
      desValue.classList.add("valid");
    } else {
      desValue.classList.remove("valid");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const formattedData = new FormData();

      formattedData.append("fullName", formData.fullName);
      formattedData.append("email", formData.email);
      formattedData.append("password", "P@ssword@1");
      formattedData.append("confirmPassword", "P@ssword@1");
      formattedData.append("election", electionId);
      formattedData.append("image", formData?.imgfile);

      const res = await axiosPrivate.post(
        `/api/v1/elections/${electionId}/voters`,
        formattedData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (res.status === 201) {
        toast.success("Voter added successfully");
        setFormData({
          fullName: "",
          email: "",
          imgfile: "",
        });
        return navigate(0);
      }
    } catch (error) {
      console.log(error, "newelikg");
      const statusCode = error?.response?.data?.status;
      if (statusCode === 404) {
        return toast.error("not found");
      } else if (statusCode === 403) {
        return toast.error("candidate already exist");
      } else {
        return toast.error("network error ");
      }
    } finally {
      setLoading(false);
    }
  };

  //👇🏻 updates an item within the list
  const handleChange = (e) => {
    const { name, value, type } = e.target;

    if (type === "file") {
      setFormData({ ...formData, [name]: e.target.files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const { name, startDate, endDate, status, description, positions } =
    electionDetails;
  const { fullName, email } = formData;

  useEffect(() => {
    const getPositionList = async () => {
      const electionResponse = await axiosPrivate.get(
        `/api/v1/elections/${electionId}`
      );

      setElectionDetails(electionResponse?.data);
    };
    getPositionList();
    formData.organisation = organisationId;
  }, []);

  return (
    <div>
      {loading && <Loader />}
      <div className="addvoter">
        <div className="addvoter__content">
          <div className="addvoter__modal-title">
            <h2 className="section__heading">
              You are about add a voter to {name}
            </h2>
            <p className="section__text lead__text">
              Fill in all required field to add a voter
            </p>
          </div>
          <button className="back-btn" onClick={() => navigate(-1)}>
            Go back
          </button>

          <form
            onSubmit={handleSubmit}
            encType="multipart/form-data"
            className="addcandidate__form"
          >
            <div className="addvoter__top">
              <div className="addvoter__form-details">
                <div className="addvoter__form-details_control">
                  <span className="details">Name of election</span>
                  <p>{name}</p>
                </div>
                <div className="addvoter__form-details_control">
                  <span className="details">Status</span>
                  <p>{status}</p>
                </div>
              </div>
              <div className="addvoter__form-details">
                <div className="addvoter__form-details_control">
                  <span className="details">Start date</span>
                  <p>{startDate}</p>
                </div>
                <div className="addvoter__form-details_control">
                  <span className="details">Close date</span>
                  <p>{endDate}</p>
                </div>
              </div>
              <div className="addvoter__form-details">
                <div className="addvoter__form-details_control">
                  <span className="details">Number of positions available</span>
                  <p>{positions?.length}</p>
                </div>
              </div>
              <div className="createelection__form-details-fl">
                {/* candidate message */}
                <div className="addvoter__form-details_control">
                  <span className="details">What is the election about?</span>
                  <p>{description}</p>
                </div>
              </div>
            </div>
            {/* positions */}
            <div className="addvoter__form-candidates">
              <div className="addvoter__form-candidates_header">
                <h4>Adding a candidate</h4>
                <small>Go ahead and add some candidates</small>
              </div>
              <div className="addvoter__form-categories-content">
                <div>
                  <div className="addvoter__form-categories-control">
                    <div className="addvoter__form-categories-control_details">
                      <span className="details">Fullname</span>
                      <input
                        type="text"
                        placeholder="eg. Amin Alhassan"
                        required
                        name="fullName"
                        onChange={handleChange}
                        value={fullName}
                      />
                    </div>

                    <div className="addcandidate__form-categories-control_details">
                      <span className="details">Email</span>
                      <input
                        name="email"
                        value={email}
                        required
                        placeholder="eg. user@gmail.com"
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="addvoter__form-details-fl">
                    {/* candidate message */}
                    <div className="addvoter__form-categories-control_details">
                      <span className="details">Photo</span>
                      <input
                        type="file"
                        placeholder="Choose a photo"
                        name="imgfile"
                        accept="image/*"
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  {/* <div className="createelection__form-details-fl">
                    candidate message
                    <div className="createelection__form-details_control">
                      <span className="details">Manifesto</span>
                      <textarea
                        name="manifesto"
                        onBlur={handleFocus}
                        ref={descRef}
                        placeholder="What is their message?"
                        value={manifesto}
                        onChange={handleChange}
                      ></textarea>
                    </div>
                  </div> */}
                </div>
              </div>
            </div>
            <div className="button">
              <button className="btn" type="submit">
                Submit
              </button>
              <button
                className="btn"
                type="button"
                onClick={() => {
                  navigate(-1, { replace: true });
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RegisterVoter;
