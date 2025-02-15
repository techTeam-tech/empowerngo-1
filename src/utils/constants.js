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
  
  export const menuItems = [
    {
      title: "Dashboard",
      icon: "HomeIcon",
      route: "/dashboard",
    },
    {
      title: "Manage User",
      icon: "UsersIcon",
      route: "/manageUser",
    },
    {
      title: "Manage Donor",
      icon: "DocumentTextIcon",
      route: "/adddonor",
    },
    {
      title: "Manage Donations",
      icon: "CurrencyDollarIcon",
      route: "/finance/donations",
    },
    {
      title: "Manage NGOs",
      icon: "ChartBarIcon",
      route: "/registerNgo",
    },
    {
      title: "Manage Projects",
      icon: "DocumentTextIcon",
      route: "/addproject",
    },
  ];
  