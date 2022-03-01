import React, {useState} from "react";
import {FormGenerator} from "@evenlogics/whf-form-generator";
import {Card, CardBody} from "reactstrap";
import {Header} from "@evenlogics/whf-ra-components";
// import { getMaskHelper } from "./getMaskHelper";
import {formPageTitle, getMaskHelper, statesOptionList} from "@facepays/common";


const Add = (props) => {

    const [maskedValue, setMaskedValue] = useState("+1 (999) 999-9999")
    const [showStates, setShowStates] = useState(false)

    const companyChangeHandler = (value) => {
        setTimeout(() => {
            let returnMask = getMaskHelper(value?.value)
            setMaskedValue(returnMask);
            value?.value === 'US' ? setShowStates(true) : setShowStates(false)      
        }, 1);

    }

    const {id} = props.match.params;
    console.log('ID HERE', id);
    let showAddFields = true;
    if (typeof id != 'undefined' && id) {
        showAddFields = false;
    }

    const fields = {
        "Company Details": {
            isDummyField: true,
            type: "h4",
            col: 12,
        },
        name: {
            type: "text",
            label: "Company Name",
            required: true,
            name: "name",
            col: 4,
        },
        country: {
            // parent: "user",
            type: "advanceSelect",
            label: "Country",
            // defaultValue:{value:"US",label:"US"},
            optionValue: "code",
            target: "countries?limit=1000",
            required: true,
            col: 4,
            callback: (data) => companyChangeHandler(data)
        },
        phone1: {
            type: "masked",
            mask: maskedValue,
            label: "Company Phone",
            required: true,
            name: "phone1",
            col: 4,
        },

        // addrsss: {
        //     // parent: "address",
        //     type: "location",
        //     label: "Address",
        //     required: true,
        //     col: 12,
        // },

        addr1: {
            // parent: "address",
            type: "text",
            label: "Address",
            required: true,
            name: "addr1",
            col: 3,
        },

        city: {
            // parent: "address",
            type: "text",
            label: "City",
            required: true,
            name: "city",
            col: 3,
        },

        state: {
            // parent: "address",
            type: "text",
            label: "State",
            name: "state",
            col: 3,
            condition: !showStates
        },

        state_list: {
            // parent: "user",
            // required:true,
            type: "advanceSelect",
            options: statesOptionList(),
            label: "State",
            name: "state",
            col: 3,
            condition: showStates
        },

        zip_code: {
            // parent: "address",
            type: "text",
            label: "Zipcode",
            required: true,
            name: "zip_code",
            col: 3,
        },
        // location:{
        //     type:"location",
        //     label: "Location",
        //     required: true,
        //     name: "location",
        //     col: 3,
        // },


        "Admin Details": {
            isDummyField: true,
            type: "h4",
            col: 12,
            condition: showAddFields
        },
        // title: {
        //     // parent: "user",
        //     type: "advanceSelect",
        //     label: "Title",
        //     target: "title-list",
        //     name: "title",
        //     required: true,
        //     col: 2,
        //     condition: showAddFields
        // },
        username:{
            type: "text",
            label: "Username",
            name: "username",
            required: true,
            col: 3,
            condition: showAddFields
        },

        first_name: {
            // parent: "user",
            type: "text",
            label: "First Name",
            name: "first_name",
            required: true,
            col: 3,
            condition: showAddFields
        },
        last_name: {
            // parent: "user",
            type: "text",
            label: "Last Name",
            name: "last_name",
            required: true,
            col: 3,
            condition: showAddFields
        },
        gender_id: {
            // parent: "user",
            // required:true,
            type: "advanceSelect",
            options: [
                {
                    value: "1",
                    label: "Male",
                },
                {
                    value: "2",
                    label: "Female",
                },
                {
                    value: "3",
                    label: "Other",
                },
            ],
            label: "Gender",
            name: "gender_id",
            col: 3,
            condition: showAddFields
        },
        email: {
            // parent: "user",
            type: "email",
            label: "Email",
            name: "email",
            required: true,
            col: 2,
            condition: showAddFields
        },
        u_phone1: {
            // parent: "user",
            type: "masked",
            mask: maskedValue,
            label: "Phone",
            name: "u_phone1",
            required: true,
            col: 2,
            condition: showAddFields
        },
        password: {
            // parent: "user",
            type: "password",
            label: "Password",
            name: "password",
            required: !id,
            col: 2,
            condition: showAddFields
        },
        password_confirmation: {
            // parent: "user",
            oneOf: "password",
            type: "password",
            required: !id,
            label: "Password Confirmation",
            name: "password_confirmation",
            col: 2,
            condition: showAddFields
        },
        // role_id: {
        //   // parent: "user",
        //   type: "advanceSelect",
        //   label: "Role",
        //   name: "role_id",
        //   target: "roles",
        //   required:true,
        //   col: 4,
        // },

        "Style Details": {
            isDummyField: true,
            type: "h4",
            col: 12,
            condition: showAddFields
        },
        // s_name: {
        //     // parent:"style",
        //     type: "text",
        //     label: "Name",
        //     required: true,
        //     name: "s_name",
        //     col: 4,
        // },
        font_color: {
            // parent:"style",
            type: "color",
            defaultValue: "#00000",
            label: "Font Color",
            required: true,
            name: "font_color",
            col: 2,
            condition: showAddFields
        },
        bg_color: {
            type: "color",
            defaultValue: "#fffff",
            // parent:"style",
            label: "Background Color",
            // required: true,
            name: "bg_color",
            col: 2,
            condition: showAddFields
        },
        // other: {
        //   type: "text",
        //   label: "Others",
        //   name: "other",
        //   required: true,
        //   col: 4,
        // },

        logo: {
            type: "filePic",
            label: "Logo",
            name: "logo",
            required: true,
            col: 3,
            condition: showAddFields
        },
        bg_image: {
            type: "filePic",
            label: "Background Image",
            name: "bg_image",
            // required: true,
            col: 5,
            condition: showAddFields
        },

    };

    return (
        <div>
            <Card className="animated fadeIn">
                <Header title={formPageTitle('Company', id)}/>
                <CardBody>
                    <FormGenerator
                        targetEntity="company-branches"
                        // getValues={this.handleValue}
                        fields={fields}
                        targetId={id}
                        name="company-branches"
                        extraVals={{role_id: 2, b_name: "Default Branch"}}
                        // repeater={true}
                        // initialValues={props.location.aboutProps}
                        redirect="admin/companies"
                        noEdit={false}
                        // match={props.match}
                        // handleSameValueFields={["title", "slug"]}
                        // debug={true}
                    />
                </CardBody>
            </Card>
        </div>
    );
};

export default Add;
