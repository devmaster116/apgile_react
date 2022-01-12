import Dashboard from "./../components/Dashboard";
import ProfileList from "./../components/Profile/List";
const routes = [
	{ path: '/dashboard', name: 'Dashboard', component: Dashboard, isPublic: false },
	{ path: '/profiles/profile-list', exact : true,component: ProfileList},

];

export default routes;
