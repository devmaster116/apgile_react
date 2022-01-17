export default {
  dashboard: {
    phrase: "Dashboard",
    to: "/dashboard",
    order: 10,
    roles: ["admin"],
    icon: "fas fa-tachometer-alt",
    badge: {
      color: "info",
      text: "NEW",
    },
  },
  profile: {
    phrase: "Profile",
    order: 100,
    to: "/profiles",
    icon: "fas fa-user",
    roles: ["admin"],
    children: {
      profile_list: {
        phrase: "Profiles List",
        to: "/profiles/profile-list",
        icon: "fas fa-users",
        roles: ["admin"],
      },
    },
  },
  entity: {
    phrase: "Branch",
    order: 102,
    to: "/owner",
    roles: ["admin"],
    children: {
      person: {
        phrase: "Users",
        order: 1,
        hide: true,
        roles: ["admin"],
      },
      branch: {
        phrase: "Branch",
        order: 1,
        hide: false,
        to: "/owner/branches",
        roles: ["admin"],
      },
      company: {
        phrase: "Company",
        order: 3,
        hide: true,
        roles: ["admin"],
      },
    },
  },

  location: {
    phrase: "Locations",
    order: 110,
    icon: "fas fa-map-marker-alt",
    to: "/locations",
    roles: ["admin"],
  },
  calls: {
    phrase: "Calls",
    to: "/calls",
    order: 115,
    roles: ["admin"],
    icon: "fas fa-phone-square-alt",
  },
  promotions: {
    phrase: "Promotions",
    to: "/promotions",
    order: 120,
    roles: ["admin"],
    // roles:['super-admin','staff-admin'],
    icon: "fas fa-ad",
  },
  pages: {
    phrase: "Pages",
    order: 130,
    to: "/pages",
    icon: "fas fa-pager",
    roles: ["admin"],
    children: {
      page: {
        phrase: "Pages",
        to: "/pages/page",
        icon: "fas fa-pager",
        roles: ["admin"],
      },
      styles: {
        phrase: "Styles",
        to: "/pages/styles",
        icon: "fas fa-broom",
        roles: ["admin"],
      },
    },
  },
};
