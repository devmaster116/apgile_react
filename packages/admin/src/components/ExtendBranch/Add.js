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
            name:"phone1"
        },
        phone2:{
            col:6,
            type:"text",
            required:true,    
            label:"secondary phone no",
            name:"phone2"

        },
        company_id:{
            type:"advanceSelect",
            target:'companies?limit=1000',
            required:true,
            name:"company_id",
            col:6,
            label:"Select Company"
        }
       
    }

    let deleteFields =['lat','lng',"addr2","state"]; 
    return <BranchAdd deleteFields = {deleteFields} extendedFields={fields} noEdit={false} />;

}

export default ExtendBranchAdd;