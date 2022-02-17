import React from "react";

import UserAdd from "@evenlogics/whf-ra-user/dist/User/Add";

const Add = (props) =>  {

    // const [optionsArr, setOptionsArr] = useState([])
    // useEffect(() => {
    //     let ls =  JSON.parse(localStorage.getItem('currentUser'));
    //     let isAdmin = ls?.roles[0];
    //     var rolesArray=[];
    //     api.request("get","/roles")
    //     .then(({data}) => {
    //       rolesArray = data?.filter((role)=>(
    //          role.name !== isAdmin
    //       ))
    //       let newOption = rolesArray?.map((role)=>{
    //         return {value:role.id,label:role.name}
    //       })
    //       setOptionsArr(newOption);
    //     })
    //     .catch((error) => console.log(error));
      
    // }, [])


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
            // multi: false,
            // options:optionsArr,
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
