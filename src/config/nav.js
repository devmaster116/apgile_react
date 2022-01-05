export default {
	dashboard: {
		_tag: 'CSidebarNavItem',
		name: 'Dashboard',
		phrase: 'dashboard',
		to: '/dashboard',
		order: 10,
		icon: 'fas fa-tachometer-alt',
		badge: {
			color: 'info',
			text: 'NEW'
		}
	},
	owner: {
		_tag: 'CSidebarNavDropdown',
		name: 'Location',
		phrase: 'location',
		to: '/owner',
		icon: 'fas fa-building',
		hasRoute: false,
		children: {
			location: {
				name: 'Locations',
				phrase: 'locations',
				icon: 'fas fa-list',
				to: '/owner/locations'
			},
			team: {
				name: 'Team',
				phrase: 'team',
				icon: 'fas fa-list',
				to: '/owner/teams'
			}
		}
	},
	customer: {
		children: {
			customerStatus: {
				hide: true
			},
			customerTypes: {
				hide: true
			}
		}
	},
	user: {
		children: {
			permission: {
				hide: true
			},
			role: {
				hide: true
			}
		}
	},
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
	staffs: {
		_tag: "CSidebarNavItem",
		name: "staffs",
		phrase: "User Test",
		to: "/dummy",
		order: 12,
		icon: "fas fa-landmark",
		children: {
			// add_promotion: {
			//   _tag: "CSidebarNavItem",
			//   name: "add_promotion",
			//   phrase: "Add User",
			//   to: "/add-promotion",
			//   order: 1,
			//   icon: "fas fa-plus-circle",
			// },
			staff_list: {
				_tag: "CSidebarNavItem",
				name: "staff_list",
				phrase: "Staff List",
				to: "/staffs",
				order: 1,
				icon: "fas fa-table",
			},
		},
	},
};