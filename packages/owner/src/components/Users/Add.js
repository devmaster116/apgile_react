
import React from "react";


import ExtendedUserAdd from "@evenlogics/whf-ra-user/dist/User/Add";

const Add = (props) => {
    let id = props.match.params.id;
    let fields = {
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
      email:{
        col:6,
        type:"email",
        label:"email",
      },
        company_id:{
          col:6,
          type:"text",
          label:"company",
      },  
        phone1:{
            col:6,
            type:"text",
            label:"phone",        
        },
        title:{
            col:6,
            type:"text",
            label:"title"
        },
        gender_id:{
            col:6,
            type:"advanceSelect",
            options:[
                {
                value:"1",
                label:"Male"
                },
                {
                    value:"2",
                    label:"Female"
                },
                {
                    value:"3",
                    label:"Other"
                }
            ],
            label:"gender",
            // target:'gender'
        },
        role_id: {
            type: 'advanceSelect',
            target: 'roles',
            // async: true,
            // multi: true,
            name: 'role_id',
            label: 'Role',
            col: 6
          }
       
       
    }


    let deleteFields =['username','permissions',"state",'lang','roles']; 
    return <ExtendedUserAdd targetId={id} deleteFields = {deleteFields}  extendedFields={fields} />;

}

export default Add;


