import React from "react";

import UserAdd from "@evenlogics/whf-ra-user/dist/User/Add";

const Add = (props) =>  {
    // let id = props.match.params;
    let fields = {
         username: {
          type: 'text',
          label: 'title',
          required: true,
          // parent: 'address',
          name: 'title',
          col: 6
        },
        first_name:{
            col:6,
            type:"text",
            label:"first name",        
        },
        last_name:{
            col:6,
            type:"text",
            label:"last name",        
        },
        // lat: {},
        // lng: {},
        // state:false,  
        // addr:false,
      
        roles: {
            type: 'advanceSelect',
            target: 'roles',
            // async: true,
            multi: false,
            name: 'role_id',
            label:'roles',
            col: 6
          },

        phone1:{
            col:6,
            type:"text",
            label:"phone"
        },
        branch_id:{
            col:6,
            type:"advanceSelect",
            target:"branches",
            label:"select branch"
        },
        gender_id:{
            col:6,
            type:"advanceSelect",
           options:[
               {value:"1",label:"Male"},
               {value:"2",label:"Female"},
               {value:"3",label:"Other"},
           ],
            label:"select gender"
        }
       
    }

    let deleteFields =['permissions','lang']; 
    return <UserAdd  deleteFields={deleteFields} extendedFields={fields} noEdit={false} />;

}

export default Add;