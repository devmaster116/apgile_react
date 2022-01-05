import React from 'react'
const AddUser = React.lazy(() => import('./components/Add'));
// const UserList = React.lazy(() => import('./Persons/components/List'));
// const UserDetail = React.lazy(() => import('./Persons/components/Detail'));


const  routes = {
    AddUser : {path : "/add-user" ,exact : true , component : AddUser},
    // UserList : {path : "/users" ,exact : true , component : UserList},
    // UserEdit : {path : "/user/:id/edit" ,exact : true , component : AddUser},
    // UserDetail : {path : "/user/:id/details" ,exact : true , component : UserDetail},
    
    // RestaurantDetail : {path : "/restaurants/:id/details" ,exact : true , component : RestaurantDetail},
};

export default routes;