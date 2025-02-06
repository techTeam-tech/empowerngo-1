/* eslint-disable react/prop-types */
import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";
import { Outlet } from "react-router-dom";

const Layout = ({ setIsAuthenticated }) => {
  return (
    <div className="flex">
      <Sidebar setIsAuthenticated={setIsAuthenticated} />
      <div className="flex-grow md:ml-80">
        <Navbar setIsAuthenticated={setIsAuthenticated} />
        <div className="p-4 mt-20 lg:mt-24">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;