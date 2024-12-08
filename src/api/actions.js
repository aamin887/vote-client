import { axiosPrivate } from "./axios";

// send login request
const handleLogin = async function (data) {
  const response = await axiosPrivate.post("/auth/users/login", data, {
    withCredentials: true,
  });
  return response;
};

// send register request
const handleSignup = async function (data) {
  const response = await axiosPrivate.post("/auth/users/register", data, {
    withCredentials: true,
  });
  return response;
};

// send register request
const requestPasswordChange = async function (email) {
  const response = await axiosPrivate.post("/auth/users/request-new-password", {
    email,
  });
  return response;
};

export { handleLogin, handleSignup, requestPasswordChange };
