import "./ProfilePage.css";
import useAuth from "../../hooks/useAuth";
import { PageHeader } from "../../components";

const ProfilePage = () => {
  const user = {
    name: "amin887",
    loginStreak: 2,
    tierProgress: 25,
    datasets: 0,
    notebooks: 1,
    competitions: 0,
    discussions: 0,
  };

  const { auth } = useAuth();

  return (
    <div className="profile-container">
      <PageHeader />
      {/* Welcome Section */}
      <div className="welcome-section">
        <h1>Welcome, {auth?.email.slice(0, 4)}!</h1>
        <p>You are on a roll! Jump back in, or start something new.</p>
      </div>

      {/* Statistics Section */}
      <div className="statistics-section">
        <div className="stat-card">
          <h4>LOGIN STREAK</h4>
          <p className="stat-value">{user.loginStreak} days</p>
          <p className="stat-subtext">a new record!</p>
        </div>
        <div className="stat-card">
          <h4>TIER PROGRESS</h4>
          <div className="progress-circle">
            <div
              className="progress-bar"
              style={{ "--progress": `${user.tierProgress}%` }}
            ></div>
            <p className="progress-text">{user.tierProgress}%</p>
          </div>
          <p className="stat-subtext">to Contributor</p>
        </div>
        <div className="stat-card">
          <h4>PUBLIC ACTIVITY</h4>
          <div className="activity-calendar">
            {/* Placeholder for an activity calendar */}
            <p>Activity heatmap here</p>
          </div>
        </div>
      </div>

      {/* Activity Summary Section */}
      <div className="activity-summary">
        <div className="summary-card">
          <h4>Datasets</h4>
          <p className="summary-value">{user.datasets}</p>
          <p className="summary-subtext">total created</p>
        </div>
        <div className="summary-card">
          <h4>Notebooks</h4>
          <p className="summary-value">{user.notebooks}</p>
          <p className="summary-subtext">total created</p>
        </div>
        <div className="summary-card">
          <h4>Competitions</h4>
          <p className="summary-value">{user.competitions}</p>
          <p className="summary-subtext">total joined</p>
        </div>
        <div className="summary-card">
          <h4>Discussions</h4>
          <p className="summary-value">{user.discussions}</p>
          <p className="summary-subtext">total posted</p>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
