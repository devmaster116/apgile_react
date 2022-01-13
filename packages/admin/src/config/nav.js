export default {
  dashboard: {
    phrase: "Dashboard",
    to: "/dashboard",
    order: 10,
    icon: "fas fa-tachometer-alt",
    badge: {
      color: "info",
      text: "NEW",
    },
  },

  entity: {
    phrase: "Entity",
    order: 20,
    // roles:['admin'],
    children: {
      person: {
        phrase: "Users",
        order: 1,
      },
      branch: {
        phrase: "Branch",
        order:2
      },
      company: {
        phrase: "Company",
        order:3
      },
      company_package: {
        phrase: "Company Package",
        order:4,
        to:'/company-setup',
        icon: "fas fa-box-open",
      },
     
    },
  },
  owner: {
    phrase: "Manage App",
    to: "/owner",
    order: 100,
    icon: "fas fa-mobile",
    // roles:['admin'],
    hasRoute: false,
    children: {
      location: {
        phrase: "Locations",
        order: 1,
        icon: "fas fa-map-marker-alt",
        to: "/owner/locations",
      },
      items: {
        phrase: "Items",
        order: 1,
        icon: "fas fa-map-marker-alt",
        to: "/owner/items",
      },
      team: {
        phrase: "Teams",
        order: 2,
        icon: "fas fa-users",
        to: "/owner/teams",
      },
      shifts: {
        phrase: "Shifts",
        order: 3,
        to: "/owner/shifts",
        icon: "fas fa-stopwatch",
      },
      roaster:{
        phrase:"Roaster",
        order:4,
        to:"/owner/roasters",
        icon:"fas fa-landmark"
      }
    },
  },
  customer: {
    hide: true,
    order:1,
  },
  person: {
    hide: true,
  },
  user:{
    hide:true,
  },

  Promotion: {
    phrase: "Promotion",
    to: "/promotions",
    order: 138,
    // roles:['super-admin','staff-admin'],
    icon: "fas fa-ad",
  },

  calls: {
    phrase: "Calls",
    to: "/calls",
    order: 115,
    icon: "fas fa-phone-square-alt",
  },
  pages: {
    phrase: "Pages",
    order: 135,
    to: "/pages",
    icon: "fas fa-pager",
    children: {
      page: {
        phrase: "Pages",
        to: "/pages/page",
        icon: "fas fa-pager",

      },
      styles: {
        phrase: "Styles",
        to: "/pages/styles",
        icon: "fas fa-broom",

      },
    },
  },

};
