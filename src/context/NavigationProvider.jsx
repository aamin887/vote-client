import { createContext, useState } from "react";

export const NavContext = createContext();

function NavigationProvider({ children }) {
  const [toogle, setToogle] = useState(
    JSON.parse(localStorage.getItem("toggle_nav")) || true
  );
  const [toogleGridView, setToogleGridView] = useState(
    JSON.parse(localStorage.getItem("election-card-view")) || true
  );
  return (
    <NavContext.Provider
      value={{ setToogle, toogle, toogleGridView, setToogleGridView }}
    >
      {children}
    </NavContext.Provider>
  );
}

export default NavigationProvider;
