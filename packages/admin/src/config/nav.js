export default {
    dashboard: {
        phrase: "Dashboard",
        to: "/dashboard",
        order: 10,
        roles: ["super-admin", "admin"],
        icon: "fas fa-tachometer-alt",
        badge: {
            color: "info",
            text: "NEW",
        },
    },
    company: {
        name: 'Company',
        phrase: 'Companies',
        order: 20,
        icon: "fas fa-calendar-plus",
        to: '/admin/companies'
    },
    branch: {
        name: 'Outlet',
        phrase: 'Outlets',
        order: 30,
        icon: 'fas fa-code-branch',
        to: '/entity/branches'
    },
    persons: {
        name: 'Person',
        phrase: 'Manage Users',
        order: 40,
        icon: 'fas fa-users',
        to: '/owner/users'
    },
    // superAdmins: {
    //     name: 'superAdmins',
    //     phrase: 'Super Admins',
    //     order: 41,
    //     icon: 'fas fa-users',
    //     to: '/super-admins'
    // },
    changePassword: {
        name: 'changePassword',
        phrase: 'Change Admin Password',
        order: 42,
        icon: 'fas fa-key',
        to: '/change-password'
    },
    entity: {
        hide: true
    },
    // entity: {
    //     _tag: 'CSidebarNavDropdown',
    //     name: 'Entity',
    //     phrase: 'Entities',
    //     order: 20,
    //     to: '/entity',
    //     roles: ["super-admin"],
    //     icon: 'fas fa-building',
    //     hasRoute: false,
    //     children: {
    //
    //         company: {
    //             name: 'Company',
    //             phrase: 'All Companies',
    //             order: 0,
    //             icon: "fas fa-calendar-plus",
    //             to: '/admin/companies'
    //         },
    //         branch: {
    //             name: 'Branch',
    //             phrase: 'All Branches',
    //             order: 1,
    //             icon: 'fas fa-code-branch',
    //             to: '/entity/branches'
    //         },
    //         person: {
    //             name: 'Person',
    //             phrase: 'All Users',
    //             order: 2,
    //             icon: 'fas fa-users',
    //             to: '/owner/users'
    //         }
    //     }
    // },


    // owner: {
    //     phrase: "Manage Team",
    //     to: "/owner",
    //     order: 100,
    //     roles: ["super-admin"],
    //     icon: "fas fa-users",
    //     // roles:['admin'],
    //     hasRoute: false,
    //     children: {
    //
    //         team: {
    //             phrase: "Teams",
    //             roles: ["super-admin"],
    //
    //             order: 2,
    //             icon: "fas fa-users",
    //             to: "/owner/teams",
    //         },
    //         shifts: {
    //             phrase: "Shifts",
    //             roles: ["super-admin"],
    //
    //             order: 3,
    //             to: "/owner/shifts",
    //             icon: "fas fa-stopwatch",
    //         },
    //         roaster: {
    //             phrase: "Roaster",
    //             roles: ["super-admin"],
    //
    //             order: 4,
    //             to: "/owner/roasters",
    //             icon: "fas fa-landmark",
    //         },
    //     },
    // },


    // locations: {
    //     phrase: "Location Management",
    //     to: "/locations",
    //     order: 110,
    //     roles: ["super-admin"],
    //     icon: "fas fa-map-marker-alt",
    //     // roles:['admin'],
    //     hasRoute: false,
    //     children: {
    //         Area: {
    //             phrase: "Area",
    //             to: "/pages/area",
    //             order: 1,
    //             roles: ["super-admin"],
    //             icon: "fas fa-warehouse",
    //         },
    //         location: {
    //             phrase: "Locations",
    //             roles: ["super-admin"],
    //             order: 2,
    //             icon: "fas fa-map-marker-alt",
    //             to: "/owner/locations",
    //         },
    //         items: {
    //             phrase: "Items",
    //             order: 3,
    //             roles: ["super-admin"],
    //             icon: "fas fa-box",
    //             to: "/owner/items",
    //         },
    //
    //     },
    // },
    //
    // styles: {
    //     phrase: "Styles",
    //     order: 111,
    //     to: "/owner/styles",
    //     roles: ["super-admin"],
    //     icon: "fas fa-broom",
    // },

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

    // Promotion: {
    //     phrase: "Manage Promotions",
    //     to: "/promotions",
    //     roles: ["super-admin"],
    //     order: 138,
    //     icon: "fas fa-ad",
    //     children: {
    //         categories: {
    //             phrase: "Categories",
    //             order: 1,
    //             to: "/categories",
    //             roles: ["super-admin"],
    //             icon: "fas fa-users",
    //         },
    //         promotions: {
    //             phrase: "Promotion",
    //             order: 2,
    //             to: "/promotions",
    //             roles: ["super-admin"],
    //             icon: "fas fa-ad",
    //         },
    //     },
    // },

    // calls: {
    //     phrase: "Calls",
    //     roles: ["super-admin"],
    //
    //     to: "/calls",
    //     order: 115,
    //     icon: "fas fa-phone-square-alt",
    // },
    // page: {
    //     phrase: "QR Codes",
    //     order: 135,
    //     to: "/pages/qr-codes",
    //     roles: ["super-admin"],
    //     icon: "fas fa-pager",
    // },


    //COMPANY ADMIN

//  staff: {
//     phrase: "Staff",
//     order: 320,
//     to: "/staff",
//     icon: "fas fa-users",
//     roles: ["admin"],
//   },
//   teams: {
//     phrase: "Teams",
//     order: 321,
//     to: "/teams",
//     roles: ["admin"],
//     icon: "fas fa-users",
//   },

//   shifts: {
//     phrase: "Shifts",
//     roles: ["admin"],
//     order: 322,
//     to: "/shifts",
//     icon: "fas fa-stopwatch",
//   },
//   roaster: {
//     phrase: "Roaster",
//     roles: ["admin"],
//     order: 323,
//     to: "/roasters",
//     icon: "fas fa-landmark",
//   },
//   location: {
//     phrase: "Locations",
//     order: 326,
//     icon: "fas fa-map-marker-alt",
//     to: "/locations",
//     roles: ["admin"],
//   },
//   items: {
//     phrase: "Items",
//     order: 328,
//     roles: ["admin"],
//     icon: "fas fa-box",
//     to: "/items",
//   },
//   Area: {
//     phrase: "Area",
//     to: "/areas",
//     order: 329,
//     roles: ["admin"],
//     icon: "fas fa-warehouse",
//   },
//   QR_Code: {
//     phrase: "QR Codes",
//     to: "/qr-codes",
//     roles: ["admin","supervisor"],
//     order: 331,
//     icon: "fas fa-pager",
//   },
//   setting: {
//     phrase: "Settings",
//     to: "/setting",
//     roles: ["admin"],
//     order: 332,
//     icon: "fas fa-pager",
//   },
    // entity: {
    //   phrase: "Branch",
    //   order: 102,
    //   to: "/owner",
    //   hide: true,
    //   roles: ["admin"],
    //   children: {
    //     person: {
    //       phrase: "Users",
    //       order: 1,
    //       hide: true,
    //       roles: ["admin"],
    //     },
    //     branch: {
    //       phrase: "Branch",
    //       order: 1,
    //       hide: false,
    //       to: "/owner/branches",
    //       roles: ["admin"],
    //     },
    //     company: {
    //       phrase: "Company",
    //       order: 3,
    //       hide: true,
    //       roles: ["admin"],
    //     },
    //   },
    // },


};
