import React from "react";

import CompanyAdd from "@evenlogics/whf-ra-entity/dist/Company/Add";

const ExtendCompanyAdd = (props) => {
    let {id} = props?.match?.params;
    console.log(id,"idd")
    let fields = {
        // lat: {},
        // lng: {},
        // state:false,  
        // addr:false,
        phone1:{
            col:6,
            type:"text",
            label:"phone",        
        },
        phone2:{
            col:6,
            type:"text",
            label:"secondary phone no"
        },
        password:{
            col:6,
            type:"password",
            label:"passowrd",
            required:true
        },
    }
    return <CompanyAdd extendedFields={fields} id={id}/>;

}

export default ExtendCompanyAdd;