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
          label: 'Username',
          required: true,
          col: 6
        },
        title: {
            // parent: "user",
            required:true,
            type: "advanceSelect",
            options: [
                {
                    value: "1",
                    label: "Mr",
                },
                {
                    value: "2",
                    label: "Mrs",
                },
                {
                    value: "3",
                    label: "Ms",
                },
            ],
            label: "Title",
            name: "title",
            col: 6,
        },
        first_name:{
            col:6,
            type:"text",
            label:"First Name",
            // required:true,
        },
        last_name:{
            col:6,
            type:"text",
            label:"Last Name",
            // required:true,
        },

        roles: {
            type: 'advanceSelect',
            target: 'roles',
            // async: true,
            // multi: false,
            // options:optionsArr,
            required:true,
            name: 'role_id',
            label:'Roles',
            col: 6
          },

        phone1:{
            col:6,
            type:"text",
            label:"Phone",
            maxlength:14
        },
        branch_id:{
            col:6,
            type:"advanceSelect",
            target:"branches",
            label:"Select Branch",
            required:true,
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
            label:"Select Gender",
            required:true,

        }

    }

    let deleteFields =['permissions','lang'];
    return <UserAdd debug={true} deleteFields={deleteFields} extendedFields={fields} match={props.match} />;

}

export default Add;
