import "./home.css";
import { Link } from "react-router-dom";
function Home() {
  return (
    <div className="landing__page section__padding">
      <h1 className="section__heading-text">Coming soon</h1>
      <Link to={"/login"}>Login</Link>
    </div>
  );
}

export default Home;
