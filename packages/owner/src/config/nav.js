const nav = {
    dashboard: {
        phrase: "Dashboard",
        to: "/dashboard",
        order: 8,
        roles: ["admin", "manager"],
        icon: "fas fa-home",
        badge: {
            color: "info",
            text: "NEW",
        },
    },
    analytics: {
        phrase: "Analytics",
        to: "/analytics",
        order: 9,
        roles: ["admin", "manager"],
        icon: "fas fa-tachometer-alt",
    },
    owner: {
        phrase: "Manage Staff",
        to: "/owner",
        order: 21,
        roles: ["admin", "manager"],
        icon: "fas fa-house-user",
        hasRoute: false,
        children: {
            staff: {
                phrase: "Staff",
                order: 20,
                to: "/staff",
                icon: "fas fa-user",
                roles: ["admin", "manager"],
            },
            teams: {
                phrase: "Teams",
                order: 21,
                to: "/teams",
                roles: ["admin", "manager"],
                icon: "fas fa-users",
            },
            // shifts: {
            //     phrase: "Shifts",
            //     roles: ["admin", "manager"],
            //     order: 22,
            //     to: "/shifts",
            //     icon: "fas fa-stopwatch",
            // },
            // roaster: {
            //     phrase: "Roaster",
            //     roles: ["admin", "manager"],
            //     order: 23,
            //     to: "/roasters",
            //     icon: "fas fa-landmark",
            // },
        },
    },

    slot: {
        phrase: "Time Slots",
        to: "/slots",
        roles: ["admin", "manager"],
        order: 22,
        icon: "fas fa-clock",
    },

    locations: {
        phrase: "Location Management",
        to: "/locations",
        order: 26,
        roles: ["admin", "manager"],
        icon: "fas fa-map-marker-alt",
        // roles:['admin'],
        hasRoute: false,
        children: {
            location: {
                phrase: "Locations",
                order: 2,
                icon: "fas fa-map-marker-alt",
                to: "/locations",
                roles: ["admin", "manager"],
            },
            items: {
                phrase: "Items",
                order: 3,
                roles: ["admin", "manager"],
                icon: "fas fa-box",
                to: "/items",
            },
            Area: {
                phrase: "Area",
                to: "/areas",
                order: 1,
                roles: ["admin", "manager"],
                icon: "fas fa-warehouse",
            },
            reservations: {
                phrase: "Reservations",
                to: "/reservations",
                roles: ["admin", "manager"],
                order: 10,
                icon: "fas fa-calendar",
            },
        },
    },

    order_management: {
        phrase: "Order Items",
        to: "/promotions",
        roles: ["admin", "manager"],
        order: 28,
        icon: "fas fa-utensils",
        children: {
            order_items: {
                phrase: "Items",
                to: "/order-items",
                roles: ["admin", "manager"],
                order: 10,
                icon: "fas fa-utensils",
            },
            oi_sort: {
                phrase: "Sort Order Items",
                to: "/oi-sort",
                roles: ["admin", "manager"],
                order: 11,
                icon: "fas fa-sort",
            },
        },
    },

    virtual_btn_management: {
        phrase: "Virtual Buttons",
        to: "/promotions",
        roles: ["admin", "manager"],
        order: 29,
        icon: "fas fa-stop",
        children: {
            virtual_buttons: {
                phrase: "Virtual Buttons",
                to: "/virtual-buttons",
                roles: ["admin", "manager", "supervisor"],
                order: 150,
                icon: "fas fa-stop",
            },
            virtual_buttons_sort: {
                phrase: "Sort Virtual Buttons",
                to: "/vb-sort",
                roles: ["admin", "manager", "supervisor"],
                order: 151,
                icon: "fas fa-sort",
            },
        },
    },

    qr_code_management: {
        phrase: "QR Codes",
        to: "/qr-codes",
        roles: ["admin", "manager"],
        order: 33,
        icon: "fas fa-pager",
        children: {
            qrcode: {
                phrase: "QR Codes",
                to: "/qr-codes",
                roles: ["admin", "manager"],
                order: 1,
                icon: "fas fa-pager",
            },
            bulkprinting: {
                phrase: "Bulk Printing",
                to: "/bulk-printing",
                roles: ["admin", "manager"],
                order: 2,
                icon: "fas fa-print",
            },
        },
    },

    buttons: {
        phrase: "IoT Buttons",
        to: "/buttons",
        roles: ["admin", "manager", "supervisor"],
        order: 31,
        icon: "fas fa-stop",
    },

    internal_venues: {
        phrase: "Internal Venues",
        to: "/internal-venues",
        roles: ["admin", "manager"],
        order: 32,
        icon: "fas fa-building",
    },

    submit_ticket: {
        phrase: "Submit Ticket",
        to: "/submit-ticket",
        roles: ["admin", "manager", "supervisor"],
        order: 152,
        icon: "fas fa-question-circle",
    },
    entity: {
        phrase: "Branch",
        order: 102,
        to: "/owner",
        hide: true,
        roles: ["admin", "manager"],
        children: {
            person: {
                phrase: "Users",
                order: 1,
                hide: true,
                roles: ["admin", "manager"],
            },
            branch: {
                phrase: "Branch",
                order: 1,
                hide: false,
                to: "/owner/branches",
                roles: ["admin", "manager"],
            },
            company: {
                phrase: "Company",
                order: 3,
                hide: true,
                roles: ["admin", "manager"],
            },
        },
    },
    setting: {
        phrase: "Settings",
        to: "/settings",
        roles: ["admin", "manager"],
        order: 100,
        icon: "fas fa-cogs",
    },
    user: {
        _tag: "CSidebarNavDropdown",
        name: "User",
        order: 27,
        phrase: "User",
        to: "/users",
        hide: true,
        icon: "fas fa-user",
        children: {
            user_extended: {
                name: "user_extended",
                phrase: "Users List",
                icon: "fas fa-list",
                to: "/users-extended",
            },
            user: {
                hide: true,
            },
            permission: {
                _tag: "CSidebarNavItem",
                name: "Permissions",
                phrase: "permissions",
                icon: "fas fa-list",
                to: "/users/permissions",
                hide: true,
            },
            role: {
                _tag: "CSidebarNavItem",
                name: "Roles",
                phrase: "roles",
                icon: "fas fa-list",
                to: "/users/roles",
                hide: true,
            },
        },
    },

    watches: {
        name: "Watches",
        order: 34,
        phrase: "Watches",
        roles: ["admin", "manager"],
        to: "/watches",
        hide: false,
        icon: "fas fa-stopwatch"
    },
    promotion: {
        phrase: "Site Content",
        to: "/promotions",
        roles: ["admin", "manager"],
        order: 35,
        icon: "fas fa-ad",
        children: {
            categories: {
                name: "categories",
                phrase: "Categories",
                order: 0,
                to: "/categories",
                roles: ["admin", "manager"],
                icon: "fas fa-box",
            },
            sections: {
                phrase: "Promotions",
                order: 1,
                to: "/promotions",
                roles: ["admin", "manager"],
                icon: "fas fa-bullhorn",
            },
            style: {
                phrase: "Style",
                order: 2,
                to: "/style",
                roles: ["admin", "manager"],
                icon: "fas fa-brush",
            },
            sort: {
                phrase: "Sort Categories",
                order: 3,
                to: "/categories/sort",
                roles: ["admin", "manager"],
                icon: "fas fa-sort",
            },
        },
    },


    //SUPERVISOR NAV

    manage_app: {
        _tag: "CSidebarNavDropdown",
        name: "manage_app",
        order: 10,
        phrase: "Manage App",
        to: "/users",
        roles: ["supervisor"],
        icon: "fas fa-mobile",
        children: {
            teams: {
                phrase: "Teams",
                order: 1,
                to: "/teams",
                roles: ["admin", "manager", "supervisor"],
                icon: "fas fa-users",
            },
        },
    },

    customer_management: {
        _tag: "CSidebarNavDropdown",
        name: "customer_management",
        order: 11,
        phrase: "Customer Management",
        to: "/calls",
        roles: ["admin", "manager", "supervisor"],
        icon: "fas fa-headset",
        children: {
            customer_calls: {
                phrase: "Customer Calls",
                order: 1,
                to: "/calls",
                roles: ["admin", "manager", "supervisor"],
                icon: "fas fa-phone-square-alt",
            },
            internal_calls: {
                _tag: "CSidebarNavDropdown",
                name: "internal_calls",
                order: 2,
                phrase: "Internal Calls",
                to: "/internal",
                roles: ["admin", "manager", "supervisor"],
                icon: "fas fa-tty",
            },
        },
    },

    //Staff Nav

    profile: {
        phrase: "Profile",
        name: "profile",
        order: 15,
        to: "/profile",
        icon: "fas fa-users",
        roles: ["staff"],
    },
    calls: {
        phrase: "Calls",
        name: "calls",
        order: 16,
        to: "/user-calls",
        icon: "fas fa-phone-square-alt",
        roles: ["staff"],
    },
};

export default nav;