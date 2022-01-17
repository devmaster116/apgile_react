import Dashboard from "./../components/Dashboard";
import ProfileList from "./../components/Profile/List";
import ExtendedBranchList from "./../components/ExtendBranch/List";
import ExtendedBranchAdd from "./../components/ExtendBranch/Add";

const routes = [
	{ path: '/dashboard', name: 'Dashboard', component: Dashboard, isPublic: false,roles:['admin']},
	{ path: '/profiles/profile-list', exact : true,component: ProfileList,isPublic: false,roles:['admin']},
	{ path: '/owner/branches', exact : true,component: ExtendedBranchList,isPublic: false,roles:['admin']},
	{ path: '/owner/branches/add', exact : true,component: ExtendedBranchAdd,isPublic: false,roles:['admin']},

];

export default routes;
