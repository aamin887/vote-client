import "./adminheader.css";
import useAuth from "../../hooks/useAuth";
import { CiSearch } from "react-icons/ci";
import { FaRegBell, FaMoon } from "react-icons/fa";
import { TfiShine } from "react-icons/tfi";
import { IoMdAddCircle } from "react-icons/io";
import LOGO from "../../assets/logo.png";
import { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { Tooltip } from "../";

function AdminHeader({ setSearchQuery, isMobile }) {
  const root = document.documentElement;
  const [darkMode, setDarkMode] = useState(false);
  const { auth } = useAuth();

  const toogleDark = function () {
    setDarkMode((prev) => !prev);
  };

  useEffect(() => {
    const themed = localStorage.getItem("theme");
    if (themed) {
      setDarkMode(true);
    }
  }, []);

  useEffect(() => {
    if (darkMode) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.removeItem("theme");
    }
  }, [darkMode]);

  return (
    <div className="navigation__topnav">
      {isMobile && (
        <div
          style={{
            position: "fixed",
            top: "60px",
            left: 0,
            width: "100%",
            backgroundColor: "#ffcc00",
            color: "#000",
            textAlign: "center",
            padding: "10px",
            zIndex: 1000,
          }}
        >
          For the best view and experience, please use a desktop device.
        </div>
      )}
      <div className="navigation__topnav-left">
        <div className="navigation__topnav-left_title">
          <h1 className="title__text">Dashboard</h1>
        </div>
      </div>

      <div className="navigation__topnav-right">
        <div className="navigation__topnav-right_search">
          <label>
            <input
              type="text"
              placeholder="Search here"
              autoComplete="off"
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <span name="search-outline">
              <CiSearch style={{ color: "#a9a9a9" }} />
            </span>
          </label>
        </div>
        <Link to={"/elections/create"}>
          <Tooltip message={"Create election"}>
            <div className="navigation__topnav-right_icons">
              <IoMdAddCircle
                size={23}
                style={{ color: "#fffff" }}
                className="navigation__topnav-right_icons-add"
              />
            </div>
          </Tooltip>
        </Link>
        <div className="navigation__topnav-right_icons" onClick={toogleDark}>
          {darkMode ? (
            <FaMoon size={23} style={{ color: "#fffff" }} />
          ) : (
            <TfiShine size={23} style={{ color: "#fffff" }} />
          )}
        </div>
        <div className="navigation__topnav-right_icons">
          <FaRegBell size={23} style={{ color: "#fffff" }} />
        </div>
        {/* <h4>{userName}</h4> */}
        <Tooltip message={"User profile"}>
          <NavLink to={`/profile/${auth?.id}`}>
            <div className="navigation__topnav-right_user">
              <img src={LOGO} alt="user profile" />
            </div>
          </NavLink>
        </Tooltip>
      </div>
    </div>
  );
}

export default AdminHeader;
