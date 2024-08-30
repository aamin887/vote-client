import "./admin.css";
import logo from "../../assets/logo.png";

import useLogout from "../../hooks/useLogout.js";
import useNav from "../../hooks/useNav.js";

import { NavLink } from "react-router-dom";

import { FaHome, FaLock, FaTimes } from "react-icons/fa";
import { GiHamburgerMenu, GiVote } from "react-icons/gi";
import { IoMdHelp } from "react-icons/io";
import { FaPeopleGroup } from "react-icons/fa6";
import { IoExitOutline } from "react-icons/io5";
import { BsGraphUp } from "react-icons/bs";

import { useRef } from "react";

function AdminNav() {
  const menuRef = useRef();

  const { toogle, setToogle } = useNav();
  const logout = useLogout();

  const toggleMenu = () => {
    localStorage.setItem("toggle_nav", JSON.stringify(toogle));
    setToogle(!toogle);
  };

  const closeMenuonClick = () => {
    !toogle && setToogle(true);
  };

  const handleLogout = function () {
    return logout();
  };

  return (
    <div className={`main__navigation ${toogle ? "active" : ""}`} ref={menuRef}>
      <div className="navigation__toggle">
        <span name="menu-outline" onClick={() => toggleMenu()}>
          {toogle ? <GiHamburgerMenu /> : <FaTimes />}
        </span>
      </div>
      <div className="main__navigation-logo">
        <img className="logo" src={logo} alt="vote logo" />
      </div>
      <ul>
        <li>
          <NavLink to={"/dashboard"} onClick={closeMenuonClick}>
            <span className="icons">
              <FaHome />
            </span>
            <span className="title">Dashboard</span>
          </NavLink>
        </li>

        <li>
          <NavLink to={"/elections"} onClick={closeMenuonClick}>
            <span className="icons">
              <GiVote />
            </span>
            <span className="title">Elections</span>
          </NavLink>
        </li>

        <li>
          <NavLink to={"/candidates"} onClick={closeMenuonClick}>
            <span className="icons">
              <FaPeopleGroup />
            </span>
            <span className="title">Candidates</span>
          </NavLink>
        </li>

        <li>
          <NavLink to={"/results"} onClick={closeMenuonClick}>
            <span className="icons">
              <BsGraphUp />
            </span>
            <span className="title">Results</span>
          </NavLink>
        </li>

        <li>
          <NavLink to={"/reset-passwords"} onClick={closeMenuonClick}>
            <span className="icons">
              <FaLock />
            </span>
            <span className="title">Password Reset</span>
          </NavLink>
        </li>
        <li>
          <NavLink to={"/help"} onClick={closeMenuonClick}>
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
