import Dashboard from "./../components/Dashboard";
import ProfileList from "./../components/Profile/List";

import CompanyBranchList from "../components/CompanyBranch/List";
import CompanyBranchAdd from "../components/CompanyBranch/Add";

import UserList from "./../components/Users/List";
import UserAdd from "./../components/Users/Add";

const routes = [
	
	{ path: '/dashboard', name: 'Dashboard', component: Dashboard, isPublic: false,},
	{ path: '/profiles/profile-list', exact : true,component: ProfileList,isPublic: false},
	
	{ path: '/owner/branches', exact : true,component: CompanyBranchList,isPublic: false},
	{ path: '/owner/branches/add', exact : true,component: CompanyBranchAdd,isPublic: false},
	{ path: '/branches/10/all/15/edit', exact : true,component: CompanyBranchAdd,isPublic: false},
	
	{ path: '/users-extended', exact : true,component: UserList,isPublic: false},
	{ path: '/users/add', exact : true,component: UserAdd,isPublic: false},
	{ path: '/users/:id/edit', exact : true,component: UserAdd,isPublic: false},
	
];

export default routes;
