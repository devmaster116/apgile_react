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
import ExtendCompanyAdd from "./../components/ExtendCompany/Add";

import ShiftAdd from "./../components/Shift/Add";
import ShiftsList from "./../components/Shift/List";

import RoasterAdd from "./../components/Roaster/Add";
import RoasterList from "./../components/Roaster/List";

import CompanyPackageList from "./../components/Company Package/List";
import CompanyPackageAdd from "./../components/Company Package/Add";


const AddPromotions = React.lazy(() => import('./../components/Promotion/Add'));
const PromotionsList = React.lazy(() => import('./../components/Promotion/List'));


const routes = [
	{ path: '/dashboard', name: 'Dashboard', component: Dashboard, isPublic: false },

	{ path: '/owner/items', exact: true, name: 'Terms', component: ItemsList, isPublic: true },
	{ path: '/owner/items/add', exact: true, name: 'Add', component: ItemAdd },
	{ path: '/areas/:id/edit', exact: true, name: 'Edit', component: ItemAdd },
	{ path: '/owner/items/:id/details', exact: true, name: 'Edit', component: ItemDetail },

	{ path: '/owner/locations', exact: true, name: 'Terms', component: LocationsList, isPublic: true },
	{ path: '/owner/locations/add', exact: true, name: 'Add', component: LocationsAdd },
	{ path: '/locations/:id/edit', exact: true, name: 'Edit', component: LocationsAdd },
	{ path: '/owner/locations/:id/details', exact: true, name: 'Edit', component: LocationsDetail },

	{ path: '/owner/teams', exact: true, name: 'Terms', component: TeamsList, isPublic: true },
	{ path: '/owner/teams/add', exact: true, name: 'Add', component: TeamsAdd },
	{ path: '/teams/:id/edit', exact: true, name: 'Edit', component: TeamsAdd },
	{ path: '/owner/teams/:id/details', exact: true, name: 'Edit', component: TeamsDetail},


	{path : "/promotions" ,exact : true , component :PromotionsList},
	{path : "/promotions/add" ,exact : true , component : AddPromotions},
	{path : "/promotions/:id/edit" ,exact : true , component : AddPromotions},

	// {path : "/pages" ,exact : true , component : PagesList},
	{path : "/pages/page/add" ,exact : true , component : PageAdd},
	{path : "/pages/:id/edit" ,exact : true , component : PageAdd},
	{path : "/pages/:id/details" ,exact : true , component : PageDetails},
	{path : "/pages/page" ,exact : true , component : PagesList},
	
	// {path : "/promotions/:id/edit" ,exact : true , component : PageAdd},

	{path : "/calls" ,exact : true , component : CallList},
	{ path: '/callS/:id/details', exact: true, name: 'Edit', component: CallDetail },

	{path : "/pages/styles" ,exact : true , component : StylesList},
	{ path: '/pages/styles/add', exact: true, name: 'Add', component: StyleAdd },
	{ path: '/styles/:id/edit', exact: true, name: 'Add', component: StyleAdd },



	{ path: '/entity/branches/add', exact: true, name: 'Add', component: ExtendBranchAdd },
	{ path: '/entity/branches/:id/edit', exact: true, name: 'Edit', component: ExtendBranchAdd },

	{ path: '/entity/companies/add', exact: true, name: 'Add', component: ExtendCompanyAdd },
	{ path: '/entity/companies/:id/edit', exact: true, name: 'Edit', component: ExtendCompanyAdd },

	{path : "/owner/shifts" ,exact : true , component : ShiftsList},
	{path : "/shifts/add" ,exact : true , component : ShiftAdd},
	{path : "/shifts/:id/edit" ,exact : true , component : ShiftAdd},


	{path : "/owner/roasters" ,exact : true , component : RoasterList},
	{path : "/owner/roasters/add" ,exact : true , component : RoasterAdd},
	{path : "/rosters/:id/edit" ,exact : true , component : RoasterAdd},

	{path : "/company-setup" ,exact : true , component : CompanyPackageList},
	{path : "/company-setup/add" ,exact : true , component : CompanyPackageAdd},
	{path : "/company-setups/:id/edit" ,exact : true , component : CompanyPackageAdd},

	
	

	
];

export default routes;
