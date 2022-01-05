import React from 'react'
const UserManagement = React.lazy(() => import('./components/List'));
// const PromotionsList = React.lazy(() => import('./components/List'));
// const UserDetail = React.lazy(() => import('./Persons/components/Detail'));


const  routes = {
    UserManagement : {path : "/staffs" ,exact : true , component : UserManagement},
    // PromotionsList : {path : "/promotions" ,exact : true , component : PromotionsList},
    // EditPromotion : {path : "/promotions/:id/edit" ,exact : true , component : AddPromotions},
    // UserDetail : {path : "/user/:id/details" ,exact : true , component : UserDetail},
    
    // RestaurantDetail : {path : "/restaurants/:id/details" ,exact : true , component : RestaurantDetail},
};

export default routes;