import axios from "axios";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

export default axios.create({
  baseURL: "http://localhost:5001",
});

export const axiosPrivate = axios.create({
  baseURL: "http://localhost:5001",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});
