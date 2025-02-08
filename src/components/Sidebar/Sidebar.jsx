/* eslint-disable react/prop-types */
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  HomeIcon,
  UsersIcon,
  DocumentTextIcon,
  ChartBarIcon,
  CurrencyDollarIcon,
  ChevronRightIcon,
  ChevronDownIcon,
  XMarkIcon,
  Bars3Icon,
  ArrowLeftOnRectangleIcon
} from '@heroicons/react/24/outline';
import './style.css';

const Sidebar = ({ setIsAuthenticated }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [activeMenu, setActiveMenu] = useState(null);
  const navigate = useNavigate();

  const toggleSidebar = () => setIsOpen(!isOpen);
  const toggleMenu = (index) => setActiveMenu(activeMenu === index ? null : index);

  const handleNavigation = (route) => {
    navigate(route === "/dashboard" ? "/" : route);  
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    navigate('/signin');
  };

  const menuItems = [
    { title: 'Dashboard', icon: <HomeIcon className="w-6 h-6 text-blue-400" />, route: '/dashboard', subMenus: [] },
    { 
      title: 'Manage Staff', 
      icon: <UsersIcon className="w-6 h-6 text-green-400" />, 
      subMenus: [
        { title: 'Manage', route: '/addstaff' },
        { title: 'Tracking', route: '/beneficiaries/tracking' },
        { title: 'Assessments', route: '/beneficiaries/assessments' }
      ] 
    },
    { 
      title: 'Projects', 
      icon: <DocumentTextIcon className="w-6 h-6 text-purple-400" />, 
      subMenus: [
        { title: 'Active', route: '/projects/active' },
        { title: 'Planning', route: '/projects/planning' },
        { title: 'Archived', route: '/projects/archived' }
      ] 
    },
    { 
      title: 'Finance', 
      icon: <CurrencyDollarIcon className="w-6 h-6 text-yellow-400" />, 
      subMenus: [
        { title: 'Donations', route: '/finance/donations' },
        { title: 'Expenses', route: '/finance/expenses' },
        { title: 'Reports', route: '/finance/reports' }
      ] 
    },
    { 
      title: 'Reports', 
      icon: <ChartBarIcon className="w-6 h-6 text-red-400" />, 
      subMenus: [
        { title: 'Monthly', route: '/reports/monthly' },
        { title: 'Annual', route: '/reports/annual' },
        { title: 'Custom', route: '/reports/custom' }
      ] 
    }
  ];

  return (
    <>
      <button
        onClick={toggleSidebar}
        className="fixed z-50 p-3 m-3 md:hidden bg-blue-800 rounded-lg text-white shadow-lg hover:bg-blue-700 transition"
      >
        {isOpen ? <XMarkIcon className="w-6 h-6" /> : <Bars3Icon className="w-6 h-6" />}
      </button>

      <div
        className={`fixed top-0 left-0 h-full bg-blue-900 text-white transition-all duration-300 z-40 shadow-lg flex flex-col 
          ${isOpen ? 'w-72' : '-translate-x-full'} md:translate-x-0`}
      >
        <div className="p-5 bg-blue-800 flex flex-col items-center border-b border-blue-700">
          <h1 className="text-2xl font-bold">NGO ERP</h1>
          <p className="text-sm text-blue-200">Empowering Communities</p>
        </div>
        <div className="p-5 flex items-center space-x-4 border-b border-blue-700">
          <div className="w-12 h-12 bg-blue-700 rounded-full flex items-center justify-center text-xl font-semibold">AD</div>
          <div>
            <p className="text-lg font-semibold">Admin User</p>
            <p className="text-sm text-blue-300">Super Admin</p>
          </div>
        </div>
        <div className="flex-grow p-4 space-y-2 overflow-auto">
          {menuItems.map((item, index) => (
            <div key={index}>
              <button
                onClick={() => item.subMenus.length > 0 ? toggleMenu(index) : handleNavigation(item.route)}
                className={`w-full flex items-center justify-between p-3 rounded-lg text-lg hover:bg-blue-800 transition-all 
                  ${activeMenu === index ? 'bg-blue-800' : ''}`}
              >
                <div className="flex items-center space-x-3">
                  {item.icon}
                  <span>{item.title}</span>
                </div>
                {item.subMenus.length > 0 && (
                  activeMenu === index ? <ChevronDownIcon className="w-5 h-5" /> : <ChevronRightIcon className="w-5 h-5" />
                )}
              </button>
              {activeMenu === index && (
                <div className="ml-8 mt-2 space-y-2">
                  {item.subMenus.map((subMenu, subIndex) => (
                    <button
                      key={subIndex}
                      onClick={() => handleNavigation(subMenu.route)}
                      className="block w-full text-left p-2 text-sm rounded-lg hover:bg-blue-800 transition"
                    >
                      {subMenu.title}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="p-4 border-t border-blue-700">
          <button
            onClick={handleLogout}  
            className="w-full flex items-center justify-center p-3 bg-red-600 rounded-lg text-lg font-semibold hover:bg-red-700 transition"
          >
            <ArrowLeftOnRectangleIcon className="w-5 h-5 mr-2" /> Logout
          </button>
          <p className="text-sm text-blue-300 text-center mt-3">© 2023 NGO ERP v1.0</p>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
