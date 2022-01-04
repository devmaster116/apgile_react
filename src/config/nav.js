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
	}
};