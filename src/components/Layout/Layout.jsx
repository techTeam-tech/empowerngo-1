import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-grow md:ml-80">
        <Navbar />
        <div className="p-4 mt-20 lg:mt-24">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
