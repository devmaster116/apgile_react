export default {
  dashboard: {
    phrase: "Dashboard",
    to: "/dashboard",
    order: 10,
    // roles: ["admin"],
    icon: "fas fa-tachometer-alt",
    badge: {
      color: "info",
      text: "NEW",
    },
  },
  staff:{
    phrase: "Staff",
    order: 20,
    to: "/staff",
    icon: "fas fa-users",
  },
teams:{
  phrase: "Teams",
  order: 21,
  to: "/teams",
  icon: "fas fa-users",
},
shifts: {
  phrase: "Shifts",
  // roles: ["super-admin"],

  order: 22,
  to: "/shifts",
  icon: "fas fa-stopwatch",
},
roaster: {
  phrase: "Roaster",
  // roles: ["super-admin"],

  order: 23,
  to: "/roasters",
  icon: "fas fa-landmark",
},
location: {
  phrase: "Locations",
  order: 26,
  icon: "fas fa-map-marker-alt",
  to: "/locations",
  // roles: ["admin"],
},
items: {
  phrase: "Items",
  order: 28,
  // roles: ["super-admin"],
  icon: "fas fa-box",
  to: "/items",
},
Area: {
  phrase: "Area",
  to: "/areas",
  order:29,
  // roles: ["super-admin"],
  icon: "fas fa-warehouse",
},
QR_Code: {
  phrase: "QR Codes",
  to: "/qr-codes",
  // roles: ["super-admin"],
  order:31,
  icon: "fas fa-pager",
},
setting: {
  phrase: "Settings",
  to: "/setting",
  // roles: ["super-admin"],
  order:32,
  icon: "fas fa-pager",
},

  // profile: {
  //   phrase: "Profile",
  //   order: 100,
  //   to: "/profiles",
  //   icon: "fas fa-user",
  //   // roles: ["admin"],
  //   children: {
  //     profile_list: {
  //       phrase: "Profiles List",
  //       to: "/profiles/profile-list",
  //       icon: "fas fa-users",
  //       // roles: ["admin"],
  //     },
  //   },
  // },
  entity: {
    phrase: "Branch",
    order: 102,
    to: "/owner",
    hide:true,
    // roles: ["admin"],
    children: {
      person: {
        phrase: "Users",
        order: 1,
        hide: true,
        // roles: ["admin"],
      },
      branch: {
        phrase: "Branch",
        order: 1,
        hide: false,
        to: "/owner/branches",
        // roles: ["admin"],
      },
      company: {
        phrase: "Company",
        order: 3,
        hide: true,
        // roles: ["admin"],
      },
    },
  },

 
  // calls: {
  //   phrase: "Calls",
  //   to: "/calls",
  //   order: 115,
  //   // roles: ["admin"],
  //   icon: "fas fa-phone-square-alt",
  // },
  // promotions: {
  //   phrase: "Promotions",
  //   to: "/promotions",
  //   order: 120,
  //   // roles: ["admin"],
  //   // roles:['super-admin','staff-admin'],
  //   icon: "fas fa-ad",
  // },
  // pages: {
  //   phrase: "Pages",
  //   order: 130,
  //   to: "/pages",
  //   icon: "fas fa-pager",
  //   // roles: ["admin"],
  //   children: {
  //     page: {
  //       phrase: "Pages",
  //       to: "/pages/page",
  //       icon: "fas fa-pager",
  //       // roles: ["admin"],
  //     },
  //     styles: {
  //       phrase: "Styles",
  //       to: "/pages/styles",
  //       icon: "fas fa-broom",
  //       // roles: ["admin"],
  //     },
  //   },
  // },

  user: {
    _tag: 'CSidebarNavDropdown',
    name: 'User',
    order:27,
    phrase: 'User',
    to: '/users',
    hide:true,
    icon: 'fas fa-user',
    children: {
      user_extended: {
        name: 'user_extended',
        phrase: 'Users List',
        icon: 'fas fa-list',
        to: '/users-extended'
      },
      user:{
        hide:true,
      },
      permission: {
        _tag: 'CSidebarNavItem',
        name: 'Permissions',
        phrase: 'permissions',
        icon: 'fas fa-list',
        to: '/users/permissions',
        hide:true,
      },
      role: {
        _tag: 'CSidebarNavItem',
        name: 'Roles',
        phrase: 'roles',
        icon: 'fas fa-list',
        to: '/users/roles',
        hide:true
      } 
    }
  }
};
