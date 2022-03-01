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
import CallAssigned from "./../components/Calls/Add";
import CallDetail from "./../components/Calls/Detail";

import StyleAdd from "./../components/Styles/Add";
import StylesList from "./../components/Styles/List";
import StylesDetail from "./../components/Styles/Detail";

import PagesList from "./../components/Pages/List";
import ExtendBranchAdd from "./../components/ExtendBranch/Add";
import ExtendBranchList from "./../components/ExtendBranch/List";
import ExtendBranchDetail from "./../components/ExtendBranch/Detail";


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

import CategoriesList from "./../components/PromotionCategories/List";
import CategoriesAdd from "./../components/PromotionCategories/Add";

import UserAdd from "./../components/ExtendedUser/Add";
import UserList from "./../components/ExtendedUser/List";
import UserDetail from "./../components/ExtendedUser/Detail";

const AddPromotions = React.lazy(() => import('./../components/Promotion/Add'));
const PromotionsList = React.lazy(() => import('./../components/Promotion/List'));


const routes = [

	{ path: '/', exact : true, component: Dashboard, roles:['super-admin'], isPublic: false,},
	{ path: '/dashboard', exact : true, name: 'Dashboard', roles:['super-admin'], component: Dashboard, isPublic: false,},

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


	{path : "/categories" ,exact : true ,component :CategoriesList},
	{path : "/categories/add" ,exact : true ,component :CategoriesAdd},
	{path : "/categories/:id/edit" ,exact : true ,component :CategoriesAdd},

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
	{ path: '/calls/:id/details', exact: true, name: 'Edit',  roles:['super-admin'],component: CallDetail },
	{ path: '/calls/:id/assigned', exact: true, name: 'Edit',  roles:['super-admin'],component: CallAssigned },

	{path : "/owner/styles" ,exact : true ,  roles:['super-admin'],component : StylesList},
	{ path: '/owner/styles/add', exact: true, name: 'Add',  roles:['super-admin'],component: StyleAdd },
	{ path: '/styles/:id/edit', exact: true,  roles:['super-admin'],component: StyleAdd },
	{ path: '/styles/:id/details', exact: true,  roles:['super-admin'],component: StylesDetail },



	{ path: '/entity/branches', exact: true, name: 'List',  roles:['super-admin'],component: ExtendBranchList },
	{ path: '/entity/branches/add', exact: true, name: 'Add',  roles:['super-admin'],component: ExtendBranchAdd },
	{ path: '/branches/:id/edit', exact: true,  roles:['super-admin'],component: ExtendBranchAdd },
	{ path: '/branches/:id/details', exact: true,  roles:['super-admin'],component: ExtendBranchDetail},

	{ path: '/admin/companies', exact: true,  roles:['super-admin'],component: CompanyList },
	{ path: '/admin/companies/add', exact: true, roles:['super-admin'],component: CompanyAdd },
	{ path: '/companies/:id/edit', exact: true, roles:['super-admin'],component: CompanyAdd },
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


	{path : "/owner/users" ,exact : true ,  roles:['super-admin'],component : UserList},
	{path : "/owner/users/add" ,exact : true ,  roles:['super-admin'],component : UserAdd},
	{path : "/users/:id/edit" ,exact : true ,  roles:['super-admin'],component : UserAdd},
	{path : "/users/:id/details" ,exact : true ,  roles:['super-admin'],component : UserDetail},






	// { path: '/staff', exact : true,roles:['admin'],component: StaffList},
	// { path: '/staff/add', exact : true,component: StaffAdd},
	// { path: '/staff/:id/edit', exact : true,component: StaffAdd},


	// { path: '/shifts', exact : true,component: AdminShiftsList,isPublic:false},
	// { path: '/shifts/add', exact : true,component: AdminShiftAdd,isPublic: false},
	// { path: '/shifts/:id/edit', exact : true,component: AdminShiftAdd,isPublic: false},

	// { path: '/teams', exact : true,component: AdminTeamsAdd,isPublic: false},
	// { path: '/teams/add', exact : true,component: AdminTeamsDetail,isPublic: false},
	// { path: '/teams/:id/edit', exact : true,component: AdminTeamsAdd,isPublic: false},

	// {path : "/roasters" ,exact : true ,component : RoasterList},
	// {path : "/roasters/add" ,exact : true,component : RoasterAdd},
	// {path : "/rosters/:id/edit" ,exact : true,component : RoasterAdd},

	// { path: '/locations', exact: true, name: 'Terms', component: LocationsList,},
	// { path: '/locations/add', exact: true, name: 'Add',component: LocationsAdd },
	// { path: '/locations/:id/edit', exact: true, name: 'Edit',component: LocationsAdd },
	// // { path: '/owner/locations/:id/details', exact: true, name: 'Edit',component: LocationsDetail },

	// { path: '/items', exact: true, name: 'Terms',component: ItemsList },
	// { path: '/items/add', exact: true, name: 'Add',component: ItemAdd },
	// { path: '/items/:id/edit', exact: true, name: 'Edit', component: ItemAdd },

	// {path : "/areas" ,exact : true ,component : AreaList},
	// {path : "/areas/:id/edit" ,exact : true ,component : AreaAdd},
	// // {path : "/pages/:id/details" ,exact : true ,  roles:['super-admin'],component : PageDetails},
	// {path : "/areas/add" ,exact : true ,component : AreaAdd},


	// { path: '/qr-codes', exact : true,component: PagesList,isPublic: false},
	// { path: '/qr-codes/add', exact : true,component: PageAdd,isPublic: false},
	// { path: '/qr-codes/:id/edit', exact : true,component: PageAdd,isPublic: false},

	// { path: '/setting', exact : true,component: SettingList,isPublic: false},
	// { path: '/setting/add', exact : true,component: SettingAdd,isPublic: false},
	// { path: '/branch-settings/:id/edit', exact : true,component: SettingAdd,isPublic: false},


];

export default routes;
