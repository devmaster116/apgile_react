export default {
  Persons: {
    _tag: "CSidebarNavItem",
    name: "Persons",
    phrase: "Users",
    to: "/dummy",
    order: 9,
    icon: "fas fa-landmark",
    children: {
      add_user: {
        _tag: "CSidebarNavItem",
        name: "add_user",
        phrase: "Add User",
        to: "/add-user",
        order: 1,
        icon: "fas fa-plus-circle",
      },
      users_list: {
        _tag: "CSidebarNavItem",
        name: "users_list",
        phrase: "Users List",
        to: "/users",
        order: 2,
        icon: "fas fa-table",
      },
    },   
  },
};
