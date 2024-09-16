import "./candidatedetails.css";
import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { axiosPrivate } from "../../api/axios";
import { IoGrid, IoList } from "react-icons/io5";
import { CustomElectionCard } from "../../components";
import { toast } from "react-toastify";
import useAuth from "../../hooks/useAuth";
import useNav from "../../hooks/useNav";
import { Loader } from "../../components";

function CandidateDetails() {
  const navigate = useNavigate();
  const descRef = useRef();
  const { candidateId } = useParams();
  const [loading, setLoading] = useState(true);
  const [electionDetails, setElectionDetails] = useState({});

  const { auth } = useAuth();

  const organisationId = auth.id;

  const [toogleEdit, setToogleEdit] = useState(false);

  const handleDeleteProfile = async function (id) {
    try {
      setLoading(true);

      const res = await axiosPrivate.delete(`/api/v1/elections/${id}`);
      if (res.status === 204) {
        await axiosPrivate.delete(`/api/v1/positions/elections/${id}`);
        return navigate("/elections");
      }
      return;
    } catch (error) {
      const statusCode = error?.response?.data?.status;
      if (statusCode === 404) {
        return toast.error("election not found");
      } else {
        return toast.error("network error");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProfile = async function (id, formData) {
    setLoading(true);
    try {
      const res = await axiosPrivate.put(
        `/api/v1/elections/${id}?org=${organisationId}`,
        formData
      );
      if (res.status === 204) {
        return toast.success("updated!");
      }
      return;
    } catch (error) {
      const statusCode = error.response.data.status;
      if (statusCode === 404) {
        return toast.error("profile not found!");
      } else if (statusCode === 401) {
        return toast.error("not allowed!");
      } else {
        return toast.error("network error!");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleChange = (e) => {
    setElectionDetails({ ...electionDetails, [e.target.name]: e.target.value });
  };

  const handleFocus = function () {
    const desValue = descRef.current;

    if (desValue.value.length > 0) {
      desValue.classList.add("valid");
    } else {
      desValue.classList.remove("valid");
    }
  };

  const handleEditProfile = () => {
    // Add logic for editing the profile
    if (toogleEdit === false) {
      return setToogleEdit(true);
    }
    if (toogleEdit === true) {
      handleUpdateProfile(candidateId, electionDetails);
      return setToogleEdit(false);
    }
  };

  useEffect(() => {
    const getCandidateInfo = async function () {
      try {
        // all election details
        const res = await axiosPrivate.get(
          `/api/v1/candidates/one/${candidateId}`
        );
        // get all position associated with election

        console.log(res.data, candidateId);
        if (res.status == 200) {
          setElectionDetails({ ...res?.data.candidate });
        }
        setLoading(false);
      } catch (error) {
        const statusCode = error.response.data.status;
        if (statusCode === 401) {
          return toast.error("not allowed!");
        } else if (statusCode === 400) {
          return toast.error("network error");
        } else {
          return toast.error("network error");
        }
      } finally {
        setLoading(false);
      }
    };

    getCandidateInfo();
  }, []);

  const { fullName, manifesto, position } = electionDetails;

  return (
    <div className="election__page section__padding-md">
      {loading && <Loader />}

      <div className="election__page-profile">
        <div className="election__page-profile_left">
          <button className="back-btn" onClick={handleBack}>
            Go back
          </button>
          {/* Profile Image */}
          <div className="election__page-profile_photo">
            <img src="https://via.placeholder.com/150" alt="Profile" />
          </div>

          {/* Profile Details */}
          <div className="election__page-profile_right">
            {/* elections name */}
            <div className="election__page-profile_right-details_fl">
              <div className="election__page-profile-details_control">
                <span className="details">Name</span>
                {!toogleEdit && <p>{fullName}</p>}
                {toogleEdit && (
                  <input
                    type="text"
                    name="electionName"
                    placeholder="E.g 2022 Leadership"
                    value={fullName}
                    onChange={handleChange}
                    required
                  />
                )}
              </div>
            </div>
            {/* elections description */}
            <div className="election__page-profile_right-details_fl">
              <div className="election__page-profile-details_control">
                <span className="details">Description</span>
                {!toogleEdit && (
                  <p>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Veritatis, exercitationem. Doloremque, impedit cupiditate
                    aliquam laudantium nulla, porro ex sunt fugiat tenetur unde
                    sed quo, quos soluta deserunt? Dignissimos, numquam dolore.
                  </p>
                )}
                {/* {!toogleEdit && <p>{manifesto}</p>} */}
                {toogleEdit && (
                  <textarea
                    name="manifesto"
                    placeholder="E.g 2022 Leadership"
                    value={manifesto}
                    onChange={handleChange}
                    required
                    ref={descRef}
                    onBlur={handleFocus}
                  ></textarea>
                )}
              </div>
            </div>
            <div className="election__page-profile_right-details">
              {/* elections start date*/}
              <div className="election__page-profile-details_control">
                <span className="details">Total votes</span>
                <p>{0}</p>
              </div>
              {/* elections end date*/}
              <div className="election__page-profile-details_control">
                <span className="details">Position</span>
                {!toogleEdit && <p>{position}</p>}
                {toogleEdit && (
                  <input
                    type="text"
                    name="endDate"
                    placeholder="E.g 2022 Leadership"
                    value={position}
                    onChange={handleChange}
                    required
                  />
                )}
              </div>
            </div>

            {/* Edit and Delete Buttons */}
            <div className="election__page-profile_right-btns">
              <button
                className="election__page-profile_btn-edit btn"
                onClick={handleEditProfile}
              >
                {toogleEdit ? "Save" : "Edit"}
              </button>
              <button
                className=" btn election__page-profile_btn cancel"
                onClick={() => handleDeleteProfile(electionDetails._id)}
                disabled={toogleEdit}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CandidateDetails;
