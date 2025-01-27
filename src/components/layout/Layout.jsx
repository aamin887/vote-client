import "./layout.css";
import { Outlet, useLocation } from "react-router-dom";
import { AdminNav, AdminHeader, Terms } from "../index";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";

function Layout() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const {
    auth: { terms },
  } = useAuth();

  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="app__layout">
      {/* {!terms && <Terms />} */}
      <div className="app__layout-header">
        <AdminHeader isMobile={isMobile} setSearchQuery={setSearchQuery} />
      </div>
      <div className="app__layout-content">
        <div className={`app__layout-content_left`}>
          <AdminNav />
        </div>
        <div className="app__layout-content_right">
          <Outlet context={{ searchQuery, currentPage: location.pathname }} />
        </div>
      </div>
    </div>
  );
}

export default Layout;
