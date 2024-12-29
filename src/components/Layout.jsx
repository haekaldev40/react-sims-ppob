import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

function Layout() {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="border-b border-gray-300 max-w-7xl">
        <Navbar />
      </div>
      <Outlet />
    </div>
  );
}

export default Layout;
