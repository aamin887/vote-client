import axios from "../api/axios";
import useAuth from "./useAuth";

function useRefreshToken() {
  const { setAuth } = useAuth();
  const refresh = async () => {
    const response = await axios.get("/auth/users/refresh", {
      withCredentials: true,
    });

    setAuth((prev) => {
      return {
        ...prev,
        accessToken: response?.data?.newAccessToken,
        email: response?.data?.email,
        id: response?.data?.id,
        terms: response?.data?.terms,
      };
    });

    return response.data.accessToken;
  };

  return refresh;
}

export default useRefreshToken;
