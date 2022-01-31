import Dashboard from "./../components/Dashboard";
import ProfileList from "./../components/Profile/List";

import CompanyBranchList from "../components/CompanyBranch/List";
import CompanyBranchAdd from "../components/CompanyBranch/Add";

import UserList from "./../components/Users/List";
import UserAdd from "./../components/Users/Add";

import TeamsList from "./../components/Teams/List";
import TeamsAdd from "./../components/Teams/Add";

import ShiftsList from "./../components/Shift/List";
import ShiftAdd from "./../components/Shift/Add";


import RoastersList from "./../components/Roaster/List";
import RoasterAdd from "./../components/Roaster/Add";

import LocationsList from "./../components/Locations/List";
import LocationAdd from "./../components/Locations/Add";

import ItemsList from "./../components/Items/List";
import ItemAdd from "./../components/Items/Add";

import AreasList from "./../components/Area/List";
import AreaAdd from "./../components/Area/Add";

import PagesList from "./../components/Pages/List";
import PageAdd from "./../components/Pages/Add";

import StaffList from "./../components/Staff/List";
import StaffAdd from "./../components/Staff/Add";

import ValidateAsOwner from "./../components/ValidateAsOwner";


import SettingList from "./../components/Settings/List";
import SettingAdd from "./../components/Settings/Add";

import CallsList from "./../components/Calls/List";



const routes = [
	
	{ path: '/dashboard', name: 'Dashboard', component: Dashboard, isPublic: false,},
	{ path: '/profiles/profile-list', exact : true,component: ProfileList,isPublic: false},
	
	{ path: '/owner/branches', exact : true,component: CompanyBranchList,isPublic: false},
	{ path: '/owner/branches/add', exact : true,component: CompanyBranchAdd,isPublic: false},
	{ path: '/branches/10/all/15/edit', exact : true,component: CompanyBranchAdd,isPublic: false},
	
	{ path: '/users-extended', exact : true,component: UserList,isPublic: false},
	{ path: '/users/add', exact : true,component: UserAdd,isPublic: false},
	{ path: '/users/:id/edit', exact : true,component: UserAdd,isPublic: false},


	{ path: '/teams', exact : true,component: TeamsList,isPublic: false},
	{ path: '/teams/add', exact : true,component: TeamsAdd,isPublic: false},
	{ path: '/teams/:id/edit', exact : true,component: TeamsAdd,isPublic: false},

	{ path: '/shifts', exact : true,component: ShiftsList,isPublic: false},
	{ path: '/shifts/add', exact : true,component: ShiftAdd,isPublic: false},
	{ path: '/shifts/:id/edit', exact : true,component: ShiftAdd,isPublic: false},

	{ path: '/roasters', exact : true,component: RoastersList,isPublic: false},
	{ path: '/roasters/add', exact : true,component: RoasterAdd,isPublic: false},
	{ path: '/roasters/:id/edit', exact : true,component: RoasterAdd,isPublic: false},

	
	{ path: '/locations', exact : true,component: LocationsList,isPublic: false},
	{ path: '/locations/add', exact : true,component: LocationAdd,isPublic: false},
	{ path: '/locations/:id/edit', exact : true,component: LocationAdd,isPublic: false},


	{ path: '/items', exact : true,component: ItemsList,isPublic: false},
	{ path: '/items/add', exact : true,component: ItemAdd,isPublic: false},
	{ path: '/items/:id/edit', exact : true,component: ItemAdd,isPublic: false},

	{ path: '/areas', exact : true,component: AreasList,isPublic: false},
	{ path: '/areas/add', exact : true,component: AreaAdd,isPublic: false},
	{ path: '/areas/:id/edit', exact : true,component: AreaAdd,isPublic: false},

	{ path: '/qr-codes', exact : true,component: PagesList,isPublic: false},
	{ path: '/qr-codes/add', exact : true,component: PageAdd,isPublic: false},
	{ path: '/qr-codes/:id/edit', exact : true,component: PageAdd,isPublic: false},
	

	{ path: '/staff', exact : true,component: StaffList,isPublic: false},
	{ path: '/staff/add', exact : true,component: StaffAdd,isPublic: false},
	{ path: '/staff/:id/edit', exact : true,component: StaffAdd,isPublic: false},

	{ path: '/setting', exact : true,component: SettingList,isPublic: false},
	{ path: '/setting/add', exact : true,component: SettingAdd,isPublic: false},
	{ path: '/branch-settings/:id/edit', exact : true,component: SettingAdd,isPublic: false},

	{ path: '/calls', exact : true,component: CallsList,isPublic: false},

	{path : "/validateAsOwner/:token" ,exact : true ,component : ValidateAsOwner,isPublic:true},

	
];

export default routes;
