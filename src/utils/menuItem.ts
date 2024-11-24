export const menuItems = [
    // {
    //   label: "Home",
    //   icon: "pi pi-home",
    //   link: "/home",
    // },
    {
      label: "Users",
      icon: "pi pi-users",
      link: "/dashboard/users",
    },
    {
      label: "Vendors",
      icon: "pi pi-clipboard",
      link: "/dashboard/vendors",
    },
    {
      label: "Cusines",
      icon: "pi pi-box",
      link: "/dashboard/cusines",
    },
    {
      label: "Categories",
      icon: "pi pi-book",
      link: "/dashboard/categories",
    },
    {
      label: "Dishes",
      icon: "pi pi-bullseye",
      link: "/dashboard/dishes",
    },
    {
      label: "Orders",
      icon: "pi pi-shopping-bag",
      link: "/dashboard/orders",
    },

    {
      label: "Admins",
      icon: "pi pi-user-plus",
      link: "/dashboard/admin-users",
    },
    // {
    //   label: "Mail All",
    //   icon: "pi pi-chart-line",
    //   badge: { severity: "danger" },
    //   link: "#",
    //   submenu: [
    //     {
    //       label: "Google Connected Accounts",
    //       icon: "pi pi-chart-line",
    //       link: "/dashboard/mail-all/google-connected-accounts",
    //     },
    //   ],
    // },

    // {
    //   label: "Board Wala",
    //   icon: "pi pi-chart-line",
    //   badge: { severity: "danger" },
    //   link: "#",
    //   submenu: [
    //     {
    //       label: "Assessments",
    //       icon: "pi pi-chart-line",
    //       link: "/dashboard/lms/assessments",
    //     },
    //     {
    //       label: "Tasks",
    //       icon: "pi pi-chart-line",
    //       link: "/dashboard/lms/tasks",
    //     },
    //     {
    //       label: "Templates",
    //       icon: "pi pi-chart-line",
    //       link: "/dashboard/lms/template",
    //     },
    //     {
    //       label: "Categories",
    //       icon: "pi pi-chart-line",
    //       link: "/dashboard/category",
    //     },
    //     {
    //       label: "Orders",
    //       icon: "pi pi-chart-line",
    //       link: "/dashboard/order",
    //     },
    //   ],
    // },

    

    // {
    //   label: "Cloud Lead",
    //   icon: "pi pi-chart-line",
    //   badge: { severity: "danger" },
    //   link: "#",
    //   submenu: [
    //     {
    //       label: "Enrichments",
    //       icon: "pi pi-chart-line",
    //       link: "/dashboard/cloud-lead/enrichments",
    //     },
    //     {
    //       label: "Custom Leads",
    //       icon: "pi pi-chart-line",
    //       link: "/dashboard/cloud-lead/custom-lead-request",
    //     }
    //   ],
    // },

    // {
    //   label: "Search",
    //   icon: "pi pi-search",
    //   link: "/search",
    // },
    // {
    //   label: "Team",
    //   icon: "pi pi-users",
    //   link: "#",
    // },
    // {
    //   label: "Cloud Lead",
    //   icon: "pi pi-chart-line",
    //   badge: { severity: "danger" },
    //   link: "#",
    //   submenu: [
    //     {
    //       label: "Revenue",
    //       icon: "pi pi-chart-line",
    //       link: "#",
    //       submenu: [
    //         {
    //           label: "View",
    //           icon: "pi pi-table",
    //           link: "/dashboard/view",
    //         },
    //         {
    //           label: "Search",
    //           icon: "pi pi-search",
    //           link: "#",
    //         },
    //       ],
    //     },
    //     {
    //       label: "Expenses",
    //       icon: "pi pi-chart-line",
    //       link: "#",
    //     },
    //   ],
    // },
    // {
    //   label: "Events",
    //   icon: "pi pi-calendar",
    //   link: "#",
    // },
    // {
    //   label: "Options",
    //   icon: "pi pi-cog",
    //   link: "#",
    // },
  ];



function extractLinks(menu:any) {
    let links:any = [];
    
    menu.forEach((item:any) => {
        if (item.link) {
            links.push(item.link);
        }
        
        if (item.submenu) {
            links = links.concat(extractLinks(item.submenu));
        }
    });
    
    return links;
}

export const allPrivateRoutes = extractLinks(menuItems).filter((item:string)=> item !== "#" );