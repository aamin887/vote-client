import "./election.css";
import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { axiosPrivate } from "../../api/axios";
import { IoGrid, IoList } from "react-icons/io5";
import {
  PositionCard,
  ConfirmationDialog,
  DateTimePicker,
} from "../../components";
import { toast } from "react-toastify";
import useAuth from "../../hooks/useAuth";
import useNav from "../../hooks/useNav";
import { Loader } from "../../components";
import { BsInbox } from "react-icons/bs";
import { FaTimes } from "react-icons/fa";
import { format } from "date-fns";

function Election() {
  const navigate = useNavigate();
  const descRef = useRef();
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const [electionDetails, setElectionDetails] = useState({});
  const [allPosition, setAllPosition] = useState([]);
  const [toogleEdit, setToogleEdit] = useState(false);
  const [tooglePosition, setTooglePosition] = useState(false);
  const [newPosition, setNewPosition] = useState({
    positionName: "",
    positionDescription: "",
  });
  const { auth } = useAuth();
  const organisationId = auth.id;
  const { handleGridView, handleListView, toogleGridView } = useNav();

  // confirmation modal
  const [isOpened, setIsOpened] = useState(false);

  const deleteElection = async function (id) {
    try {
      setLoading(true);
      const res = await axiosPrivate.delete(`/api/v1/elections/${id}`);
      if (res.status === 204) {
        return navigate("/elections");
      }
      return;
    } catch (error) {
      const statusCode = error?.response?.data?.status;
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

  // update profile
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

  const handlePosition = () => {
    setTooglePosition(!tooglePosition);
  };

  const handleChange = (e) => {
    setElectionDetails({ ...electionDetails, [e.target.name]: e.target.value });
  };

  const handlePositionChanges = (e) => {
    setNewPosition({ ...newPosition, [e.target.name]: e.target.value });
  };

  const handleFocus = function () {
    const desValue = descRef.current;

    if (desValue.value.length > 0) {
      desValue.classList.add("valid");
    } else {
      desValue.classList.remove("valid");
    }
  };

  // Add logic for editing the profile
  const handleEditProfile = () => {
    if (toogleEdit === false) {
      return setToogleEdit(true);
    }
    if (toogleEdit === true) {
      handleUpdateProfile(params.id, electionDetails);
      return setToogleEdit(false);
    }
  };

  // add new position to election
  const handleAddPosition = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axiosPrivate.post("/api/v1/positions", {
        position: positionName,
        description: positionDescription,
        electionId: electionDetails._id,
      });

      if (res.status === 201) {
        toast.success("new position added");
        setAllPosition((prev) => [...prev, res.data.position]);
        setTooglePosition(!tooglePosition);
        setNewPosition("");
      }
    } catch (error) {
      const statusCode = error.response.status;
      if (statusCode === 401) {
        return toast.error("not allowed!");
      } else if (statusCode === 400) {
        return toast.error("form input not valid");
      } else if (statusCode === 403) {
        return toast.error("Position already exist.");
      } else {
        return toast.error("network error!");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const getElection = async function () {
      try {
        // all election details
        const res = await axiosPrivate.get(
          `/api/v1/elections/${params.id}?org=${organisationId}`
        );
        // get all position associated with election
        console.log(res.data);
        if (res.status == 200) {
          const resPosition = await axiosPrivate.get(
            `/api/v1/positions/?election=${params.id}`
          );
          setAllPosition([...resPosition.data]);
        }
        setElectionDetails({
          ...res?.data?.election,
        });
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

    getElection();
  }, []);

  const { electionName, description, startDate, endDate, poster } =
    electionDetails;
  const { positionName, positionDescription } = newPosition;

  const formattedStartDate = startDate
    ? format(new Date(startDate), "MMMM do, yyyy h:mm a")
    : endDate;
  const formattedEndDate = endDate
    ? format(new Date(endDate), "MMMM do, yyyy h:mm a")
    : endDate;

  return (
    <div className="election__page section__padding-md">
      {loading && <Loader />}

      <ConfirmationDialog
        title={`Are you sure?`}
        icon={<FaTimes />}
        isOpened={isOpened}
        id={electionDetails._id}
        onProceed={deleteElection}
        onClose={() => setIsOpened(false)}
      >
        <p>
          Do you really want to delete these records? This process cannot be
          undone.
        </p>
      </ConfirmationDialog>

      <div className="election__page-profile">
        <div className="election__page-profile_left">
          <button
            className="back-btn"
            onClick={() => {
              navigate(-1);
            }}
          >
            Go back
          </button>
          {/* Profile Image */}
          <div className="election__page-profile_photo">
            <img
              src={poster || "https://via.placeholder.com/150"}
              alt="Profile"
            />
            {toogleEdit && (
              <div className="election__page-profile_photo-selector">
                <input
                  type="file"
                  placeholder="Choose a photo"
                  required
                  name="imgfile"
                  accept="image/*"
                  onChange={handleChange}
                />
              </div>
            )}
          </div>

          {/* Profile Details */}
          <div className="election__page-profile_right">
            {/* elections name */}
            <div className="election__page-profile_right-details_fl">
              <div className="election__page-profile-details_control">
                <span className="details">Name</span>
                {!toogleEdit && <p>{electionName}</p>}
                {toogleEdit && (
                  <input
                    type="text"
                    name="electionName"
                    placeholder="E.g 2022 Leadership"
                    value={electionName}
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
                {!toogleEdit && <p>{description}</p>}
                {toogleEdit && (
                  <textarea
                    name="description"
                    placeholder="E.g 2022 Leadership"
                    value={description}
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
                <span className="details">Start Date</span>
                {!toogleEdit && <p>{formattedStartDate}</p>}
                {toogleEdit && (
                  <input
                    type="text"
                    name="startDate"
                    placeholder="E.g 2022 Leadership"
                    value={startDate}
                    onChange={handleChange}
                    required
                  />

                  // <DateTimePicker
                  //   // label={"Start Date"}
                  //   name={"startDate"}
                  //   value={startDate}
                  //   setDate={setElectionDetails}
                  // />
                )}
              </div>
              {/* elections end date*/}
              <div className="election__page-profile-details_control">
                <span className="details">Close Date</span>
                {!toogleEdit && <p>{formattedEndDate}</p>}
                {toogleEdit && (
                  // <input
                  //   type="text"
                  //   name="endDate"
                  //   placeholder="E.g 2022 Leadership"
                  //   value={endDate}
                  //   onChange={handleChange}
                  //   required
                  // />

                  <DateTimePicker
                    // label={"Start Date"}
                    name={"endDate"}
                    setDate={setElectionDetails}
                  />
                )}
              </div>
            </div>

            {/* Edit and Delete Buttons */}
            <div className="election__page-profile_right-btns">
              <button
                className="election__page-profile_btn-edit btn"
                onClick={handleEditProfile}
                disabled={tooglePosition}
              >
                {toogleEdit ? "Save" : "Edit"}
              </button>

              {toogleEdit && (
                <button
                  className="election__page-profile_btn-edit btn"
                  onClick={() => setToogleEdit(false)}
                  style={{ backgroundColor: "red" }}
                  disabled={tooglePosition}
                >
                  Cancel
                </button>
              )}

              <button
                className=" btn election__page-profile_btn cancel"
                onClick={() => setIsOpened(true)}
              >
                Delete
              </button>
              {!tooglePosition && (
                <button
                  className={`btn election__page-content_btn add `}
                  onClick={handlePosition}
                >
                  Create a new Position
                </button>
              )}
              {allPosition.length > 0 && (
                <button
                  className={`btn election__page-content_btn add`}
                  onClick={() =>
                    navigate(
                      `/elections/${electionDetails?._id}/positions/candidates/add`
                    )
                  }
                >
                  Add a candidate
                </button>
              )}
            </div>
          </div>
        </div>

        {tooglePosition && (
          <form onSubmit={handleAddPosition} className="election__page-form">
            <div className="election__page-profile_right-details">
              {/* new position*/}
              <div className="election__page-profile-details_control fl">
                <span className="details">New Position</span>
                <input
                  type="text"
                  name="positionName"
                  placeholder="E.g President or Treasurer"
                  value={positionName}
                  onChange={handlePositionChanges}
                  required
                />
              </div>
              <div className="election__page-profile-details_control fl">
                <span className="details">Describe the role</span>
                <textarea
                  name="positionDescription"
                  placeholder="What does the position represent?"
                  value={positionDescription}
                  onChange={handlePositionChanges}
                  required
                  ref={descRef}
                  onBlur={handleFocus}
                ></textarea>
              </div>
              {/* elections end date*/}
              <div className="election__page-profile-details_control">
                <button className="btn add" type="submit">
                  Add position
                </button>
                <button className="btn cancel" onClick={handlePosition}>
                  Cancel
                </button>
              </div>
            </div>
          </form>
        )}

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
              allPosition.length === 0 ? "empty" : ""
            } ${toogleGridView ? "grid__view" : ""}`}
          >
            {allPosition.length === 0 && (
              <div className="election__page-content_container-empty">
                <p>
                  <BsInbox />
                </p>
                <p>
                  No position added yet. Go ahead create a position to add some
                  candidates.
                </p>
              </div>
            )}
            {allPosition?.map((position, idx) => (
              <PositionCard
                data={position}
                setAllPosition={setAllPosition}
                key={idx}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Election;
