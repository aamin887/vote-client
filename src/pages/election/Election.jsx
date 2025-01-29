import "./election.css";
import dummy from "../../assets/dummy.png";
import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { BsInfoCircle } from "react-icons/bs";
import {
  PositionCard,
  ConfirmationDialog,
  DateTimePicker,
} from "../../components";
import { toast } from "react-toastify";
import { Loader, Tooltip } from "../../components";
import { BsInbox } from "react-icons/bs";
import { FaTimes } from "react-icons/fa";
import { format } from "date-fns";

function Election() {
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();
  const descRef = useRef();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [electionDetails, setElectionDetails] = useState({});
  const [electionPoster, setElectionPoster] = useState("");
  const [allPosition, setAllPosition] = useState([]);
  const [toogleEdit, setToogleEdit] = useState(false);
  const [tooglePosition, setTooglePosition] = useState(false);
  const [newPosition, setNewPosition] = useState({
    positionName: "",
    positionDescription: "",
  });
  // confirmation modal
  const [isOpened, setIsOpened] = useState(false);
  const [openPosition, setOpenPosition] = useState(false);

  console.log(location?.state === true, "location");

  // get election
  const getElection = async function (id) {
    try {
      // all election details
      const res = await axiosPrivate.get(`/api/v1/elections/${id}`);
      // get all position associated with election
      if (res.status === 200) {
        const res = await axiosPrivate.get(`/api/v1/positions?election=${id}`);
        setAllPosition([...res.data]);
      }
      setElectionDetails({
        ...res?.data,
      });
      setElectionPoster(res?.data?.posterUrl);
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

  // delete election
  const deleteElection = async function (id) {
    try {
      setLoading(true);
      const res = await axiosPrivate.delete(`/api/v1/elections/${id}`);
      if (res.status === 204) {
        return navigate("/elections");
      }
    } catch (error) {
      console.log(error);

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

  // update profile
  const updateElection = async function (id, formData) {
    try {
      setLoading(true);
      const formattedData = new FormData();
      formattedData.append("name", formData?.name);
      formattedData.append("description", formData?.description);
      formattedData.append("startDate", formData?.startDate);
      formattedData.append("endDate", formData?.endDate);
      formattedData.append("image", formData?.image);

      const res = await axiosPrivate.put(
        `/api/v1/elections/${id}`,
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

  // change to form data
  const handleChange = (e) => {
    const { name, value, type } = e.target;
    if (type === "file") {
      setElectionDetails({ ...electionDetails, [name]: e.target.files[0] });
      setElectionPoster(URL.createObjectURL(e.target.files[0]));
    } else {
      setElectionDetails({ ...electionDetails, [name]: value });
    }
  };

  // toogle new position form
  const handlePositionToogle = function () {
    return setTooglePosition(!tooglePosition);
  };

  // handle changes to position form
  const handlePositionChanges = (e) => {
    setNewPosition({ ...newPosition, [e.target.name]: e.target.value });
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

  // Add logic for editing the profile
  const handleElectionUpdate = () => {
    if (toogleEdit === false) {
      return setToogleEdit(true);
    }
    if (toogleEdit === true) {
      updateElection(id, electionDetails);
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
        election: id,
      });

      if (res.status === 201) {
        toast.success("new position added");
        setAllPosition((prev) => [...prev, res.data]);
        setTooglePosition(!tooglePosition);
        setNewPosition("");
      }
    } catch (error) {
      console.log(error);
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

  // delete position
  const deletePosition = async function (positionId) {
    setLoading(true);
    try {
      const res = await axiosPrivate.delete(
        `/api/v1/positions/${positionId}?election=${id}`
      );

      if (res.status === 204) {
        setAllPosition((pos) => {
          const d = pos.filter((p) => p._id !== positionId);
          return d;
        });
        toast.success("position deleted");
      }
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

  useEffect(() => {
    getElection(id);

    location?.state === true ? setToogleEdit(true) : false;
  }, []);

  const { name, description, startDate, endDate, status } = electionDetails;
  const { positionName, positionDescription } = newPosition;

  const formattedStartDate = startDate
    ? format(new Date(startDate), "MMMM do, yyyy h:mm a")
    : endDate;
  const formattedEndDate = endDate
    ? format(new Date(endDate), "MMMM do, yyyy h:mm a")
    : endDate;

  return (
    <div className="election__page">
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
            <img src={electionPoster || dummy} alt="Profile" />
            {toogleEdit && (
              <div className="election__page-profile_photo-selector">
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
          <div className="election__page-profile_right">
            {/* elections name */}
            <div className="election__page-profile_right-details">
              <div className="election__page-profile-details_control">
                <span className="details">Name</span>
                {!toogleEdit && <p>{name}</p>}
                {toogleEdit && (
                  <input
                    type="text"
                    name="name"
                    placeholder="E.g 2022 Leadership"
                    value={name}
                    onChange={handleChange}
                    required
                  />
                )}
              </div>

              <div className="election__page-profile-details_control">
                <span className="details">Status</span>
                <p>{status}</p>
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
                <p className="details">
                  Open Nominations
                  <Tooltip message={"When to start accepting candidates"}>
                    <span className="details__icon">
                      <BsInfoCircle />
                    </span>
                  </Tooltip>
                </p>
                {!toogleEdit && <p>{formattedStartDate}</p>}
                {toogleEdit && (
                  // <input
                  //   type="text"
                  //   name="startDate"
                  //   placeholder="E.g 2022 Leadership"
                  //   value={startDate}
                  //   onChange={handleChange}
                  //   required
                  // />

                  <DateTimePicker
                    // label={"Start Date"}
                    name={"startDate"}
                    value={startDate}
                    setDate={setElectionDetails}
                  />
                )}
              </div>
              {/* elections end date*/}
              <div className="election__page-profile-details_control">
                <p className="details">
                  Date of Election
                  <Tooltip message={"Day of election with 11 days duration."}>
                    <span className="details__icon">
                      <BsInfoCircle />
                    </span>
                  </Tooltip>
                </p>
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
                onClick={handleElectionUpdate}
                disabled={tooglePosition}
              >
                {toogleEdit ? "Save" : "Edit"}
              </button>

              {toogleEdit && (
                <button
                  className="election__page-profile_btn-edit btn"
                  onClick={() => {
                    setToogleEdit(false);
                  }}
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
                  className={`btn election__page-content_btn add`}
                  onClick={handlePositionToogle}
                >
                  Create a new Position
                </button>
              )}
              {allPosition.length > 0 && (
                <button
                  className={`btn election__page-content_btn add`}
                  onClick={() =>
                    navigate(
                      `/elections/${electionDetails?._id}/positions/candidates/register`
                    )
                  }
                >
                  Register a candidate
                </button>
              )}

              <button
                className={`btn election__page-content_btn add`}
                onClick={() =>
                  navigate(`/elections/${electionDetails?._id}/voters/register`)
                }
              >
                Register a voter
              </button>
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
              <div className="election__page-profile-details_control-btns">
                <button className="btn add" type="submit">
                  Add position
                </button>
                <button className="btn cancel" onClick={handlePositionToogle}>
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
          </div>
          {/*  */}
          <div
            className={`election__page-content_container  ${
              allPosition.length === 0 ? "empty" : ""
            }`}
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
              <>
                <ConfirmationDialog
                  title={`Are you sure?`}
                  icon={<FaTimes />}
                  isOpened={openPosition}
                  id={position._id}
                  key={idx + position._id}
                  onProceed={() => deletePosition(position._id)}
                  onClose={() => setOpenPosition(false)}
                >
                  <p>
                    Do you really want to delete these records? This process
                    cannot be undone.
                  </p>
                </ConfirmationDialog>

                <PositionCard
                  data={position}
                  setAllPosition={setAllPosition}
                  key={idx}
                  isOpened={setOpenPosition}
                />
              </>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Election;
