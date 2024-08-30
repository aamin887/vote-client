import axios from "../api/axios";
import useAuth from "./useAuth";

function useLogout() {
  const { setAuth } = useAuth();
  const loguout = async function () {
    setAuth({});
    try {
      await axios.get("auth/logout", {
        withCredentials: true,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return loguout;
}

export default useLogout;
