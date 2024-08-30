import axios from "axios";

const baseURL = "https://vote-server-ahg0.onrender.com";
// const baseURL = "http://localhost:5001";

export default axios.create({
  baseURL,
});

export const axiosPrivate = axios.create({
  baseURL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});
