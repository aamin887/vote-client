import { useContext } from "react";
import { NavContext } from "../context/NavigationProvider";

const useNav = function () {
  return useContext(NavContext);
};

export default useNav;
