export const roleColors = {
    1: "bg-red-600", // Super Admin
    2: "bg-green-600", // NGO Admin
    3: "bg-yellow-600", // NGO Staff
    4: "bg-blue-600", // CA NGO
  };
  
  export const roleNames = {
    1: "Super Admin",
    2: "NGO Admin",
    3: "NGO Staff",
    4: "CA NGO",
  };
  
  export const roleShortForms = {
    1: "SA",
    2: "NA",
    3: "NS",
    4: "CA",
  };

 export const ROLES = {
    SUPER_ADMIN: 1,
    NGO_ADMIN: 2,
    NGO_STAFF: 3,
    NGO_CA: 4,
  };
  
  export const menuItems = [
    {
      title: "Dashboard",
      icon: "HomeIcon",
      route: "/dashboard",
      roles: [1, 2, 3], 
    },
    {
      title: "Manage User",
      icon: "UsersIcon",
      route: "/addstaff",
      roles: [2], 
    },
    {
      title: "Manage Donor",
      icon: "DocumentTextIcon",
      route: "/adddonor",
      roles: [2], 
    },
    {
      title: "Manage Donations",
      icon: "CurrencyDollarIcon",
      route: "/finance/donations",
      roles: [2], 
    },
    {
      title: "Manage NGOs",
      icon: "ChartBarIcon",
      route: "/registerNgo",
      roles: [1], 
    },
    {
      title: "Manage Projects",
      icon: "DocumentTextIcon",
      route: "/addproject",
      roles: [2, 3], 
    },
  ];
   
  export default ROLES;