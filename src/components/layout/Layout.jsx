import "./layout.css";
import { Outlet, useLocation } from "react-router-dom";
import { AdminNav, AdminHeader } from "../index";
import { useState } from "react";

function Layout() {
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();
  return (
    <div className="app__layout">
      <div className="app__layout-header">
        <AdminHeader setSearchQuery={setSearchQuery} />
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
