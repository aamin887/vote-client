import axios, { axiosPrivate } from "./axios";

const handleLogin = async function (data) {
  const response = await axios.post("/auth/login", data, {
    withCredentials: true,
  });
  return response;
};

export { handleLogin };
