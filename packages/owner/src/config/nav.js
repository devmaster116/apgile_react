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
  profile: {
    phrase: "Profile",
    order: 100,
    to:'/profiles',
    icon: "fas fa-user",
    children:{
      profile_list:{
        phrase: "Profiles List",
        to:'/profiles/profile-list',
        icon:"fas fa-users"
      }
    }
  },
  entity: {
    phrase: "Branch",
    order: 102,
    to:"/entity/branches",
    children: {
      person: {
        phrase: "Users",
        order: 1,
       hide:true,
      },
      branch: {
        phrase: "Branch",
        order:1,
        hide:false,
      },
      company: {
        phrase: "Company",
        order:3,
        hide:true,
      },
     
    },
  },


  location: {
    phrase: "Locations",
    order: 110,
    icon: "fas fa-map-marker-alt",
    to: "/locations",
  },
  calls: {
    phrase: "Calls",
    to: "/calls",
    order: 115,
    icon: "fas fa-phone-square-alt",
  },
  promotions: {
    phrase: "Promotions",
    to: "/promotions",
    order: 120,
    // roles:['super-admin','staff-admin'],
    icon: "fas fa-ad",
  },
  pages: {
    phrase: "Pages",
    order: 130,
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