export default {
  dashboard: {
    phrase: "Dashboard",
    to: "/dashboard",
    order: 10,
    roles: ["super-admin"],
    icon: "fas fa-tachometer-alt",
    badge: {
      color: "info",
      text: "NEW",
    },
  },

  // entity: {
  //   phrase: "Entity",
  //   order: 20,
  //   roles: ["super-admin"],
  //   // roles:['admin'],
  //   children: {
  //     person: {
  //       phrase: "Users",
  //       roles: ["super-admin"],

  //       order: 1,
  //     },
  //     branch: {
  //       phrase: "Branch",
  //       roles: ["super-admin"],

  //       order: 2,
  //     },
  //     company: {
  //       phrase: "Company",
  //       roles: ["super-admin"],

  //       order: 3,
  //     },
  //     // company_package: {
  //     //   phrase: "Company Package",
  //     //   order: 4,
  //     //   to: "/company-setup",
  //     //   icon: "fas fa-box-open",
  //     //   roles: ["super-admin"],
  //     // },
  //   },
  // },

  entity: {
    _tag: 'CSidebarNavDropdown',
    name: 'Entity',
    phrase: 'Entities',
    order:20,
    to: '/entity',
    icon: 'fas fa-building',
    hasRoute: false,
    children: {
      branch: {
        name: 'Branch',
        phrase: 'Branch',
        icon: 'fas fa-list',
        to: '/entity/branches'
      },
      company: {
        name: 'Company',
        phrase: 'Company',
        icon: 'fas fa-list',
        to: '/admin/companies'
      },
      person: {
        name: 'Person',
        phrase: 'User',
        icon: 'fas fa-list',
        to: '/users'
      }
    }
  },



  owner: {
    phrase: "Manage App",
    to: "/owner",
    order: 100,
    roles: ["super-admin"],

    icon: "fas fa-mobile",
    // roles:['admin'],
    hasRoute: false,
    children: {
      location: {
        phrase: "Locations",
        roles: ["super-admin"],

        order: 1,
        icon: "fas fa-map-marker-alt",
        to: "/owner/locations",
      },
      styles: {
        phrase: "Styles",
        to: "/owner/styles",
        roles: ["super-admin"],
        icon: "fas fa-broom",
      },
      items: {
        phrase: "Items",
        order: 1,
        roles: ["super-admin"],

        icon: "fas fa-box",
        to: "/owner/items",
      },
      team: {
        phrase: "Teams",
        roles: ["super-admin"],

        order: 2,
        icon: "fas fa-users",
        to: "/owner/teams",
      },
      shifts: {
        phrase: "Shifts",
        roles: ["super-admin"],

        order: 3,
        to: "/owner/shifts",
        icon: "fas fa-stopwatch",
      },
      roaster: {
        phrase: "Roaster",
        roles: ["super-admin"],

        order: 4,
        to: "/owner/roasters",
        icon: "fas fa-landmark",
      },
    },
  },
  customer: {
    hide: true,
    order: 1,
  },
  person: {
    hide: true,
  },
  user: {
    hide: true,
  },

  Promotion: {
    phrase: "Promotion",
    to: "/promotions",
    roles: ["super-admin"],

    order: 138,
    // roles:['super-admin','staff-admin'],
    icon: "fas fa-ad",
  },

  calls: {
    phrase: "Calls",
    roles: ["super-admin"],

    to: "/calls",
    order: 115,
    icon: "fas fa-phone-square-alt",
  },
  pages: {
    phrase: "Pages",
    roles: ["super-admin"],

    order: 135,
    to: "/pages",
    icon: "fas fa-pager",
    children: {
      page: {
        phrase: "QR Codes",
        to: "/pages/qr-codes",
        roles: ["super-admin"],
        icon: "fas fa-pager",
      },
      Area: {
        phrase: "Area",
        to: "/pages/area",
        roles: ["super-admin"],
        icon: "fas fa-warehouse",
      },
    
    },
  },
};
