import React from "react";

import BranchAdd from "@evenlogics/whf-ra-entity/dist/Branch/Add";

const ExtendBranchAdd = () =>  {
    // let id = props.match.params;
    let fields = {
        // lat: {},
        // lng: {},
        // state:false,  
        // addr:false,
        phone1:{
            col:6,
            type:"text",
            label:"Phone",        
        },
        phone2:{
            col:6,
            type:"text",
            label:"Secondary phone no"
        },
        company_id:{
            col:6,
            type:"readOn",
            label:"Company",
            value:'10',    
            disabled
        },  
     
        
       
    }

    let deleteFields =['lat','lng',"addr2","state"]; 
    return <BranchAdd  deleteFields = {deleteFields} extendedFields={fields} noEdit={false} />;

}

export default ExtendBranchAdd;