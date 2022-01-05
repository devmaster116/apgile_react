import React from 'react'
const AddPromotions = React.lazy(() => import('./components/Add'));
const PromotionsList = React.lazy(() => import('./components/List'));
// const UserDetail = React.lazy(() => import('./Persons/components/Detail'));


const  routes = {
    AddPromotions : {path : "/add-promotion" ,exact : true , component : AddPromotions},
    PromotionsList : {path : "/promotions" ,exact : true , component : PromotionsList},
    EditPromotion : {path : "/promotions/:id/edit" ,exact : true , component : AddPromotions},
    // UserDetail : {path : "/user/:id/details" ,exact : true , component : UserDetail},
    
    // RestaurantDetail : {path : "/restaurants/:id/details" ,exact : true , component : RestaurantDetail},
};

export default routes;