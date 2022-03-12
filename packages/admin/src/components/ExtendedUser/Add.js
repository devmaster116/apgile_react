import React, {useState, useEffect} from "react";
import {Card, CardBody, CardHeader} from 'reactstrap';
import {FormGenerator} from '@evenlogics/whf-form-generator';
import {formPageTitle} from "@facepays/common";
// import { getMaskHelper } from "../ExtendCompany/getMaskHelper";
// import {getMaskHelper} from "@facepays/common";
import api from "@evenlogics/whf-api";


const Add = (props) => {
    const [optionsArr, setOptionsArr] = useState([])
    const [showPasscode, setShowPasscode] = useState(false)
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
    // const [maskedValue, setMaskedValue] = useState("+1 (999) 999-9999")
    const [target, setTarget] = useState('branches');
//   const [maskedValue, setMaskedValue] = useState("+99-99-9999")


    const companiesChangeHandler = (data) => {
        setTimeout(() => {
            // let returnMask = getMaskHelper(data?.value)
            // setMaskedValue(returnMask);
            setTarget(`branches/${data.value}/all`)
        }, 1);
    }

    const roleChanged = async (data) => {
        await data.value;
        if(data.value == 3 || data.value == 4) {
            setShowPasscode(true);
        } else {
            setShowPasscode(false);
        }
    }

    const getInitialValues = async (data) => {
        await data;
        if(data.role_id == 3 || data.role_id == 4) {
            setShowPasscode(true);
        } else {
            setShowPasscode(false);
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
            className: "phoneMask"
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
            required: !id,
            col: 4,
        },
        password_confirmation: {
            // parent: "user",
            oneOf: "password",
            type: "password",
            required: !id,
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
            type: "number",
            required: !id,
            maxLength: 4,
            condition: showPasscode,
            label: "Passcode",
            col: 2,
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
            condition: !id,
            async: true,
            name: "branch_id"
        },
    }


    return (
        <Card className="animated fadeIn xl-12 lg-12 md-12 sm-12 xs-12">
            <CardHeader>
                {formPageTitle('User', id)}
            </CardHeader>
            <CardBody>
                <FormGenerator
                    targetEntity="users"
                    // getValues={handleValue}
                    fields={fields}
                    targetId={id}
                    name={id ? "editForm" : ""}
                    // repeater={true}
                    // initialValues={props.users.aboutProps}
                    getInitialValues={getInitialValues}
                    redirect="owner/users"
                    // handleSameValueFields={['title', 'slug']}
                    // Query={query}
                    // extraVals={{branch_id: props.branchId}}
                />
            </CardBody>
        </Card>
    );

    // return <UserAdd debug={true} deleteFields={deleteFields} extendedFields={fields} match={props.match} />;

}

export default Add;
