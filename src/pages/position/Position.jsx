import "./position.css";
import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { toast } from "react-toastify";
import { CandidateCard, Loader, ConfirmationDialog } from "../../components";
import { FaTimes } from "react-icons/fa";

function Position() {
  const navigate = useNavigate();
  const descRef = useRef();
  const params = useParams();
  const [positionDetails, setPositionDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const axiosPrivate = useAxiosPrivate();

  const [candidates, setCandidates] = useState([]);
  const [toogleEdit, setToogleEdit] = useState(false);
  const [isOpened, setIsOpened] = useState(false);

  const handleDeletePosition = async function (id) {
    try {
      const res = await axiosPrivate.delete(
        `/api/v1/positions/${id}?election=${election}`
      );

      console.log(res, "delete pos");
      // if (res.status === 204) {
      //   await axiosPrivate.delete(`/api/v1/candidates/positions/${id}`);
      // }
      return navigate(-1);
    } catch (error) {
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

  const handleUpdatePosition = async function (id, formData) {
    try {
      const res = await axiosPrivate.put(
        `/api/v1/positions/${id}?election=${election}`,
        formData
      );
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

  const handleEditPosition = () => {
    if (toogleEdit === false) {
      return setToogleEdit(true);
    }
    if (toogleEdit === true) {
      handleUpdatePosition(params.id, positionDetails);
      return setToogleEdit(false);
    }
  };

  const getPosition = async function () {
    try {
      // all election details
      const res = await axiosPrivate.get(`/api/v1/positions/${params.id}`);
      // get all position associated with election
      if (res.status == 200) {
        const resCandidates = await axiosPrivate.get(
          `/api/v1/candidates/${res?.data?.election}/${params?.id}`
        );
        setCandidates([...resCandidates.data]);
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
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPosition();
  }, []);

  const { position, description, voters, election } = positionDetails;

  return (
    <div className="position__page">
      <div className="position__page-profile">
        <button className="back-btn" onClick={() => navigate(-1)}>
          Go back
        </button>
        <div className="position__page-profile_left">
          {/* Profile Details */}
          {loading && <Loader />}
          <div className="position__page-profile_right">
            {/* elections name */}
            <div className="position__page-profile_right-details_fl">
              <div className="position__page-profile-details_control">
                <span className="details">Title</span>
                <p>{!toogleEdit && positionDetails?.position}</p>
                {toogleEdit && (
                  <input
                    type="text"
                    name="position"
                    value={position}
                    onChange={handleChange}
                    required
                  />
                )}
              </div>
            </div>
            {/* elections description */}
            <div className="position__page-profile_right-details_fl">
              <div className="position__page-profile-details_control">
                <span className="details">Role of this position?</span>
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
            <div className="position__page-profile_right-details">
              {/* elections start date*/}
              <div className="position__page-profile-details_control">
                <span className="details">Candidates</span>
                <p>{candidates?.length}</p>
              </div>
              {/* elections end date*/}
              <div className="position__page-profile-details_control">
                <span className="details">Votes</span>
                <p>{voters?.length}</p>
              </div>
            </div>

            <ConfirmationDialog
              title={`Are you sure?`}
              icon={<FaTimes />}
              isOpened={isOpened}
              id={params.id}
              onProceed={() => handleDeletePosition(params.id)}
              onClose={() => setIsOpened(false)}
            >
              <p>
                Do you really want to delete these records? This process cannot
                be undone.
              </p>
            </ConfirmationDialog>

            {/* Edit and Delete Buttons */}
            <div className="position__page-profile_right-btns">
              <button
                className="position__page-profile_btn-edit btn"
                onClick={handleEditPosition}
              >
                {toogleEdit ? "Save" : "Edit"}
              </button>
              <button
                className=" btn election__page-profile_btn cancel"
                onClick={() => setIsOpened(true)}
              >
                Delete
              </button>
              <button
                className=" btn election__page-profile_btn cancel"
                onClick={() =>
                  navigate(`/elections/${election}/positions/candidates/add`)
                }
              >
                Add candidates
              </button>
            </div>
          </div>
        </div>

        {/* positions Section */}
        <div className="position__page-content">
          <div className="position__page-content_header">
            <div className="election__page-content_header-title">
              <h5>Candidates </h5>
              <p>These are all the candidates for this position</p>
            </div>
          </div>

          {/*  */}
          <div className={`position__page-content_container`}>
            {candidates?.map((position, idx) => (
              <CandidateCard data={position} key={idx} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Position;
