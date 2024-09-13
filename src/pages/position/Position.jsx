import "./position.css";
import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { axiosPrivate } from "../../api/axios";
import { IoGrid, IoList } from "react-icons/io5";
import { toast } from "react-toastify";
import useAuth from "../../hooks/useAuth";
import useNav from "../../hooks/useNav";
import { CandidateCard } from "../../components";

function Position() {
  const navigate = useNavigate();
  const descRef = useRef();
  const params = useParams();
  const [positionDetails, setPositionDetails] = useState({});

  const { auth } = useAuth();

  console.log(params.id);

  const { handleGridView, handleListView, toogleGridView } = useNav();

  const organisationId = auth.id;
  const [allPosition, setAllPosition] = useState([]);
  const [toogleEdit, setToogleEdit] = useState(false);

  const handleDeleteProfile = async function (id) {
    try {
      const res = await axiosPrivate.delete(`/api/v1/positions/${id}`);
      if (res.status === 204) {
        await axiosPrivate.delete(`/api/v1/candidates/positions/${id}`);
        return navigate("/elections");
      }
      return;
    } catch (error) {
      const statusCode = error.response.data.status;

      console.log(error);

      if (statusCode === 404) {
        return toast.error("profile not found!");
      } else if (statusCode === 401) {
        return toast.error("not allowed!");
      } else {
        return toast.error("network error!");
      }
    }
  };

  const handleUpdateProfile = async function (id, formData) {
    try {
      const res = await axiosPrivate.put(`/api/v1/positions/${id}`, formData);
      if (res.status === 204) {
        return toast.success("updated!");
      }
      return;
    } catch (error) {
      console.log(error);
      const statusCode = error.response.data.status;
      if (statusCode === 404) {
        return toast.error("profile not found!");
      } else if (statusCode === 401) {
        return toast.error("not allowed!");
      } else {
        return toast.error("network error!");
      }
    }
  };

  const handleChange = (e) => {
    setPositionDetails({ ...positionDetails, [e.target.name]: e.target.value });
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
    if (toogleEdit === false) {
      return setToogleEdit(true);
    }
    if (toogleEdit === true) {
      handleUpdateProfile(params.id, positionDetails);
      return setToogleEdit(false);
    }
  };

  useEffect(() => {
    const getPosition = async function () {
      try {
        // all election details
        const res = await axiosPrivate.get(
          `/api/v1/positions/one/${params.id}`
        );
        console.log(res.data);
        // get all position associated with election
        if (res.status == 200) {
          const resPosition = await axiosPrivate.get(
            `/api/v1/candidates/${params.id}`
          );
          console.log(resPosition);
          setAllPosition([...resPosition.data]);
        }
        setPositionDetails(res?.data);
      } catch (error) {
        const statusCode = error?.response?.data?.status;
        if (statusCode === 401) {
          return toast.error("not allowed!");
        } else if (statusCode === 400) {
          return toast.error("network error");
        } else {
          return toast.error("network error");
        }
      }
    };

    getPosition();
  }, []);

  const { positionName, positionDescription, votes, candidates } =
    positionDetails;

  return (
    <div className="election__page section__padding-md">
      <div className="election__page-profile">
        <div className="election__page-profile_left">
          {/* Profile Details */}
          <div className="election__page-profile_right">
            {/* elections name */}
            <div className="election__page-profile_right-details_fl">
              <div className="election__page-profile-details_control">
                <span className="details">Title</span>
                {!toogleEdit && <p>{positionDetails?.positionName}</p>}
                {toogleEdit && (
                  <input
                    type="text"
                    name="positionName"
                    value={positionName}
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
                {!toogleEdit && <p>{positionDescription}</p>}
                {toogleEdit && (
                  <textarea
                    name="positionDescription"
                    placeholder="E.g 2022 Leadership"
                    value={positionDescription}
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
                <span className="details">Candidates</span>
                <p>{candidates?.length}</p>
              </div>
              {/* elections end date*/}
              <div className="election__page-profile-details_control">
                <span className="details">Votes</span>
                <p>{votes?.length}</p>
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
                onClick={() => handleDeleteProfile(positionDetails._id)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>

        {/* positions Section */}
        <div className="election__page-content">
          <div className="election__page-content_header">
            <div className="election__page-content_header-title">
              <h5>Positions</h5>
              <p>These are all the position for this elections</p>
            </div>
            <div className="dashboard__content-election_header-btns">
              <button
                className={`election__view-btn ${
                  !toogleGridView ? "active" : ""
                }`}
                onClick={handleListView}
              >
                <IoList />
              </button>
              <button
                className={`election__view-btn ${
                  toogleGridView ? "active" : ""
                }`}
                onClick={handleGridView}
              >
                <IoGrid />
              </button>
            </div>
          </div>

          {/*  */}
          <div
            className={`election__page-content_container ${
              toogleGridView ? "grid__view" : ""
            }`}
          >
            {allPosition?.map((position, idx) => (
              <div key={idx}>
                <p>{position._id}</p>
                <p>{position.fullName}</p>
                <p>{position.manifesto}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Position;
