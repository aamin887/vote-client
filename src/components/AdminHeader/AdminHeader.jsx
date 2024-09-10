import { CiSearch } from "react-icons/ci";
import { FaRegBell, FaMoon } from "react-icons/fa";
import { TfiShine } from "react-icons/tfi";
import { IoMdAddCircle } from "react-icons/io";
import LOGO from "../../assets/logo.png";
import "./adminheader.css";
import { useState } from "react";
import { Link } from "react-router-dom";

function AdminHeader() {
  const [theme, setTheme] = useState(true);

  const toogleDark = function () {
    const root = document.documentElement;

    setTheme(!theme);

    if (theme) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  };

  return (
    <div className="navigation__topnav">
      <div className="navigation__topnav-left">
        <div className="navigation__topnav-left_title">
          <h1 className="title__text">Dashboard</h1>
        </div>
      </div>

      <div className="navigation__topnav-right">
        <div className="navigation__topnav-right_search">
          <label>
            <input type="text" placeholder="Search here" autoComplete="off" />
            <ion-icon name="search-outline">
              <CiSearch style={{ color: "#a9a9a9" }} />
            </ion-icon>
          </label>
        </div>
        <Link to={"/elections/create"}>
          <div className="navigation__topnav-right_icons">
            <IoMdAddCircle
              size={23}
              style={{ color: "#fffff" }}
              className="navigation__topnav-right_icons-add"
              title="create an election"
            />
          </div>
        </Link>

        <div className="navigation__topnav-right_icons" onClick={toogleDark}>
          {theme ? (
            <FaMoon size={23} style={{ color: "#fffff" }} />
          ) : (
            <TfiShine size={23} style={{ color: "#fffff" }} />
          )}
        </div>

        <div className="navigation__topnav-right_icons">
          <FaRegBell size={23} style={{ color: "#fffff" }} />
        </div>

        <div className="navigation__topnav-right_user">
          <img src={LOGO} alt="user profile" />
        </div>
      </div>
    </div>
  );
}

export default AdminHeader;
