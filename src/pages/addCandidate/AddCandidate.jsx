import "./addcandidate.css";

import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { axiosPrivate } from "../../api/axios";
import { toast } from "react-toastify";
import useAuth from "../../hooks/useAuth";

function AddCandidate() {
  const { auth } = useAuth();
  const organisationId = auth.id;

  const [electionDetails, setElectionDetails] = useState({});
  const [positions, setPositions] = useState([]);
  const [formData, setFormData] = useState({
    fullName: "",
    position: "",
    manifesto: "",
    imgfile: "",
    organisation: organisationId,
  });

  const { electionId } = useParams();

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
      const formattedData = new FormData();

      formattedData.append("fullName", formData.fullName);
      formattedData.append("position", formData.position);
      formattedData.append("manifesto", formData.manifesto);
      formattedData.append("organisation", formData.organisation);
      formattedData.append("electionId", electionId);
      formattedData.append("image", formData.imgfile);

      const res = await axiosPrivate.post("/api/v1/candidates", formattedData, {
        headers: {
          "Content-type": "multipart/form-data",
        },
      });
      if (res.status === 201) {
        toast.success("candidates added successfully");
        return navigate(`/elections/${electionId}`);
      }
    } catch (error) {
      console.log(error);
      const statusCode = error.response.data.status;
      if (statusCode === 404) {
        return toast.error("not found");
      } else if (statusCode === 403) {
        return toast.error("candidate already exist");
      } else {
        return toast.error("network error ");
      }
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

  // list of position options for form
  const positionSelectionOptions = positions.map((data, idx) => (
    <option value={data._id} key={idx + "-options"}>
      {data.positionName}
    </option>
  ));

  const {
    electionName,
    organisation,
    startDate,
    endDate,
    isActive,
    description,
  } = electionDetails;
  const { fullName, manifesto, position } = formData;

  useEffect(() => {
    const getPositionList = async () => {
      const electionResponse = await axiosPrivate.get(
        `/api/v1/elections/${electionId}?org=${organisationId}`
      );
      if (electionResponse.status === 200) {
        const res = await axiosPrivate.get(
          `/api/v1/positions/?election=${electionId}`
        );
        if (res.status === 200) {
          setPositions(res.data);
        }
      }
      setElectionDetails(electionResponse?.data?.election);
    };
    getPositionList();
  }, []);

  return (
    <div>
      <div className="addcandidate">
        <div className="addcandidate__content">
          <div className="addcandidate__modal-title">
            <h2 className="section__heading">
              You are about add a candidate to {electionName}
            </h2>
            <p className="section__text lead__text">
              Fill in all required field to create election
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
            <div className="addcandidate__top">
              <div className="addcandidate__form-details">
                <div className="addcandidate__form-details_control">
                  <span className="details">Name of election</span>
                  <p>{electionName}</p>
                </div>
                <div className="addcandidate__form-details_control">
                  <span className="details">Organisation</span>
                  <p>{organisation}</p>
                </div>
              </div>
              <div className="addcandidate__form-details">
                <div className="addcandidate__form-details_control">
                  <span className="details">Start date</span>
                  <p>{startDate}</p>
                </div>
                <div className="addcandidate__form-details_control">
                  <span className="details">Close date</span>
                  <p>{endDate}</p>
                </div>
              </div>
              <div className="addcandidate__form-details">
                <div className="addcandidate__form-details_control">
                  <span className="details">Organiser</span>
                  <p>{organisation}</p>
                </div>
                <div className="addcandidate__form-details_control">
                  <span className="details">Is active</span>

                  <p>{isActive?.toString(true)}</p>
                </div>
              </div>
              <div className="createelection__form-details-fl">
                {/* candidate message */}
                <div className="createelection__form-details_control">
                  <span className="details">What is the election about?</span>
                  <p>{description}</p>
                </div>
              </div>
            </div>
            {/* positions */}
            <div className="addcandidate__form-candidates">
              <div className="addcandidate__form-candidates_header">
                <h4>Adding a candidate</h4>
                <small>Go ahead and add some candidates</small>
              </div>
              <div className="addcandidate__form-categories-content">
                <div>
                  <div className="addcandidate__form-categories-control">
                    <div className="addcandidate__form-categories-control_details">
                      <span className="details">Name</span>

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
                      <span className="details">Position</span>
                      <select
                        name="position"
                        value={position}
                        onChange={handleChange}
                      >
                        {[
                          <option value={""} key={"empty_option"}>
                            {"Select a position"}
                          </option>,
                          ...positionSelectionOptions,
                        ]}
                      </select>
                    </div>
                  </div>
                  <div className="createelection__form-details-fl">
                    {/* candidate message */}
                    <div className="createelection__form-details_control">
                      <span className="details">Photo</span>
                      <input
                        type="file"
                        placeholder="Choose a photo"
                        required
                        name="imgfile"
                        accept="image/*"
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="createelection__form-details-fl">
                    {/* candidate message */}
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
                  </div>
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

export default AddCandidate;
