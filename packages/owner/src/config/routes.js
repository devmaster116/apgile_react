import React from "react";

import Dashboard from "./../components/Dashboard";
import Analytics from "./../components/Analytics";

import ProfileDetail from "./../components/Profile/Detail";
import StaffCalls from "./../components/Profile/Calls";

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
import StaffDetail from "./../components/Staff/Detail";

import ValidateAsOwner from "./../components/ValidateAsOwner";


import SettingAdd from "./../components/Settings/Add";
import InternalCalls from "../components/InternalCalls/InternalCallsPlaces";

import CallsList from "./../components/Calls/List";
import KitchenCalls from "./../components/KitchenCalls/List";
import CallAssigned from "./../components/Calls/Add";
import CallDetail from "./../components/Calls/Detail";

import CategoriesList from "./../components/PromotionCategories/List";
import CategoriesAdd from "./../components/PromotionCategories/Add";

import WatchesList from "./../components/Watches/List";
import WatchesAdd from "./../components/Watches/Add";


import StyleAdd from "./../components/Styles/Add";

import KitchenCallAdd from "./../components/KitchenCalls/Add";

import mirageRoute from "../components/MirageRoute";
import OrderItemList from "../components/OrderItem/List";
import OrderItemAdd from "../components/OrderItem/Add";
import ReservationList from "../components/Reservation/List";
import ReservationAdd from "../components/Reservation/Add";

const AddPromotions = React.lazy(() => import('./../components/Promotion/Add'));
const PromotionsList = React.lazy(() => import('./../components/Promotion/List'));


const routes = [

	{ path: '/', exact : true, component: Dashboard, roles:['admin', 'manager','staff'], isPublic: false,},
	{ path: '/dashboard', exact : true, component: Dashboard, roles:['admin', 'manager','staff'], isPublic: false,},
	{ path: '/analytics', exact : true,name: 'Analytics',roles:['admin', 'manager','staff'], component: Analytics, isPublic: false,},

	{ path: '/profile', exact : true,component: ProfileDetail,isPublic: false},
	{ path: '/user-calls', exact : true,component: StaffCalls,isPublic: false},

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
	{ path: '/rosters/:id/edit', exact : true,component: RoasterAdd,isPublic: false},


	{ path: '/locations', exact : true,component: LocationsList,isPublic: false},
	{ path: '/locations/add', exact : true,component: LocationAdd,isPublic: false},
	{ path: '/locations/:id/edit', exact : true,component: LocationAdd,isPublic: false},


	{ path: '/order-items', exact : true,component: OrderItemList,isPublic: false},
	{ path: '/order-items/add', exact : true,component: OrderItemAdd,isPublic: false},
	{ path: '/order-items/:id/edit', exact : true,component: OrderItemAdd,isPublic: false},


	{ path: '/items', exact : true,component: ItemsList,isPublic: false},
	{ path: '/items/add', exact : true,component: ItemAdd,isPublic: false},
	{ path: '/items/:id/edit', exact : true,component: ItemAdd,isPublic: false},

	{ path: '/reservations', exact : true,component: ReservationList,isPublic: false},
	{ path: '/reservations/add', exact : true,component: ReservationAdd,isPublic: false},
	{ path: '/reservations/:id/edit', exact : true,component: ReservationAdd,isPublic: false},

	{ path: '/areas', exact : true,component: AreasList,isPublic: false},
	{ path: '/areas/add', exact : true,component: AreaAdd,isPublic: false},
	{ path: '/areas/:id/edit', exact : true,component: AreaAdd,isPublic: false},

	{ path: '/qr-codes', exact : true,component: PagesList,isPublic: false},
	{ path: '/qr-codes/add', exact : true,component: PageAdd,isPublic: false},
	{ path: '/qr-codes/:id/edit', exact : true,component: PageAdd,isPublic: false},


	{ path: '/staff', exact : true,component: StaffList,isPublic: false},
	{ path: '/staff/add', exact : true,component: StaffAdd,isPublic: false},
	{ path: '/staff/:id/edit', exact : true,component: StaffAdd,isPublic: false},
	{ path: '/staff/:id/details', exact : true,component: StaffDetail,isPublic: false},

	{ path: '/settings', exact : true,component: SettingAdd,isPublic: false},
	{ path: '/internal-venues', exact : true,component: InternalCalls,isPublic: false},

	{path : "/promotions" ,exact : true ,component :PromotionsList},
	{path : "/promotions/add" ,exact : true ,component : AddPromotions},
	{path : "/promotions/:id/edit" ,exact : true ,component : AddPromotions},


	{path : "/style" ,exact : true ,component : StyleAdd},


	{path : "/categories" ,exact : true ,component :CategoriesList},
	{path : "/categories/add" ,exact : true ,component :CategoriesAdd},
	{path : "/categories/:id/edit" ,exact : true ,component :CategoriesAdd},


	{path : "/watches" ,exact : true ,component :WatchesList},
	// {path : "/watches/add" ,exact : true ,component :WatchesAdd},
	{path : "/watches/:id/edit" ,exact : true ,component :WatchesAdd},


	{ path: '/calls', exact : true,component: CallsList,isPublic: false},

	{ path: '/add-internal', exact : true,component: KitchenCallAdd,isPublic: false},

	{ path: '/internal', exact : true,component: KitchenCalls,isPublic: false},

	{ path: '/calls/:id/edit', exact : true,component:CallAssigned ,isPublic: false},
	{ path: '/calls/:id/details', exact : true,component:CallDetail ,isPublic: false},

	{ path: '/mirageRoute', exact : true,component:mirageRoute ,isPublic: false},


	{path : "/validateAsOwner/:token" ,exact : true ,component : ValidateAsOwner,isPublic:true},


];

export default routes;
