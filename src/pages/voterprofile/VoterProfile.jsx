import "./voterprofile.css";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import PHOTO from "../../assets/User.png";
import { formatDistance, subDays } from "date-fns";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const VoterProfile = () => {
  const axiosPrivate = useAxiosPrivate();
  const [profileInfo, setProfileInfo] = useState({});
  const { voterId } = useParams();

  const user = {
    name: "amin887",
    loginStreak: 2,
    tierProgress: 25,
    datasets: 0,
    notebooks: 1,
    competitions: 0,
    discussions: 0,
  };

  useEffect(() => {
    const getVoterProfile = async function () {
      try {
        const res = await axiosPrivate.get(`/auth/users/profile/${voterId}`);
        console.log(res, "profile details");
        if (res.status === 200) {
          return setProfileInfo(res?.data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    getVoterProfile();
  }, []);

  return (
    <div className="profile-container">
      {/* Welcome Section */}
      <div className="welcome-section">
        <h1>
          Username: <span>{profileInfo?.userName}!</span>
        </h1>
        <p>You are on a roll! Jump back in, or start something new.</p>
      </div>

      {/* Statistics Section */}
      <div className="statistics-section">
        <div className="stat-card">
          <div className="activity-calendar">
            <img src={PHOTO} />
            <h4>Profile Image</h4>
          </div>
        </div>
        <div className="stat-card">
          <p className="stat-value">Name</p>
          <h4>{profileInfo?.fullName}</h4>
          <p className="stat-subtext">a new record!</p>
          <p className="stat-value">Verification</p>
          <h4>{profileInfo?.verification?.toString()}</h4>
          <p className="stat-subtext">a new record!</p>
          <p className="stat-value">Terms</p>
          <h4>{profileInfo?.terms?.toString()}</h4>
          <p className="stat-subtext">a new record!</p>
        </div>
        <div className="stat-card">
          <p className="stat-value">Email</p>
          <h4>{profileInfo?.email}</h4>

          <p className="stat-subtext">a new record!</p>
          <p className="stat-value">Verification</p>
          <h4>{profileInfo?.verification?.toString()}</h4>
          <p className="stat-subtext">a new record!</p>
          <p className="stat-value">Terms</p>
          <h4>{profileInfo?.terms?.toString()}</h4>
          <p className="stat-subtext">a new record!</p>
        </div>
      </div>

      {/* Activity Summary Section */}
      <div className="activity-summary">
        <div className="summary-card">
          <h4>Elections</h4>
          <p className="summary-value">{profileInfo?.elections?.length}</p>
          <p className="summary-subtext">total created</p>
        </div>
        <div className="summary-card">
          <h4>Votes</h4>
          <p className="summary-value">{user.notebooks}</p>
          <p className="summary-subtext">total created</p>
        </div>
        <div className="summary-card">
          <h4>Last Login</h4>
          <p className="summary-value">{user.competitions}</p>
          <p className="summary-subtext">total joined</p>
        </div>
        <div className="summary-card">
          <h4>Last Updates</h4>
          <p className="summary-value">{profileInfo?.updatedAt}</p>
          <p className="summary-subtext">total posted</p>
        </div>
      </div>

      <div className="btns-inline">
        <button className="btn">Delete</button>
        <button className="btn">Delete</button>
        <button className="btn">Delete</button>
        <button className="btn">Delete</button>
      </div>
    </div>
  );
};

export default VoterProfile;
