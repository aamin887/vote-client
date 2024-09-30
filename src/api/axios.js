import axios from "axios";

<<<<<<< HEAD
const baseURL = "https://vote-server-ahg0.onrender.com";
// https://vote-server-ahg0.onrender.com
=======
// const baseURL = "https://vote-server-ahg0.onrender.com";
>>>>>>> parent of 3517bb8 (add:fixed cors)
const API_URL = import.meta.env.VITE_API_URL;

export default axios.create({
  baseURL: API_URL,
  // baseURL,
});

export const axiosPrivate = axios.create({
  // baseURL,
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});
