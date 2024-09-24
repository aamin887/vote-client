import "./features.css";
import { FaLock, FaRegChartBar, FaUserAlt } from "react-icons/fa";

const Features = () => {
  return (
    <section className="features" id="features">
      <h2>Our Features</h2>
      <div className="feature-list">
        <div className="feature-item">
          <FaLock size={40} />
          <h3>Secure Voting</h3>
          <p>Your votes are encrypted and secure.</p>
        </div>
        <div className="feature-item">
          <FaUserAlt size={40} />
          <h3>User-Friendly</h3>
          <p>Easy to navigate and vote.</p>
        </div>
        <div className="feature-item">
          <FaRegChartBar size={40} />
          <h3>Real-Time Results</h3>
          <p>View results as votes are counted.</p>
        </div>
      </div>
    </section>
  );
};

export default Features;
