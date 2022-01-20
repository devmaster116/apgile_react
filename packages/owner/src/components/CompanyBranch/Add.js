
import React from "react";
// import { FormGenerator } from "@evenlogics/whf-form-generator";
// import { Card, CardBody } from "reactstrap";
// import { Header } from "@evenlogics/whf-ra-components";

import BranchAdd from "@evenlogics/whf-ra-entity/dist/Branch/Add";

const Add = () => {
    // let id = props.match.params.id;
    let fields = {
        // lat: {},
        // lng: {},
        // state:false,  
        // addr:false,
        
        company_id:{
          col:6,
          type:"text",
          label:"Company",
          value:'10',
      },  
        phone1:{
            col:6,
            type:"text",
            label:"Phone",        
        },
        phone2:{
            col:6,
            type:"text",
            label:"Secondary Phone No"
        },
       
        
       
    }

    let deleteFields =['lat','lng',"addr2","state"]; 
    return <BranchAdd  deleteFields = {deleteFields} extendedFields={fields} noEdit={false} />;

}

export default Add;


