import React, {useState, useEffect} from 'react';
import {Card, CardBody, CardHeader} from 'reactstrap';
import {FormGenerator} from '@evenlogics/whf-form-generator';
import {connect} from "react-redux";
import api from "@evenlogics/whf-api";
import {formPageTitle} from "@facepays/common";

const ItemAdd = (props) => {

    const [query, setQuery] = useState(false);
    const [optionsArr, setOptionsArr] = useState([])
    // const [phoneMask, setPhoneMask] = useState(props?.phoneMask)
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
        setQuery((prev) => !prev)
        // setPhoneMask(props?.phoneMask);
        console.log("Triggers")
    }, [props.branchId]);


    const {id} = props.match.params;

    const fields = {
        "Personal Details": {
            isDummyField: true,
            type: "h4",
            col: 12,
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

        email: {
            type: "email",
            label: "Email",
            required: true,
            name: "email",
            col: 2,
        },
        phone1: {
            type: "masked",
            mask: props?.phoneMask,
            label: "Phone",
            required: true,
            col: 2,
            className:"phoneMask"
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
            disabled:id ? true : false,
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
                // parent: "user",
                type: "advanceSelect",
                label: "Role",
                name: "role_id",
                // target: "roles",
                options: optionsArr,
                // optionValue: 'value',
                // optionLabel: 'label',
                required: true,
                col: 4,
            }
        }
    };

    return (
        <Card className="animated fadeIn xl-12 lg-12 md-12 sm-12 xs-12">
            <CardHeader>
                {formPageTitle('Staff', id)}
            </CardHeader>
            <CardBody>
                <FormGenerator
                    targetEntity={`${props.branchId}/users`}
                    // getValues={handleValue}
                    fields={fields}
                    targetId={id}
                    name="items"
                    // repeater={true}
                    initialValues={props.location.aboutProps}

                    redirect="staff"
                    // handleSameValueFields={['title', 'slug']}
                    Query={query}
                    // debug={true}
                    extraVals={{branch_id: props.branchId}}
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
