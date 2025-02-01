/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import {
  FaHome,
  FaUsers,
  FaHandHoldingHeart,
  FaDonate,
  FaUserFriends,
  FaTasks,
  FaFolder,
  FaEnvelope,
  FaSignOutAlt,
  FaChevronDown,
  FaChevronUp
} from "react-icons/fa";
import { AiFillLock, AiOutlineLock } from "react-icons/ai";
import MainPage from "../MainPage/MainPage";
import AddStaff from "../../components/Manage Staff/AddStaff";
import ActiveStaffList from "../../components/Manage Staff/ActiveStaff";
import PendingStaff from "../../components/Manage Staff/PendingStaff";
import SearchDonor from "../../components/Manage Donor/SearchDonor";
import AddDonor from "../../components/Manage Donor/AddDonor";
import SearchDonation from "../../components/Manage Donation/SearchDonation";
import AddDonation from "../../components/Manage Donation/AddDonation";
import AddTask from "../../components/Manage Task/AddTask";
import PendingTask from "../../components/Manage Task/PendingTask";
import AddBucket from "../../components/Manage Bucket/AddBucket";
import SearchBucket from "../../components/Manage Bucket/SearchBucket";
import EmailTemplate from "../../components/Email Template/EmailTemplate";
import EmailList from "../../components/Email Template/EmailList";
import SearchVisitors from "../../components/Manage Vistors/SearchVisitors";
import AddVisitors from "../../components/Manage Vistors/AddVisitors";

const Sidebar = () => {
  const [isLocked, setIsLocked] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [openMenus, setOpenMenus] = useState({});
  const [activeComponent, setActiveComponent] = useState(null);

  const toggleLock = () => setIsLocked(!isLocked);
  const toggleMenu = (title) =>
    setOpenMenus((prev) => ({ ...prev, [title]: !prev[title] }));

  const menuItems = [
    { title: "Dashboard", icon: <FaHome />, component: <MainPage /> },
    {
      title: "Manage Staff",
      icon: <FaUsers />,
      nested: [
        { title: "Add Staff", component: <AddStaff /> },
        { title: "Active Staff List", component: <ActiveStaffList /> },
        { title: "Pending Staff List", component: <PendingStaff /> }
      ]
    },
    {
      title: "Manage Donor",
      icon: <FaHandHoldingHeart />,
      nested: [
        { title: "Search Donor", component: <SearchDonor /> },
        { title: "Add Donor", component: <AddDonor /> }
      ]
    },
    {
      title: "Manage Donation",
      icon: <FaDonate />,
      nested: [
        { title: "Search Donation", component: <SearchDonation /> },
        { title: "Add Donation", component: <AddDonation /> }
      ]
    },
    {
      title: "Manage Visitors",
      icon: <FaUserFriends />,
      nested: [
        { title: "Search Visitor", component: <SearchVisitors /> },
        { title: "Add Visitors", component: <AddVisitors /> }
      ]
    },
    {
      title: "Manage Task",
      icon: <FaTasks />,
      nested: [
        { title: "Add Task", component: <AddTask /> },
        { title: "Pending Task", component: <PendingTask /> }
      ]
    },
    {
      title: "Manage Bucket",
      icon: <FaFolder />,
      nested: [
        { title: "Add Bucket", component: <AddBucket /> },
        { title: "Search Bucket", component: <SearchBucket /> }
      ]
    },
    {
      title: "Email Template",
      icon: <FaEnvelope />,
      nested: [
        { title: "Add Email Template", component: <EmailTemplate /> },
        { title: "Email List", component: <EmailList /> }
      ]
    }
  ];

  const nonNestedItems = [{ title: "Logout", icon: <FaSignOutAlt /> }];

  const handleNestedItemClick = (component) => {
    setActiveComponent(component);
  };

  return (
    <div className="flex">
      <div
        className={`bg-gradient-to-b from-blue-500 to-blue-800 text-white ${
          isOpen || isLocked ? "w-72" : "w-16"
        } h-screen duration-300 flex flex-col shadow-lg overflow-y-auto scrollbar-thin scrollbar-thumb-blue-600 scrollbar-track-blue-800`}
        onMouseEnter={() => !isLocked && setIsOpen(true)}
        onMouseLeave={() => !isLocked && setIsOpen(false)}
      >
        <div className="flex justify-end p-4">
          {(isOpen || isLocked) && (
            <button
              className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-800 text-white hover:bg-yellow-500 transition-colors duration-300"
              onClick={toggleLock}
            >
              {isLocked ? (
                <AiFillLock className="text-2xl" />
              ) : (
                <AiOutlineLock className="text-2xl" />
              )}
            </button>
          )}
        </div>

        <ul className="overflow-y-auto flex-grow">
          {menuItems.map((menu, idx) => (
            <li key={idx} className="mb-2">
              <div
                className="flex items-center justify-between p-3 mx-2 rounded-lg cursor-pointer hover:bg-blue-700 transition"
                onClick={() => toggleMenu(menu.title)}
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">{menu.icon}</span>
                  <span
                    className={`whitespace-nowrap text-lg font-medium ${
                      isOpen || isLocked ? "block" : "hidden"
                    }`}
                  >
                    {menu.title}
                  </span>
                </div>
                {Array.isArray(menu.nested) &&
                  menu.nested.length > 0 &&
                  (isOpen || isLocked) && (
                    <span>
                      {openMenus[menu.title] ? (
                        <FaChevronUp className="text-sm" />
                      ) : (
                        <FaChevronDown className="text-sm" />
                      )}
                    </span>
                  )}
              </div>
              {Array.isArray(menu.nested) &&
                menu.nested.length > 0 &&
                openMenus[menu.title] && (
                  <ul
                    className={`ml-10 ${
                      isOpen || isLocked ? "block" : "hidden"
                    }`}
                  >
                    {menu.nested.map((subItem, subIdx) => (
                      <li
                        key={subIdx}
                        className="p-2 hover:bg-blue-700 cursor-pointer rounded-none"
                        onClick={() => handleNestedItemClick(subItem.component)}
                      >
                        <span>{subItem.title}</span>
                      </li>
                    ))}
                  </ul>
                )}
            </li>
          ))}

          {nonNestedItems.map((item, idx) => (
            <li
              key={idx}
              className="flex items-center gap-3 p-3 mx-2 rounded-lg cursor-pointer hover:bg-red-700 transition"
            >
              <span className="text-xl">{item.icon}</span>
              <span
                className={`whitespace-nowrap text-lg font-medium ${
                  isOpen || isLocked ? "block" : "hidden"
                }`}
              >
                {item.title}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex-grow p-6 bg-gray-100">
        {activeComponent || <MainPage />}
      </div>
    </div>
  );
};

export default Sidebar;
