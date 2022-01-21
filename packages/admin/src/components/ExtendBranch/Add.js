import React from "react";

import BranchAdd from "@evenlogics/whf-ra-entity/dist/Branch/Add";

const ExtendBranchAdd = (props) =>  {
    let id = props.match.params;
    let fields = {
        phone1:{
            col:6,
            type:"text",
            label:"phone",    
            required:true,    
        },
        phone2:{
            col:6,
            type:"text",
            required:true,    
            label:"secondary phone no",
        },
        company:{
            target:'companies?limit=1000',
            required:true,
        }
       
    }

    let deleteFields =['lat','lng',"addr2","state"]; 
    return <BranchAdd redirect='/entity/branches' deleteFields = {deleteFields} extendedFields={fields} noEdit={true} />;

}

export default ExtendBranchAdd;