export default {
  Promotion: {
    _tag: "CSidebarNavItem",
    name: "Promotion",
    phrase: "Promotion",
    to: "/dummy",
    order: 11,
    icon: "fas fa-landmark",
    children: {
      add_promotion: {
        _tag: "CSidebarNavItem",
        name: "add_promotion",
        phrase: "Add User",
        to: "/add-promotion",
        order: 1,
        icon: "fas fa-plus-circle",
      },
      promotions_list: {
        _tag: "CSidebarNavItem",
        name: "promotions_list",
        phrase: "Promotions List",
        to: "/promotions",
        order: 2,
        icon: "fas fa-table",
      },
    },   
  },
};
