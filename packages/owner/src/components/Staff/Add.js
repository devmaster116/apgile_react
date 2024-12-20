import React, {useState, useEffect} from 'react';
import {Card, CardBody, CardHeader} from 'reactstrap';
import {FormGenerator} from '@evenlogics/whf-form-generator';
import {connect} from "react-redux";
import api from "@evenlogics/whf-api";
import {formPageTitle} from "@facepays/common";

const ItemAdd = (props) => {

    const [query, setQuery] = useState(false);
    const [showUsername, setShowUsername] = useState(true);
    const [showPassword, setShowPassword] = useState(true);
    const [optionsArr, setOptionsArr] = useState([])
    const {id} = props.match.params;

    useEffect(() => {
        var rolesArray = [];
        api.request("get", "/roles")
            .then(({data}) => {
                rolesArray = data?.filter((role) => {
                   if(props.userRole === "manager"){
                     return  role.name !== "super-admin" &&  role.name !== "admin"
                   } else{
                       return  role.name !== "super-admin"
                   }
            })
                let newOption = rolesArray?.map((role) => {
                    return {value: role.id, label: role.name}
                })
                newOption && setOptionsArr(newOption);
            })
            .catch((error) => console.log(error));

        setQuery((prev) => !prev)
    }, [props.branchId,props.userRole]);


    const roleChanged = async (data) => {
        await data.value;
        decidePasswordLogic(data.value);
        decideUserLogic(data.value);
    }

    const getInitialValues = async (data) => {
        await data;
        decidePasswordLogic(data.role_id);
        decideUserLogic(data.role_id);
        // if(data?.role_id === 3 || data?.role_id === 4) {
        //     setShowPasscode(true)
        //     if(data?.role_id === 3) {
        //         setShowPassword(false);
        //     } else {
        //         setShowPassword(true);
        //     }
        // }

    }

    const decidePasswordLogic = (role) => {
        role = parseInt(role);
        if(role === 4 || role === 5) {
            if(role === 5) {
                setShowPassword(false);
            } else {
                setShowPassword(true);
            }
        } else {
            setShowPassword(true);
        }
    }

    const decideUserLogic = (role) => {
        role = parseInt(role);
        if(!id && (role === 4 || role === 5)) {
            setShowUsername(false);
        } else {
            setShowUsername(true);
        }
    }


    const fields = {
        ...(optionsArr.length > 0) && {
            role_id: {
                type: "advanceSelect",
                label: "Role",
                name: "role_id",
                options: optionsArr,
                required: true,
                col: 2,
                callback: (data) => roleChanged(data)
            }
        },

        first_name: {
            type: "text",
            label: "First Name",
            required: true,
            name: "first_name",
            col: 3,
        },
        last_name: {
            type: "text",
            label: "Last Name",
            required: true,
            name: "last_name",
            col: 3,
        },
        gender_id: {
            // required: true,
            type: "advanceSelect",
            options: [
                {
                    value: 1,
                    label: "Male",
                },
                {
                    value: 2,
                    label: "Female",
                },
                {
                    value: 3,
                    label: "Other",
                },
            ],
            label: "Gender",
            name: "gender_id",
            col: 2,
        },
        phone1: {
            type: "masked",
            mask: props?.phoneMask,
            label: "Phone",
            col: 2,
            formatChars: {
                '0': '[0-9]',
                'a': '[A-Za-z]',
                '*': '[A-Za-z0-9]'
            },
        },

        username: {
            type: 'text',
            label: 'Username',
            condition: showUsername,
            required: true,
            disabled:id ? true : false,
            col: 2
        },

        email: {
            type: "email",
            label: "Email",
            name: "email",
            col: 3,
        },

        password: {
            type: "password",
            label: "Password",
            name: "password",
            required: id ? false :true ,
            condition: showPassword,
            col: 2,
        },
        password_confirmation: {
            oneOf: "password",
            type: "password",
            required:  id ? false :true,
            condition: showPassword,
            label: "Password Confirmation",
            name: "password_confirmation",
            col: 2,
        },

        // hidden2: {
        //     type: 'hidden',
        //     col: 1
        // },
    };
    var extraVal = {branch_id: props.branchId}

    if(showPassword){
        extraVal = {
           branch_id: props.branchId,
        }
    }else{
        extraVal = {
            branch_id: props.branchId,
            password:null,
            password_confirmation:null
         }
    }
    return (
        <Card className="animated fadeIn xl-12 lg-12 md-12 sm-12 xs-12">
            <CardHeader>
                {formPageTitle('Staff', id)}
            </CardHeader>
            <CardBody>
                <FormGenerator
                    targetEntity={`${props.branchId}/users`}
                    fields={fields}
                    targetId={id}
                    name={id ? "editForm" : ""}
                    // initialValues={props.location.aboutProps}
                    redirect="staff"
                    Query={query}
                    extraVals={extraVal}
                    getInitialValues={getInitialValues}
                    // debug={true}
                />
            </CardBody>
        </Card>
    );
}

const mapStateToProps = state => {
    return {
        branchId: state.selectedBranchId,
        phoneMask: state.phoneMask,
        companyName: state.companyName,
        companyId: state.companyId,
        userRole: state.userRole
    }
}

export default connect(mapStateToProps, null)(ItemAdd);
