import "./error.css";
import error from "../../assets/404.png";
import { useLocation, useNavigate } from "react-router-dom";
function Error() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(-1, { replace: true });
  };

  console.log(location);
  return (
    <div className="error section__padding">
      <div className="error__content">
        <div className="error__content-img section__margin">
          <img src={error} alt="" />
          <button onClick={() => handleNavigate()} className="btn">
            Go back
          </button>
        </div>
      </div>
    </div>
  );
}

export default Error;
