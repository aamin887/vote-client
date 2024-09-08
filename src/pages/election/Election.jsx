import "./election.css";
import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { axiosPrivate } from "../../api/axios";
import { IoGrid, IoList } from "react-icons/io5";
import { CustomElectionCard } from "../../components";
import { toast } from "react-toastify";

function Election() {
  const navigate = useNavigate();
  const descRef = useRef();
  const params = useParams();
  const [electionDetails, setElectionDetails] = useState({});
  const [newPosition, setNewPosition] = useState("");
  const [allPosition, setAllPosition] = useState([]);
  const [toogleEdit, setToogleEdit] = useState(false);
  const [toogleGridView, setToogleGridView] = useState(false);
  const [tooglePosition, setTooglePosition] = useState(false);

  const handlePosition = () => {
    setTooglePosition(!tooglePosition);
  };

  const handleGridView = () => {
    setToogleGridView(true);
  };
  const handleListView = () => {
    setToogleGridView(false);
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
      return setToogleEdit(false);
    }
    // alert("Edit profile clicked!");
  };

  const handleDeleteProfile = () => {
    // Add logic for deleting the profile
    alert("Delete profile clicked!");
  };

  const handleAddPosition = async () => {
    const res = await axiosPrivate.post("/api/v1/positions", {
      position: newPosition,
      description: electionDetails?.description,
      electionId: electionDetails?._id,
    });

    if (res.status === 201) {
      toast.success("new position added");
      setAllPosition((prev) => [...prev, res.data.position]);
      setTooglePosition(!tooglePosition);
      setNewPosition("");
    }
  };

  useEffect(() => {
    const getElection = async function () {
      const res = await axiosPrivate.get(`/api/v1/elections/${params.id}`);

      if (res.status == 200) {
        const resPosition = await axiosPrivate.get(
          `/api/v1/positions/${params.id}`
        );
        console.log(resPosition);

        setAllPosition([...resPosition.data]);
      }

      setElectionDetails({ ...res?.data.election });
    };

    getElection();
  }, []);

  const { electionName, description, startDate, endDate } = electionDetails;

  return (
    <div className="election__page section__padding-md">
      <div className="election__page-profile">
        <div className="election__page-profile_left">
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
                {!toogleEdit && <p>{startDate}</p>}
                {toogleEdit && (
                  <input
                    type="text"
                    name="startDate"
                    placeholder="E.g 2022 Leadership"
                    value={startDate}
                    onChange={handleChange}
                    required
                  />
                )}
              </div>
              {/* elections end date*/}
              <div className="election__page-profile-details_control">
                <span className="details">Close Date</span>
                {!toogleEdit && <p>{endDate}</p>}
                {toogleEdit && (
                  <input
                    type="text"
                    name="endDate"
                    placeholder="E.g 2022 Leadership"
                    value={endDate}
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
                disabled={tooglePosition}
              >
                {toogleEdit ? "Save" : "Edit"}
              </button>
              <button
                className=" btn election__page-profile_btn-delete"
                onClick={handleDeleteProfile}
              >
                Delete
              </button>
              <button
                className={`btn election__page-content_btn ${
                  tooglePosition ? "cancel-btn" : ""
                }`}
                onClick={handlePosition}
              >
                {tooglePosition
                  ? "Abort new position"
                  : "Create a new Position"}
              </button>
              {allPosition.length > 0 && (
                <button
                  className={`btn election__page-content_btn ${
                    tooglePosition ? "cancel-btn" : ""
                  }`}
                  onClick={() =>
                    navigate(
                      `/elections/positions/${electionDetails?._id}/candidates/add`,
                      {
                        state: electionDetails,
                      }
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
          <div className="election__page-form">
            <div className="election__page-profile_right-details">
              {/* new position*/}
              <div className="election__page-profile-details_control fl">
                <span className="details">New Position</span>
                <input
                  type="text"
                  name="newPosition"
                  placeholder="E.g President or Treasurer"
                  value={newPosition}
                  onChange={(e) => {
                    setNewPosition(e.target.value);
                  }}
                  required
                />
              </div>
              <div className="election__page-profile-details_control fl">
                <span className="details">New Position</span>
                <textarea
                  name="description"
                  placeholder="What does the position represent?"
                  value={description}
                  onChange={handleChange}
                  required
                  ref={descRef}
                  onBlur={handleFocus}
                ></textarea>
              </div>
              {/* elections end date*/}
              <div className="election__page-profile-details_control">
                <button className="btn" onClick={handleAddPosition}>
                  Add positionnk
                </button>
              </div>
            </div>
          </div>
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
              toogleGridView ? "grid__view" : ""
            }`}
          >
            {allPosition?.map((position, idx) => (
              <CustomElectionCard
                data={position}
                election={electionDetails}
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
