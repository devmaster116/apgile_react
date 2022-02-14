import React from "react";

import UserAdd from "@evenlogics/whf-ra-user/dist/User/Add";

const Add = (props) =>  {
    let fields = {
         username: {
          type: 'text',
          label: 'username',
          required: true,
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
            label:"Select Branch",
            name:"branch_id"
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
    return <UserAdd debug={true} deleteFields={deleteFields} extendedFields={fields} match={props.match} />;

}

export default Add;
