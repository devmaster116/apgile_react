export default {
	dashboard: {
		phrase: 'Dashboard',
		to: '/dashboard',
		order: 10,
		icon: 'fas fa-tachometer-alt',
		badge: {
			color: 'info',
			text: 'NEW'
		}
	},

	entity: {
		phrase:"Entity",
		order: 20,
		children:{
			branch: {
				phrase: 'Branch',
				order:1,
				name:"branch",
				icon: 'fas fa-list',
				to: '/entity/branches'
			},
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
				phrase: 'Locations',
				order:1,
				icon: 'fas fa-list',
				to: '/owner/locations'
			},
			team: {
				phrase: 'Teams',
				order:2,
				icon: 'fas fa-list',
				to: '/owner/teams'
			}
		}
	},
	customer: {
		hide:true
	},
	user: {
		hide:true
	},
	Promotion: {
		phrase: "Promotion",
		to: "/promotions",
		order: 130,
		icon: "fas fa-landmark",
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
			to:"/pages/page",
		      },
		   styles: {
			   phrase:"Styles",
			   to:"/pages/styles",
		   }
	}
}
};