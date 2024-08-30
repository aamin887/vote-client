import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

function PrivateRoute() {
  const { auth } = useAuth();
  const location = useLocation();

  if (auth.accessToken) {
    return (
      <>
        <Outlet />
      </>
    );
  } else {
    return <Navigate to={"/login"} state={{ from: location }} replace />;
  }
}

export default PrivateRoute;
