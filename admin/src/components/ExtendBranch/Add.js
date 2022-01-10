import React from "react";

import BranchAdd from "@evenlogics/whf-ra-entity/dist/Branch/Add";

const ExtendBranchAdd = (props) =>  {
    // let id = props.match.params;
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
       
    }

    let deleteFields =['lat','lng',"addr2","state"]; 
    return <BranchAdd  deleteFields = {deleteFields} extendedFields={fields} noEdit={false} />;

}

export default ExtendBranchAdd;