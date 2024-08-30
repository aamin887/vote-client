import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";

const useAuth = function () {
  return useContext(AuthContext);
};

export default useAuth;
