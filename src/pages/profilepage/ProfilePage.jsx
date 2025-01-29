import "./styles.css";

import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { formatDistanceToNow, format } from "date-fns";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Loader } from "../../components";

const ProfilePage = () => {
  const axiosPrivate = useAxiosPrivate();
  const [profileInfo, setProfileInfo] = useState({});
  const [voterPhoto, setVoterPhoto] = useState();
  const [editInfo, setEditInfo] = useState(false);
  const [validTel, setValidTel] = useState(false);
  const [loading, setLoading] = useState(false);
  const { userId } = useParams();

  const phoneRegex = /^(\+?\d{1,4}[\s-]?)?(\(?\d{3}\)?[\s-]?)?[\d\s-]{7,}$/;

  function getLastUpdatedMessage(lastUpdated) {
    // Ensure lastUpdated is a valid Date object
    const lastUpdateDate = new Date(lastUpdated);
    // Use formatDistanceToNow to calculate the human-readable difference
    const timeAgo = formatDistanceToNow(lastUpdateDate, { addSuffix: true });
    // Return the formatted message
    return `Last changes were made ${timeAgo}`;
  }

  // update profile
  const updateVoterInfo = async function (formData) {
    try {
      setLoading(true);
      const formattedData = new FormData();
      formattedData.append("fullName", formData?.fullName);
      formattedData.append("tel", formData?.tel);
      formattedData.append("gender", formData?.gender);
      formattedData.append("image", formData?.image);

      console.log(formData, "form data");
      const res = await axiosPrivate.put(
        `/api/v1/voters/${userId}`,
        formattedData,
        {
          headers: {
            "Content-type": "multipart/form-data",
          },
        }
      );
      if (res.status === 200) {
        setVoterPhoto(res?.data?.photoUrl);
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
      setProfileInfo({ ...profileInfo, [name]: e.target.files[0] });
      setVoterPhoto(URL.createObjectURL(e.target.files[0]));
    } else {
      setProfileInfo({ ...profileInfo, [name]: value });
    }
  };

  useEffect(() => {
    const getVoterProfile = async function () {
      try {
        const res = await axiosPrivate.get(`/auth/users/profile/${userId}`);
        console.log(res, "profile details");
        if (res.status === 200) {
          setVoterPhoto(res?.data?.photoUrl);
          return setProfileInfo(res?.data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    getVoterProfile();
  }, []);

  const { fullName, tel, gender } = profileInfo;

  useEffect(() => {
    setValidTel(phoneRegex.test(tel));
  }, [tel]);

  return (
    <div className="user__profile">
      {loading && <Loader />}
      {/* Welcome Section */}
      <div className="voters__profile-message">
        <h1>
          Username: <span>{profileInfo?.userName}</span>
        </h1>
        <p>You are on a roll! Jump back in, or start something news.</p>
      </div>

      {/* Statistics Section */}
      <div className="user__profile-info ">
        <div className="user__profile-info_card">
          <div className="user__profile-img">
            <img src={voterPhoto || "https://via.placeholder.com/150"} />
            {editInfo && (
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
        </div>
        <div className="user__profile-info_card">
          <div className="user__profile-control">
            <p className="stat-value">Email</p>
            <h4>{profileInfo?.email}</h4>
          </div>
          <div className="user__profile-control">
            <p className="stat-value">Verification</p>
            <h4>{profileInfo?.verification?.toString()}</h4>
          </div>

          <div className="user__profile-control">
            <p className="stat-value">Terms</p>
            <h4>{profileInfo?.terms?.toString()}</h4>
          </div>
        </div>
      </div>

      {/* Activity Summary Section */}
      <div className="user__profile-stats">
        <div className="user__profile-stats_card">
          <h4>Elections</h4>
          <p className="summary-value">{profileInfo?.elections?.length}</p>
          <p className="user__profile-stats_subtext">
            These are the election voters is registered on
          </p>
        </div>
        <div className="user__profile-stats_card">
          <h4>Votes Casted</h4>
          <p className="summary-value">{profileInfo?.elections?.length}</p>
          <p className="user__profile-stats_subtext">
            These are the number of votes casted by voter
          </p>
        </div>
        <div className="user__profile-stats_card">
          <h4>Last Login</h4>{" "}
          {profileInfo?.lastLogin ? (
            <>
              <p className="summary-value">
                {/* {format(new Date(profileInfo?.lastLogin), "dd MMMM yyyy")} */}
              </p>
              <p className="user__profile-stats_subtext">
                {/* {getLastUpdatedMessage(profileInfo.lastLogin)} */}
              </p>
            </>
          ) : (
            <p>No known</p>
          )}
          <p className="user__profile-stats_subtext">
            These are the election voters is registered on
          </p>
        </div>
        <div className="user__profile-stats_card">
          <h4>Last Update</h4>

          {profileInfo?.updatedAt ? (
            <>
              <p className="summary-value">
                {format(new Date(profileInfo?.updatedAt), "dd MMMM yyyy")}
              </p>
            </>
          ) : (
            <p>No updates yet</p>
          )}

          {profileInfo?.updatedAt && (
            <p className="user__profile-stats_subtext">
              {getLastUpdatedMessage(profileInfo.updatedAt)}):
            </p>
          )}
        </div>
      </div>
      <div className="btns-inline">
        <button
          className=""
          onClick={() => {
            setEditInfo(!editInfo);

            if (editInfo) {
              updateVoterInfo(profileInfo);
            }
          }}
        >
          Update Details
        </button>
        <button
          className="cancel"
          onClick={() => {
            editInfo ? setEditInfo(false) : "";
          }}
        >
          {editInfo ? "Cancel" : "Delete"}
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
