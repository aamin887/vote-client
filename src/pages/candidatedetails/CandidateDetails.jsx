import "./candidatedetails.css";
import { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { ConfirmationDialog } from "../../components";
import { toast } from "react-toastify";
import { Loader } from "../../components";
import { FaTimes } from "react-icons/fa";

function Election() {
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();

  const descRef = useRef();
  const { candidateId } = useParams();
  const [loading, setLoading] = useState(false);
  const [candidateDetails, setCandidateDetails] = useState({});
  const [candidatePhoto, setCandidatePhoto] = useState("");
  const [toogleEdit, setToogleEdit] = useState(false);
  // confirmation modal
  const [isOpened, setIsOpened] = useState(false);
  const from = location.state?.from?.pathname || "/dashboard";

  // get candidate
  const getCandidate = async function (id) {
    try {
      const res = await axiosPrivate.get(`/api/v1/candidates/${id}`);

      setCandidateDetails({ ...res.data });
      setCandidatePhoto(res?.data?.photoUrl);
    } catch (error) {
      console.error(error);
    }
  };

  // update candidate
  // update profile
  const updateCandidate = async function (id, formData) {
    try {
      setLoading(true);
      const formattedData = new FormData();
      formattedData.append("fullName", formData?.fullName);
      formattedData.append("manifesto", formData?.manifesto);
      formattedData.append("motto", formData?.motto);
      formattedData.append("email", formData?.email);
      formattedData.append("tel", formData?.tel);
      formattedData.append("position", formData?.position);
      formattedData.append("image", formData?.image);

      const res = await axiosPrivate.put(
        `/api/v1/candidates/${id}`,
        formattedData,
        {
          headers: {
            "Content-type": "multipart/form-data",
          },
        }
      );
      if (res.status === 200) {
        return toast.success("updated!");
      }

      console.log(formData);
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

  // delete election
  const deleteElection = async function (id) {
    try {
      setLoading(true);
      const res = await axiosPrivate.delete(`/api/v1/candidates/${id}`);
      if (res.status === 204) {
        return navigate(from);
      }
    } catch (error) {
      const statusCode = error?.response?.status;
      if (statusCode === 404) {
        return toast.error("election not found");
      } else if (statusCode == 400) {
        return toast.error("make sure all ");
      } else {
        return toast.error("network error");
      }
    } finally {
      setLoading(false);
    }
  };

  // change to form data
  const handleChange = (e) => {
    const { name, value, type } = e.target;
    if (type === "file") {
      setCandidateDetails({ ...candidateDetails, [name]: e.target.files[0] });
      setCandidatePhoto(URL.createObjectURL(e.target.files[0]));
    } else {
      setCandidateDetails({ ...candidateDetails, [name]: value });
    }
  };

  // make valid form input el green
  const handleFocus = function () {
    const desValue = descRef.current;
    if (desValue.value.length > 0) {
      desValue.classList.add("valid");
    } else {
      desValue.classList.remove("valid");
    }
  };
  const { fullName, motto, manifesto, tel, email, election, position, votes } =
    candidateDetails;

  useEffect(() => {
    getCandidate(candidateId);
  }, []);

  return (
    <div className="candidatedetails__page">
      {loading && <Loader />}

      <ConfirmationDialog
        title={`Are you sure?`}
        icon={<FaTimes />}
        isOpened={isOpened}
        id={candidateDetails._id}
        onProceed={() => deleteElection(candidateId)}
        onClose={() => setIsOpened(false)}
      >
        <p>
          Do you really want to delete these records? This process cannot be
          undone.
        </p>
      </ConfirmationDialog>

      <div className="candidatedetails__page-profile">
        <div className="candidatedetails__page-profile_left">
          <button
            className="back-btn"
            onClick={() => {
              navigate(-1);
            }}
          >
            Go back
          </button>
          {/* Profile Image */}
          <div className="candidatedetails__page-profile_photo">
            <img
              src={candidatePhoto || "https://via.placeholder.com/150"}
              alt="Profile"
            />
            {toogleEdit && (
              <div className="candidatedetails__page-profile_photo-selector">
                <input
                  type="file"
                  placeholder="Choose a photo"
                  required
                  name="image"
                  accept="image/*"
                  onChange={handleChange}
                />
              </div>
            )}
          </div>

          {/* Profile Details */}
          <div className="candidatedetails__page-profile_right">
            {/* elections name */}
            <div className="candidatedetails__page-profile_right-details">
              <div className="candidatedetails__page-profile-details_control">
                <span className="details">Name</span>
                {!toogleEdit && <p>{fullName}</p>}
                {toogleEdit && (
                  <input
                    type="text"
                    name="fullName"
                    placeholder="Amin Alhassan"
                    value={fullName}
                    onChange={handleChange}
                    required
                  />
                )}
              </div>

              <div className="candidatedetails__page-profile-details_control">
                <span className="details">Motto</span>
                {!toogleEdit && <p>{motto}</p>}
                {toogleEdit && (
                  <input
                    type="text"
                    name="motto"
                    placeholder="E.g 2022 Leadership"
                    value={motto}
                    onChange={handleChange}
                  />
                )}
              </div>
            </div>
            <div className="candidatedetails__page-profile_right-details">
              <div className="candidatedetails__page-profile-details_control">
                <span className="details">Mobile No.</span>
                {!toogleEdit && <p>{tel}</p>}
                {toogleEdit && (
                  <input
                    type="tel"
                    name="tel"
                    placeholder="E.g 2022 Leadership"
                    value={tel}
                    onChange={handleChange}
                    required
                  />
                )}
              </div>

              <div className="candidatedetails__page-profile-details_control">
                <span className="details">Email</span>
                <p>{email}</p>

                {toogleEdit && (
                  <input
                    type="email"
                    name="email"
                    placeholder="demo@gmail.com"
                    value={email}
                    onChange={handleChange}
                  />
                )}
              </div>
            </div>
            <div className="candidatedetails__page-profile_right-details">
              <div className="candidatedetails__page-profile-details_control">
                <span className="details">Position</span>
                {!toogleEdit && <p>{position}</p>}
                {toogleEdit && (
                  <input
                    type="text"
                    name="position"
                    placeholder="E.g 2022 Leadership"
                    value={position}
                    onChange={handleChange}
                  />
                )}
              </div>

              <div className="candidatedetails__page-profile-details_control">
                <span className="details">Number of votes</span>
                <p>{votes}</p>
              </div>
            </div>

            {/* elections description */}
            <div className="candidatedetails__page-profile_right-details_fl">
              <div className="candidatedetails__page-profile-details_control">
                <span className="details">Manifesto</span>
                {!toogleEdit && <p>{manifesto}</p>}
                {toogleEdit && (
                  <textarea
                    name="manifesto"
                    placeholder="E.g 2022 Leadership"
                    value={manifesto}
                    onChange={handleChange}
                    ref={descRef}
                    onBlur={handleFocus}
                  ></textarea>
                )}
              </div>
            </div>

            {/* Edit and Delete Buttons */}
            <div className="candidatedetails__page-profile_right-btns">
              <button
                className="candidatedetails__page-profile_btn-edit btn"
                onClick={() => {
                  setToogleEdit(!toogleEdit);
                  if (toogleEdit) {
                    updateCandidate(candidateId, candidateDetails);
                  }
                }}
              >
                {toogleEdit ? "Save" : "Edit"}
              </button>

              <button
                className=" btn candidatedetails__page-profile_btn cancel"
                onClick={() => setIsOpened(true)}
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

export default Election;
