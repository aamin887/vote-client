import axios from "axios";

console.log(import.meta.env.VITE_API);

export default axios.create({
  baseURL: "https://vote-server-ahg0.onrender.com",
});

export const axiosPrivate = axios.create({
  baseURL: "https://vote-server-ahg0.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});
