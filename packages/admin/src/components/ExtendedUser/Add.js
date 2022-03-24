import React, {useState, useEffect} from "react";
import {Card, CardBody, CardHeader} from 'reactstrap';
import {FormGenerator} from '@evenlogics/whf-form-generator';
import {formPageTitle} from "@facepays/common";
import api from "@evenlogics/whf-api";


const Add = (props) => {
    const [optionsArr, setOptionsArr] = useState([])
    const [showPasscode, setShowPasscode] = useState(false)
    const [showPassword, setShowPassword] = useState(true);
    const [showBranch, setShowBranch] = useState(true);
    // const [roleId, setRoleId] = useState(null);
    useEffect(() => {
        var rolesArray = [];
        api.request("get", "/roles")
            .then(({data}) => {
                rolesArray = data?.filter((role) => (
                    role.name !== "super-admin"
                ))
                let newOption = rolesArray?.map((role) => {
                    return {value: role.id, label: role.name}
                })
                setOptionsArr(newOption);
            })
            .catch((error) => console.log(error));

    }, []);


    const {id} = props.match.params;
    const [target, setTarget] = useState('branches');


    const companiesChangeHandler = (data) => {
        setTimeout(() => {
            setTarget(`branches/${data.value}/all`)
        }, 1);
    }

    
    const roleChanged = async (data) => {
        await data.value;
        decidePasswordLogic(data.value);
    }

    const getInitialValues = async (data) => {

        await data;
        decidePasswordLogic(data.role_id);
        if(data?.role_id === 3 || data?.role_id === 4) {
            setShowPasscode(true)
            if(data?.role_id === 3) {
                setShowPassword(false);
            } else {
                setShowPassword(true);
            }
        }
      

    }

    const decidePasswordLogic = (role) => {
        role = parseInt(role);
        // setRoleId(role);
        if(role === 4 || role === 5) {
            setShowPasscode(true);
            if(role === 5) {
                setShowPassword(false);
            } else {
                setShowPassword(true);
            }
        } else {
            setShowPasscode(false);
            setShowPassword(true);
        }
        if(role === 2){
            console.log("admin here")
          setShowBranch(false)
        }else{
          setShowBranch(true)
        }
    }



    let fields = {

        "Personal Details": {
            isDummyField: true,
            type: "h4",
            col: 12,
        },
        first_name: {
            col: 3,
            type: "text",
            label: "First Name",
            required: true,
        },
        last_name: {
            col: 3,
            type: "text",
            label: "Last Name",
            required: true,
        },
        gender_id: {
            col: 2,
            type: "advanceSelect",
            options: [
                {value: 1, label: "Male"},
                {value: 2, label: "Female"},
                {value: 3, label: "Other"},
            ],
            label: "Gender",
            // required: true,
        },
        email: {
            // parent: "user",
            type: "email",
            label: "Email",
            name: "email",
            // required: true,
            col: 2,
        },
        phone1: {
            // parent: "user",
            type: "masked",
            mask: "+1 (000) 000-0000",
            label: "Phone",
            // name: "u_phone1",
            // required: true,
            col: 2,
            formatChars: {
                '0': '[0-9]',
                'a': '[A-Za-z]',
                '*': '[A-Za-z0-9]'
              },
        },


        "Account Details": {
            isDummyField: true,
            type: "h4",
            col: 12,
        },

        username: {
            type: 'text',
            label: 'Username',
            required: true,
            disabled: id ? true : false,
            col: 4
        },

        password: {
            // parent: "user",
            type: "password",
            label: "Password",
            name: "password",
            condition:showPassword,
            required: !id,
            col: 4,
        },
        password_confirmation: {
            // parent: "user",
            oneOf: "password",
            type: "password",
            required: !id,
            condition:showPassword,
            label: "Password Confirmation",
            name: "password_confirmation",
            col: 4,
        },

        ...(optionsArr.length > 0) && {
            role_id: {
                type: "advanceSelect",
                label: "Role",
                name: "role_id",
                options: optionsArr,
                required: true,
                col: 2,
                callback: roleChanged
            }
        },

        passcode: {
            type: "masked",
            mask: "9999",
            required: !id,
            condition: showPasscode,
            label: "Passcode",
            col: 2,
            formatChars: {
                '9': '[0-9]',
                'a': '[A-Za-z]',
                '*': '[A-Za-z0-9]'
              },
        },


        company_id: {
            col: 3,
            type: "advanceSelect",
            target: "companies?limit=1000",
            label: "Select Company",
            required: true,
            name: "company_id",
            condition: !id,
            callback: (data) => companiesChangeHandler(data)
        },

        branch_id: {
            col: 3,
            type: "advanceSelect",
            target: target,
            label: "Select Branch",
            required: true,
            condition: id ? false : showBranch ,
            async: true,
            name: "branch_id"
        },
    }


    // var extraValObj = {}
        
    //    if (roleId === 5 ){
    //     extraValObj = {
    //        password:null,
    //        password_confirmation:null
    //     }
    // }  
    //    }else if(roleId === 4){

    //    }

      
        // passcode




    return (
        <Card className="animated fadeIn xl-12 lg-12 md-12 sm-12 xs-12">
            <CardHeader>
                {formPageTitle('User', id)}
            </CardHeader>
            <CardBody>
                <FormGenerator
                    targetEntity="users"
                    fields={fields}
                    targetId={id}
                    name={id ? "editForm" : ""}
                    getInitialValues={getInitialValues}
                    redirect="owner/users"
                    // extraVals={extraValObj}
                />
            </CardBody>
        </Card>
    );

}

export default Add;
