import React, {useState} from "react";
import {Card, CardBody, CardHeader} from 'reactstrap';
import {FormGenerator} from '@evenlogics/whf-form-generator';
// import { getMaskHelper } from "../ExtendCompany/getMaskHelper";
// import {getMaskHelper} from "@facepays/common";

const Add = (props) => {


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


    let fields = {

        "Personal Details": {
            isDummyField: true,
            type: "h4",
            col: 12,
        },
        title: {
            // parent: "user",
            required: true,
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
            col: 4,
        },
        first_name: {
            col: 4,
            type: "text",
            label: "First Name",
            // required:true,
        },
        last_name: {
            col: 4,
            type: "text",
            label: "Last Name",
            // required:true,
        },
        phone1: {
            // parent: "user",
            type: "masked",
            mask: "+1 (999) 999-9999",
            label: "Phone",
            name: "u_phone1",
            required: true,
            col: 4
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
            col: 4
        },
        email: {
            // parent: "user",
            type: "email",
            label: "Email",
            name: "email",
            required: true,
            col: 4,
        },
        password: {
            // parent: "user",
            type: "password",
            label: "Password",
            name: "password",
            required: true,
            col: 4,
        },
        password_confirmation: {
            // parent: "user",
            oneOf: "password",
            type: "password",
            required: true,
            label: "Password Confirmation",
            name: "password_confirmation",
            col: 4,
        },


        roles: {
            type: 'advanceSelect',
            target: 'roles',
            // async: true,
            // multi: false,
            // options:optionsArr,
            required: true,
            name: 'role_id',
            label: 'Roles',
            col: 4
        },
        gender_id: {
            col: 4,
            type: "advanceSelect",
            options: [
                {value: 1, label: "Male"},
                {value: 2, label: "Female"},
                {value: 3, label: "Other"},
            ],
            label: "Select Gender",
            required: true,

        },


        company_id: {
            col: 4,
            type: "advanceSelect",
            target: "companies?limit=1000",
            label: "Select Company",
            required: true,
            name: "company_id",
            callback: (data) => companiesChangeHandler(data)
        },
        branch_id: {
            col: 4,
            type: "advanceSelect",
            target: target,
            label: "Select Branch",
            required: true,
            async: true,
            name: "branch_id"
        },


    }


    return (
        <Card className="animated fadeIn xl-12 lg-12 md-12 sm-12 xs-12">
            <CardHeader>
                Add New User
            </CardHeader>
            <CardBody>
                <FormGenerator
                    targetEntity="users"
                    // getValues={handleValue}
                    fields={fields}
                    targetId={id}
                    name="users"
                    // repeater={true}
                    // initialValues={props.users.aboutProps}

                    redirect="users"
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
