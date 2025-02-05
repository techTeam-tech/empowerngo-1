import { useState } from 'react';
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

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [activeMenu, setActiveMenu] = useState(null);

  const menuItems = [
    { title: 'Dashboard', icon: <HomeIcon className="w-8 h-8 text-blue-400" />, subMenus: [] },
    { title: 'Beneficiaries', icon: <UsersIcon className="w-8 h-8 text-green-400" />, subMenus: ['Manage', 'Tracking', 'Assessments'] },
    { title: 'Projects', icon: <DocumentTextIcon className="w-8 h-8 text-purple-400" />, subMenus: ['Active', 'Planning', 'Archived'] },
    { title: 'Finance', icon: <CurrencyDollarIcon className="w-8 h-8 text-yellow-400" />, subMenus: ['Donations', 'Expenses', 'Reports'] },
    { title: 'Reports', icon: <ChartBarIcon className="w-8 h-8 text-red-400" />, subMenus: ['Monthly', 'Annual', 'Custom'] }
  ];

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed z-50 p-4 m-3 md:hidden bg-blue-800 rounded-lg text-white shadow-lg hover:bg-blue-700 transition"
      >
        {isOpen ? <XMarkIcon className="w-8 h-8" /> : <Bars3Icon className="w-8 h-8" />}
      </button>
      <div
        className={`fixed top-0 left-0 h-screen bg-blue-900 text-white transition-all duration-300 z-40 shadow-lg flex flex-col overflow-hidden
          ${isOpen ? 'w-80' : '-translate-x-full'} md:translate-x-0`}
      >
        <div className="p-6 bg-blue-800 flex flex-col items-center border-b border-blue-700">
          <h1 className="text-3xl font-bold tracking-wide">NGO ERP</h1>
          <p className="text-lg text-blue-200">Empowering Communities</p>
        </div>
        <div className="p-6 flex items-center space-x-5 border-b border-blue-700">
          <div className="w-16 h-16 bg-blue-700 rounded-full flex items-center justify-center text-2xl font-semibold">AD</div>
          <div>
            <p className="text-xl font-semibold">Admin User</p>
            <p className="text-lg text-blue-300">Super Admin</p>
          </div>
        </div>
        <div className="flex-grow p-5 space-y-4 overflow-auto custom-scrollbar">
          {menuItems.map((item, index) => (
            <div key={item.title}>
              {item.title === 'Dashboard' ? (
                <button className="w-full flex items-center p-5 rounded-lg text-xl hover:bg-blue-800 transition-all">
                  <div className="flex items-center space-x-5">
                    {item.icon}
                    <span>{item.title}</span>
                  </div>
                </button>
              ) : (
                <>
                  <button
                    onClick={() => setActiveMenu(activeMenu === index ? null : index)}
                    className={`w-full flex items-center justify-between p-5 rounded-lg text-xl hover:bg-blue-800 transition-all
                      ${activeMenu === index ? 'bg-blue-800' : ''}`}
                  >
                    <div className="flex items-center space-x-5">
                      {item.icon}
                      <span>{item.title}</span>
                    </div>
                    {activeMenu === index ? (
                      <ChevronDownIcon className="w-6 h-6" />
                    ) : (
                      <ChevronRightIcon className="w-6 h-6" />
                    )}
                  </button>
                  {activeMenu === index && (
                    <div className="ml-10 space-y-3 mt-3">
                      {item.subMenus.map((subMenu) => (
                        <a
                          key={subMenu}
                          href="#"
                          className="block p-4 text-lg rounded-lg hover:bg-blue-800 transition"
                        >
                          {subMenu}
                        </a>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          ))}
        </div>
        <div className="p-6 border-t border-blue-700 flex flex-col items-center flex-shrink-0">
          <button className="w-full flex items-center justify-center p-5 bg-red-600 rounded-lg text-xl font-semibold hover:bg-red-700 transition-all">
            <ArrowLeftOnRectangleIcon className="w-8 h-8 mr-4" /> Logout
          </button>
          <p className="text-lg text-blue-300 mt-4">© 2023 NGO ERP v1.0</p>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
