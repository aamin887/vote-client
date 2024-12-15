import "./admin.css";
import logo from "../../assets/logo.png";

import useLogout from "../../hooks/useLogout.js";

import { NavLink } from "react-router-dom";

import { FaHome, FaLock, FaTimes } from "react-icons/fa";
import { GiHamburgerMenu, GiVote } from "react-icons/gi";
import { IoMdHelp } from "react-icons/io";
import { FaPeopleGroup } from "react-icons/fa6";
import { IoExitOutline } from "react-icons/io5";
import { BsGraphUp } from "react-icons/bs";

import { useEffect, useRef, useState } from "react";

function AdminNav() {
  const [hideMenu, setHideMenu] = useState(true);

  const logout = useLogout();
  const menuRef = useRef();

  const toggleMenu = () => {
    setHideMenu((prev) => !prev);
  };

  const handleLogout = function () {
    return logout();
  };

  useEffect(() => {
    const handleMenuToggle = (e) => {
      if (!hideMenu && menuRef.current && !menuRef.current.contains(e.target)) {
        setHideMenu(true);
      }
    };

    document.addEventListener("mousedown", handleMenuToggle);
    document.addEventListener("touchstart", handleMenuToggle);

    return () => {
      // cleanup function
      document.removeEventListener("mousedown", handleMenuToggle);
      document.removeEventListener("touchstart", handleMenuToggle);
    };
  }, [hideMenu]);

  return (
    <div
      className={`main__navigation ${hideMenu ? "active" : ""}`}
      ref={menuRef}
    >
      <div className="main__navigation-logo">
        <img className="logo" src={logo} alt="vote logo" />
      </div>
      <div className="navigation__toggle">
        <span name="menu-outline" onClick={() => toggleMenu()}>
          {hideMenu ? <GiHamburgerMenu /> : <FaTimes />}
        </span>
      </div>
      <ul>
        <li>
          <NavLink to={"/dashboard"}>
            <span className="icons">
              <FaHome />
            </span>
            <span className="title">Home</span>
          </NavLink>
        </li>

        <li>
          <NavLink to={"/elections"}>
            <span className="icons">
              <GiVote />
            </span>
            <span className="title">Elections</span>
          </NavLink>
        </li>

        <li>
          <NavLink to={"/voters"}>
            <span className="icons">
              <FaPeopleGroup />
            </span>
            <span className="title">Voters</span>
          </NavLink>
        </li>

        <li>
          <NavLink to={"/results"}>
            <span className="icons">
              <BsGraphUp />
            </span>
            <span className="title">Results</span>
          </NavLink>
        </li>

        <li>
          <NavLink to={"/reset-passwords"}>
            <span className="icons">
              <FaLock />
            </span>
            <span className="title">Password Reset</span>
          </NavLink>
        </li>
        <li>
          <NavLink to={"/help"}>
            <span className="icons">
              <IoMdHelp />
            </span>
            <span className="title">Help</span>
          </NavLink>
        </li>

        <li>
          <button className="btn main__navigation-btn" onClick={handleLogout}>
            <span className="icons">
              <IoExitOutline />
            </span>
            <span className="title">Sign Out</span>
          </button>
        </li>
      </ul>
    </div>
  );
}

export default AdminNav;
