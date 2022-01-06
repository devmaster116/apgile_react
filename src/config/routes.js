import React from "react";
import Dashboard from "./../components/Dashboard";

import LocationsAdd from "./../components/Locations/Add";
import LocationsDetail from "./../components/Locations/Detail";
import LocationsList from "./../components/Locations/List";

import TeamsAdd from "./../components/Teams/Add";
import TeamsDetail from "./../components/Teams/Detail";
import TeamsList from "./../components/Teams/List";

import PageAdd from "./../components/Pages/Add";

import CallList from "./../components/Calls/List";
import CallDetail from "./../components/Calls/Detail";

import StyleAdd from "./../components/Styles/Add";
import StylesList from "./../components/Styles/List";

import ExtendBranchAdd from "./../components/ExtendBranch/Add";
import ExtendCompanyAdd from "./../components/ExtendCompany/Add";


const AddPromotions = React.lazy(() => import('./../components/Promotion/Add'));
const PromotionsList = React.lazy(() => import('./../components/Promotion/List'));


const routes = [
	{ path: '/dashboard', name: 'Dashboard', component: Dashboard, isPublic: false },

	{ path: '/owner/locations', exact: true, name: 'Terms', component: LocationsList, isPublic: true },
	{ path: '/owner/locations/add', exact: true, name: 'Add', component: LocationsAdd },
	{ path: '/owner/locations/:id/edit', exact: true, name: 'Edit', component: LocationsAdd },
	{ path: '/owner/locations/:id/details', exact: true, name: 'Edit', component: LocationsDetail },

	{ path: '/owner/teams', exact: true, name: 'Terms', component: TeamsList, isPublic: true },
	{ path: '/owner/teams/add', exact: true, name: 'Add', component: TeamsAdd },
	{ path: '/owner/teams/:id/edit', exact: true, name: 'Edit', component: TeamsAdd },
	{ path: '/owner/teams/:id/details', exact: true, name: 'Edit', component: TeamsDetail },


	{path : "/add-promotion" ,exact : true , component : AddPromotions},
	{path : "/promotions" ,exact : true , component : PromotionsList},
	{path : "/promotions/:id/edit" ,exact : true , component : AddPromotions},

	// {path : "/pages" ,exact : true , component : PagesList},
	{path : "/pages/page" ,exact : true , component : PageAdd},
	// {path : "/promotions/:id/edit" ,exact : true , component : PageAdd},

	{path : "/calls" ,exact : true , component : CallList},
	{ path: '/callS/:id/details', exact: true, name: 'Edit', component: CallDetail },

	{path : "/pages/styles" ,exact : true , component : StyleAdd},
	{ path: '/pages/styles/add', exact: true, name: 'Add', component: StylesList },


	{ path: '/entity/branches/add', exact: true, name: 'Add', component: ExtendBranchAdd },
	{ path: '/entity/branches/:id/edit', exact: true, name: 'Edit', component: ExtendBranchAdd },

	{ path: '/entity/companies/add', exact: true, name: 'Add', component: ExtendCompanyAdd },
	{ path: '/entity/companies/:id/edit', exact: true, name: 'Edit', component: ExtendCompanyAdd },

];

export default routes;
