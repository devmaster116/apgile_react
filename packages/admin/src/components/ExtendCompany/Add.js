import React, {useState, useEffect} from "react";
import {FormGenerator} from "@evenlogics/whf-form-generator";
import {Card, CardBody} from "reactstrap";
import {Header} from "@evenlogics/whf-ra-components";
// import { getMaskHelper } from "./getMaskHelper";
import {formPageTitle, getMaskHelper, statesOptionList} from "@facepays/common";
import api from "@evenlogics/whf-api";


const Add = (props) => {

    const [maskedValue, setMaskedValue] = useState("+1 (000) 000-0000")
    const [showStates, setShowStates] = useState(false)
    // const [color, setColor] = useState('')


    const {id} = props.match.params;

    const companyChangeHandler = (value, field, loadOptions, setFunction) => {
        if (typeof setFunction !== 'undefined') {
            setFunction('state_txt', '');
            setFunction('state', '');
        }

        setTimeout(() => {
            value.value && setMaskedValue((prev) => prev = getMaskHelper(value.value))
            value.value === "US" ? setShowStates(true) : setShowStates(false)
        }, 0);
        value?.value === "US" ? setShowStates(true) : setShowStates(false)
    }

    /* eslint-disable */


    useEffect(() => {
        id && api.request("get", `/company-branches/${id}`).then(({data}) => {
            companyChangeHandler({value: data?.address?.country})
        }).catch((error) => console.log(error));

    }, [id])

    /* eslint-enable */


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
            col: 5,
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
            callback: companyChangeHandler,
        },
        phone1: {
            type: "masked",
            mask: maskedValue,
            label: "Company Phone",
            // required: true,
            name: "phone1",
            col: 2,
            formatChars: {
                '0': '[0-9]',
                'a': '[A-Za-z]',
                '*': '[A-Za-z0-9]'
            },
        },

        dummy1: {
            isDummyField: true,
            col: 1
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
            col: 5,
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
            name: "state_txt",
            col: 2,
            condition: !showStates,
        },

        state_list: {
            // parent: "user",
            required: true,
            type: "advanceSelect",
            options: statesOptionList(),
            label: "State",
            name: "state",
            col: 2,
            condition: showStates,
        },

        zip_code: {
            // parent: "address",
            type: "text",
            label: "Zipcode",
            required: true,
            name: "zip_code",
            col: 1,
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
            condition: showAddFields,
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
        username: {
            type: "text",
            label: "Username",
            name: "username",
            required: true,
            col: 3,
            condition: showAddFields,
        },

        first_name: {
            // parent: "user",
            type: "text",
            label: "First Name",
            name: "first_name",
            required: true,
            col: 3,
            condition: showAddFields,
        },
        last_name: {
            // parent: "user",
            type: "text",
            label: "Last Name",
            name: "last_name",
            required: true,
            col: 3,
            condition: showAddFields,
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
            col: 2,
            condition: showAddFields,
        },

        dummy2: {
            isDummyField: true,
            col: 1
        },

        email: {
            // parent: "user",
            type: "email",
            label: "Email",
            name: "email",
            // required: true,
            col: 3,
            condition: showAddFields,
        },
        u_phone1: {
            // parent: "user",
            type: "masked",
            mask: maskedValue,
            label: "Phone",
            name: "u_phone1",
            // required: true,
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
            condition: showAddFields,
        },
        password_confirmation: {
            // parent: "user",
            oneOf: "password",
            type: "password",
            required: !id,
            label: "Password Confirmation",
            name: "password_confirmation",
            col: 2,
            condition: showAddFields,
        },

        Limits: {
            isDummyField: true,
            type: "h4",
            col: 12,
            condition: showAddFields,
        },

        internal_active: {
            type: "switch",
            label: "Allow Internal Calls",
            required: true,
            col: 2,
            condition: showAddFields,
        },

        promotions: {
            type: "switch",
            label: "Allow Promotions",
            required: true,
            col: 2,
            condition: showAddFields,
        },

        dashboard: {
            type: "switch",
            label: "Dashboard",
            required: true,
            col: 2,
            condition: showAddFields,
        },

        maxusers: {
            type: "number",
            label: "Max. Users",
            name: "max_users",
            required: true,
            col: 1,
            min: 0,
            condition: showAddFields,
        },

        watches: {
            type: "number",
            label: "Max. Watches",
            name: "max_watches",
            required: true,
            col: 1,
            min: 0,
            condition: showAddFields,
        },

        qrcodes: {
            type: "number",
            label: "Max. QR Codes",
            name: "max_codes",
            required: true,
            col: 1,
            min: 0,
            condition: showAddFields,
        },
        calls: {
            type: "number",
            label: "Max. Calls",
            name: "max_calls",
            required: true,
            col: 1,
            min: 0,
            condition: showAddFields,
        },

        wait_time: {
            // parent: 'settings',
            type: "number",
            label: "Wait Time",
            required: true,
            col: 1,
            min: 0,
            condition: showAddFields,
        },
        // cycle: {
        //   //  parent: 'settings',
        //     type: "number",
        //     label: "Cycle",
        //     required: true,
        //     col: 1,
        //     min:0,
        //     condition: showAddFields,

        // },
        throttle_wait: {
            // parent: 'settings',
            type: "number",
            label: "Throttle Wait",
            required: true,
            col: 1,
            min: 0,
            condition: showAddFields,

        },

        dummy3: {
            isDummyField: true,
            col: 2
        },


        "Style Details": {
            isDummyField: true,
            type: "h4",
            col: 12,
            condition: showAddFields,
        },
        font_color: {
            type: "color",
            label: "Font Color",
            defaultValue: "#000000",
            name: "font_color",
            col: 2,
            condition: showAddFields,
        },
        bg_color: {
            type: "color",
            label: "Background Color",
            defaultValue: "#ffffff",
            name: "bg_color",
            col: 2,
            condition: showAddFields,
            handleChange: (data) => console.log(data, "data"),
        },

        page_footer: {
            type: "text",
            label: "Page Footer",
            col: 2,
            condition: showAddFields,
        },
        dummy: {
            isDummyField: true,
            col: 1
        },
        logo: {
            type: "filePic",
            label: "Logo",
            name: "logo",
            // required: true,
            col: 2,
            condition: showAddFields,
        },
        dummy5: {
            isDummyField: true,
            col: 1
        },
        bg_image: {
            type: "filePic",
            label: "Background Image",
            name: "bg_image",
            // required: true,
            col: 2,
            condition: showAddFields,
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
                        // customEntity=""
                        fields={fields}
                        targetId={id}
                        name={id ? "editForm" : ""}
                        extraVals={{role_id: 2, b_name: "Default Outlet"}}
                        // repeater={true}
                        // initialValues={props.location.aboutProps}
                        redirect="admin/companies"
                        // noEdit={false}
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
