import React from "react";
import ValidateAsOwner from "./../components/ValidateAsOwner";

const Dashboard = React.lazy(() => import('./../components/Dashboard'));
const Analytics = React.lazy(() => import('./../components/Analytics'));
const ProfileDetail = React.lazy(() => import('./../components/Profile/Detail'));
const StaffCalls = React.lazy(() => import('./../components/Profile/Calls'));

const CompanyBranchList = React.lazy(() => import('./../components/CompanyBranch/List'));
const CompanyBranchAdd = React.lazy(() => import('./../components/CompanyBranch/Add'));

const UserList = React.lazy(() => import('./../components/Users/List'));
const UserAdd = React.lazy(() => import('./../components/Users/Add'));

const TeamsList = React.lazy(() => import('./../components/Teams/List'));
const TeamsAdd = React.lazy(() => import('./../components/Teams/Add'));

const ShiftsList = React.lazy(() => import('./../components/Shift/List'));
const ShiftAdd = React.lazy(() => import('./../components/Shift/Add'));

const RoastersList = React.lazy(() => import('./../components/Roaster/List'));
const RoasterAdd = React.lazy(() => import('./../components/Roaster/Add'));


const LocationsList = React.lazy(() => import('./../components/Locations/List'));
const LocationAdd = React.lazy(() => import('./../components/Locations/Add'));

const ItemsList = React.lazy(() => import('./../components/Items/List'));
const ItemAdd = React.lazy(() => import('./../components/Items/Add'));

const AreasList = React.lazy(() => import('./../components/Area/List'));
const AreaAdd = React.lazy(() => import('./../components/Area/Add'));

const PagesList = React.lazy(() => import('./../components/Pages/List'));

const StaffList = React.lazy(() => import('./../components/Staff/List'));
const StaffAdd = React.lazy(() => import('./../components/Staff/Add'));

const StaffDetail = React.lazy(() => import('./../components/Staff/Detail'));
// const ValidateAsOwner = React.lazy(() => import('./../components/ValidateAsOwner'));
const SettingAdd = React.lazy(() => import('./../components/Settings/Add'));
const InternalCalls = React.lazy(() => import('../components/InternalCalls/InternalCallsPlaces'));


const CallsList = React.lazy(() => import('./../components/Calls/List'));
const KitchenCalls = React.lazy(() => import('./../components/KitchenCalls/List'));
const CallAssigned = React.lazy(() => import('./../components/Calls/Add'));
const CallDetail = React.lazy(() => import('./../components/Calls/Detail'));
const CategoriesList = React.lazy(() => import('./../components/PromotionCategories/List'));


const CategoriesAdd = React.lazy(() => import('./../components/PromotionCategories/Add'));
const WatchesList = React.lazy(() => import('./../components/Watches/List'));
const WatchesAdd = React.lazy(() => import('./../components/Watches/Add'));
const StyleAdd = React.lazy(() => import('./../components/Styles/Add'));


const KitchenCallAdd = React.lazy(() => import('./../components/KitchenCalls/Add'));
const mirageRoute = React.lazy(() => import('../components/MirageRoute'));

const OrderItemList = React.lazy(() => import('../components/OrderItem/List'));
const OrderItemAdd = React.lazy(() => import('../components/OrderItem/Add'));

const ReservationList = React.lazy(() => import('../components/Reservation/List'));
const ReservationAdd = React.lazy(() => import('../components/Reservation/Add'));


const BulkPrinting = React.lazy(() => import('../components/Pages/Bulk'));

const ButtonList = React.lazy(() => import('../components/Buttons/List'));
const ButtonAdd = React.lazy(() => import('../components/Buttons/Add'));
const ButtonDetail = React.lazy(() => import('../components/Buttons/Detail'));


const VirtualButtonList = React.lazy(() => import('../components/VirtualButtons/List'));
const VirtualButtonAdd = React.lazy(() => import('../components/VirtualButtons/Add'));
const VirtualButtonDetail = React.lazy(() => import('../components/VirtualButtons/Detail'));
const SlotList = React.lazy(() => import('../components/Slot/List'));

const SlotAdd = React.lazy(() => import('../components/Slot/Add'));
const SortOrderItem = React.lazy(() => import('../components/OrderItem/SortOrderItem'));

const AddPromotions = React.lazy(() => import('./../components/Promotion/Add'));
const PromotionsList = React.lazy(() => import('./../components/Promotion/List'));

const VirtualButtonsSort = React.lazy(() => import('../components/VirtualButtons/VirtualButtonsSort'));

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
	{ path: '/oi-sort', exact : true,component: SortOrderItem,isPublic: false},
	

	{ path: '/items', exact : true,component: ItemsList,isPublic: false},
	{ path: '/items/add', exact : true,component: ItemAdd,isPublic: false},
	{ path: '/items/:id/edit', exact : true,component: ItemAdd,isPublic: false},

	{ path: '/reservations', exact : true,component: ReservationList,isPublic: false},
	{ path: '/reservations/add', exact : true,component: ReservationAdd,isPublic: false},
	{ path: '/reservations/:id/edit', exact : true,component: ReservationAdd,isPublic: false},

	{ path: '/slots', exact : true,component: SlotList,isPublic: false},
	{ path: '/slots/add', exact : true,component: SlotAdd,isPublic: false},
	{ path: '/slots/:id/edit', exact : true,component: SlotAdd,isPublic: false},

	{ path: '/areas', exact : true,component: AreasList,isPublic: false},
	{ path: '/areas/add', exact : true,component: AreaAdd,isPublic: false},
	{ path: '/areas/:id/edit', exact : true,component: AreaAdd,isPublic: false},

	{ path: '/qr-codes', exact : true,component: PagesList,isPublic: false},
	{ path: '/bulk-printing', exact : true,component: BulkPrinting, isPublic: false},
	// { path: '/qr-codes/add', exact : true,component: PageAdd,isPublic: false},
	// { path: '/qr-codes/:id/edit', exact : true,component: PageAdd,isPublic: false},


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

	{ path: '/buttons', exact : true,component: ButtonList,isPublic: false},
	{ path: '/buttons/add', exact : true,component: ButtonAdd,isPublic: false},
	{ path: '/buttons/:id/edit', exact : true,component: ButtonAdd,isPublic: false},
	{ path: '/buttons/:id/details', exact : true,component: ButtonDetail,isPublic: false},

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
	
	{path : "/virtual-buttons" ,exact : true ,component : VirtualButtonList,isPublic:true},
	{path : "/virtual-buttons/add" ,exact : true ,component : VirtualButtonAdd,isPublic:true},
	{path : "/virtual-buttons/:id/details" ,exact : true ,component : VirtualButtonDetail,isPublic:true},
	{path : "/virtual-buttons/:id/edit" ,exact : true ,component : VirtualButtonAdd,isPublic:true},
	
	{path : "/vb-sort" ,exact : true ,component : VirtualButtonsSort,isPublic:false},
	

];

export default routes;
