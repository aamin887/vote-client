import { useState, useEffect, useRef } from "react";
import "./election.css";
import { useParams } from "react-router-dom";
import { axiosPrivate } from "../../api/axios";
import { IoGrid, IoList } from "react-icons/io5";
import { CustomElectionCard } from "../../components";

function Election() {
  const descRef = useRef();
  const params = useParams();
  const [electionDetails, setElectionDetails] = useState({});
  const [toogleEdit, setToogleEdit] = useState(false);
  const [toogleGridView, setToogleGridView] = useState(false);

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
    setToogleEdit(!toogleEdit);
    // alert("Edit profile clicked!");
  };

  const handleDeleteProfile = () => {
    // Add logic for deleting the profile
    alert("Delete profile clicked!");
  };

  useEffect(() => {
    const getElection = async function () {
      const res = await axiosPrivate.get(`/api/v1/elections/${params.id}`);

      console.log(res?.data.election);

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
                className="election__page-profile_btn-edit"
                onClick={handleEditProfile}
              >
                {toogleEdit ? "Save" : "Edit"}
              </button>
              <button
                className=" election__page-profile_btn-delete"
                onClick={handleDeleteProfile}
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
          <div className={`${toogleGridView ? "grid__view" : ""}`}>
            <CustomElectionCard />
            <CustomElectionCard />
            <CustomElectionCard />
            <CustomElectionCard />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Election;
