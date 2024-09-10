import axios from "axios";

// const baseURL = "https://vote-server-ahg0.onrender.com";
// const baseURL = "http://localhost:5001";

export default axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const axiosPrivate = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});
