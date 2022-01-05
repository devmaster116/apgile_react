export default {
	dashboard: {
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
		phrase: 'Manage App',
		to: '/owner',
		order: 100,
		icon: 'fas fa-building',
		hasRoute: false,
		children: {
			location: {
				phrase: 'locations',
				order:1,
				icon: 'fas fa-list',
				to: '/owner/locations'
			},
			team: {
				phrase: 'team',
				order:2,
				icon: 'fas fa-list',
				to: '/owner/teams'
			}
		}
	},
	customer: {
		// children: {
		// 	customerStatus: {
		// 		hide: true
		// 	},
		// 	customerTypes: {
		// 		hide: true
		// 	}
		// }
		hide:true
	},
	user: {
		hide:true,
		// children: {
		// 	permission: {
		// 		hide: true
		// 	},
		// 	role: {
		// 		hide: true
		// 	}
		// }
	},
	Promotion: {
		phrase: "Promotion",
		to: "/dummy",
		order: 130,
		icon: "fas fa-landmark",
		children: {
			add_promotion: {
				phrase: "Add User",
				to: "/add-promotion",
				order: 1,
				icon: "fas fa-plus-circle",
			},
			promotions_list: {
				phrase: "Promotions List",
				to: "/promotions",
				order: 2,
				icon: "fas fa-table",
			},
		},
	},
	staffs: {
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
				phrase: "Staff List",
				to: "/staffs",
				order: 1,
				icon: "fas fa-table",
			},
		},
	},

	calls: {
		phrase: "Calls",
		to: "/calls",
		order: 115,
		icon: "fas fa-landmark",
	},
	pages : {
		phrase:"Pages",
		order:125,
		to:"/pages",
		icon:"fas fa-pager",
		children : {
		page:{
			phrase:"Pages",
			to:"/pages",
		      },
		   styles: {
			   phrase:"styles",
			   to:"/styles",
		   }
	}
}
};