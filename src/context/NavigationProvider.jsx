import { createContext, useState } from "react";

export const NavContext = createContext();

function NavigationProvider({ children }) {
  const [toogleGridView, setToogleGridView] = useState(
    typeof JSON.parse(localStorage.getItem("election-card-view")) !== "boolean"
      ? true
      : JSON.parse(localStorage.getItem("election-card-view"))
  );

  const handleListView = function () {
    setToogleGridView(true);
    return localStorage.setItem("election-card-view", JSON.stringify(true));
  };

  const handleGridView = function () {
    setToogleGridView(false);
    return localStorage.setItem("election-card-view", JSON.stringify(false));
  };

  return (
    <NavContext.Provider
      value={{
        toogleGridView,
        setToogleGridView,
        handleGridView,
        handleListView,
      }}
    >
      {children}
    </NavContext.Provider>
  );
}

export default NavigationProvider;
