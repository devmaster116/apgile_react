import React from "react";
import Dashboard from "./../components/Dashboard";

import LocationsAdd from "./../components/Locations/Add";
import LocationsDetail from "./../components/Locations/Detail";
import LocationsList from "./../components/Locations/List";

import ItemAdd from "./../components/Items/Add";
import ItemDetail from "./../components/Items/Detail";
import ItemsList from "./../components/Items/List";

import TeamsAdd from "./../components/Teams/Add";
import TeamsDetail from "./../components/Teams/Detail";
import TeamsList from "./../components/Teams/List";

import PageAdd from "./../components/Pages/Add";
import PageDetails from "./../components/Pages/Detail"

import CallList from "./../components/Calls/List";
import CallDetail from "./../components/Calls/Detail";

import StyleAdd from "./../components/Styles/Add";
import StylesList from "./../components/Styles/List";

import PagesList from "./../components/Pages/List";
import ExtendBranchAdd from "./../components/ExtendBranch/Add";
import ExtendBranchList from "./../components/ExtendBranch/List";


import CompanyList from "./../components/ExtendCompany/List";
import CompanyAdd from "./../components/ExtendCompany/Add";
import CompanyDetail from "./../components/ExtendCompany/Detail";

import ShiftAdd from "./../components/Shift/Add";
import ShiftsList from "./../components/Shift/List";

import RoasterAdd from "./../components/Roaster/Add";
import RoasterList from "./../components/Roaster/List";

import CompanyPackageList from "./../components/Company Package/List";
import CompanyPackageAdd from "./../components/Company Package/Add";

import AreaAdd from "./../components/Area/Add";
import AreaList from "./../components/Area/List";

import UserAdd from "./../components/ExtendedUser/Add";

const AddPromotions = React.lazy(() => import('./../components/Promotion/Add'));
const PromotionsList = React.lazy(() => import('./../components/Promotion/List'));


const routes = [
	{ path: '/dashboard', name: 'Dashboard',  roles:['super-admin'],component: Dashboard, isPublic: false },

	{ path: '/owner/items', exact: true, name: 'Terms',  roles:['super-admin'],component: ItemsList, isPublic: true },
	{ path: '/owner/items/add', exact: true, name: 'Add',  roles:['super-admin'],component: ItemAdd },
	{ path: '/items/:id/edit', exact: true, name: 'Edit',  roles:['super-admin'],component: ItemAdd },
	{ path: '/owner/items/:id/details', exact: true, name: 'Edit',  roles:['super-admin'],component: ItemDetail },

	{ path: '/owner/locations', exact: true, name: 'Terms',  roles:['super-admin'],component: LocationsList, isPublic: true },
	{ path: '/owner/locations/add', exact: true, name: 'Add',  roles:['super-admin'],component: LocationsAdd },
	{ path: '/locations/:id/edit', exact: true, name: 'Edit',  roles:['super-admin'],component: LocationsAdd },
	{ path: '/owner/locations/:id/details', exact: true, name: 'Edit',  roles:['super-admin'],component: LocationsDetail },

	{ path: '/owner/teams', exact: true, name: 'Terms',  roles:['super-admin'],component: TeamsList, isPublic: true },
	{ path: '/owner/teams/add', exact: true, name: 'Add',  roles:['super-admin'],component: TeamsAdd },
	{ path: '/teams/:id/edit', exact: true, name: 'Edit',  roles:['super-admin'],component: TeamsAdd },
	{ path: '/owner/teams/:id/details', exact: true, name: 'Edit',  roles:['super-admin'],component: TeamsDetail},


	{path : "/promotions" ,exact : true ,  roles:['super-admin'],component :PromotionsList},
	{path : "/promotions/add" ,exact : true ,  roles:['super-admin'],component : AddPromotions},
	{path : "/promotions/:id/edit" ,exact : true ,  roles:['super-admin'],component : AddPromotions},

	// {path : "/pages" ,exact : true , component : PagesList},
	{path : "/pages/page/add" ,exact : true ,  roles:['super-admin'],component : PageAdd},
	{path : "/pages/:id/edit" ,exact : true ,  roles:['super-admin'],component : PageAdd},
	{path : "/pages/:id/details" ,exact : true ,  roles:['super-admin'],component : PageDetails},
	{path : "/pages/qr-codes" ,exact : true ,  roles:['super-admin'],component : PagesList},

	{path : "/pages/area" ,exact : true ,  roles:['super-admin'],component : AreaList},
	{path : "/areas/:id/edit" ,exact : true ,  roles:['super-admin'],component : AreaAdd},
	// {path : "/pages/:id/details" ,exact : true ,  roles:['super-admin'],component : PageDetails},
	{path : "/pages/area/add" ,exact : true ,  roles:['super-admin'],component : AreaAdd},


	// {path : "/promotions/:id/edit" ,exact : true , component : PageAdd},

	{path : "/calls" ,exact : true ,  roles:['super-admin'],component : CallList},
	{ path: '/callS/:id/details', exact: true, name: 'Edit',  roles:['super-admin'],component: CallDetail },

	{path : "/owner/styles" ,exact : true ,  roles:['super-admin'],component : StylesList},
	{ path: '/owner/styles/add', exact: true, name: 'Add',  roles:['super-admin'],component: StyleAdd },
	{ path: '/styles/:id/edit', exact: true, name: 'Add',  roles:['super-admin'],component: StyleAdd },


	{ path: '/entity/branches', exact: true, name: 'List',  roles:['super-admin'],component: ExtendBranchList },
	{ path: '/entity/branches/add', exact: true, name: 'Add',  roles:['super-admin'],component: ExtendBranchAdd },
	{ path: '/branches/:id/edit', exact: true, name: 'Edit',  roles:['super-admin'],component: ExtendBranchAdd },

	{ path: '/admin/companies', exact: true,  roles:['super-admin'],component: CompanyList },
	{ path: '/admin/company/add', exact: true, roles:['super-admin'],component: CompanyAdd },
	{ path: '/admin/company/:id/edit', exact: true, roles:['super-admin'],component: CompanyAdd },
	{ path: '/admin/company/:id/details', exact: true, roles:['super-admin'], component: CompanyDetail },


	{path : "/owner/shifts" ,exact : true ,  roles:['super-admin'],component : ShiftsList},
	{path : "/shifts/add" ,exact : true ,  roles:['super-admin'],component : ShiftAdd},
	{path : "/shifts/:id/edit" ,exact : true ,  roles:['super-admin'],component : ShiftAdd},


	{path : "/owner/roasters" ,exact : true ,  roles:['super-admin'],component : RoasterList},
	{path : "/owner/roasters/add" ,exact : true ,  roles:['super-admin'],component : RoasterAdd},
	{path : "/rosters/:id/edit" ,exact : true ,  roles:['super-admin'],component : RoasterAdd},

	{path : "/company-setup" ,exact : true ,  roles:['super-admin'], component : CompanyPackageList},
	{path : "/company-setup/add" ,exact : true ,  roles:['super-admin'], component : CompanyPackageAdd},
	{path : "/company-setups/:id/edit" ,exact : true ,  roles:['super-admin'], component : CompanyPackageAdd},

	{path : "/users/add" ,exact : true ,  roles:['super-admin'],component : UserAdd},




];

export default routes;
