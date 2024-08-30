import axios from "../api/axios";
import useAuth from "./useAuth";

function useRefreshToken() {
  const { setAuth } = useAuth();
  const refresh = async () => {
    const response = await axios.get("/auth/refresh", {
      withCredentials: true,
    });

    setAuth((prev) => {
      return {
        ...prev,
        accessToken: response?.data?.accessToken,
        verified: response?.data?.verified,
        id: response?.data?.id,
      };
    });

    return response.data.accessToken;
  };

  return refresh;
}

export default useRefreshToken;
