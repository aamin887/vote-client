import "./navbar.css";
import { RiMenu3Line, RiCloseLine } from "react-icons/ri";
import logo from "../../assets/logo.png";
import { useState } from "react";
import { NavLink } from "react-router-dom";

function Navbar() {
  const [menuToggle, setMenuToggle] = useState(false);

  const Menu = () => (
    <>
      <p>
        <NavLink to="dashboard">Dashboard</NavLink>
      </p>
      <p>
        <NavLink to="elections">Elections</NavLink>
      </p>
      <p>
        <NavLink to="Results">Results</NavLink>
      </p>
      <p>
        <NavLink to="Votes">Votes</NavLink>
      </p>
      <p>
        <NavLink to="voters">Voters</NavLink>
      </p>
    </>
  );

  return (
    <div className="site__navbar">
      <div className="site__navbar-links">
        <div className="site__navbar-links_logo">
          <img src={logo} alt="logo" />
        </div>
        <div className="site__navbar-links_container">
          <Menu />
        </div>
      </div>
      <div className="site__navbar-sign">
        <button type="button">My Resume</button>
      </div>
      <div className="site__navabr-menu">
        <div className="site__navbar-menu_icon">
          {menuToggle ? (
            <RiCloseLine size={32} onClick={() => setMenuToggle(false)} />
          ) : (
            <RiMenu3Line size={32} onClick={() => setMenuToggle(true)} />
          )}
        </div>
        {menuToggle && (
          <div className="site__navbar-menu_container scale-up-center">
            <Menu />
            <div className="site__navbar-menu-container_sign">
              <button type="button">My Resume</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
