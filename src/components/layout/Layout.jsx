import "./layout.css";
import { Outlet } from "react-router-dom";
import { AdminNav, AdminHeader } from "../index";

function Layout() {
  return (
    <div className="app__layout">
      <div className="app__layout-header">
        <AdminHeader />
      </div>
      <div className="app__layout-content">
        <div className={`app__layout-content_left`}>
          <AdminNav />
        </div>
        <div className="app__layout-content_right">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Layout;
