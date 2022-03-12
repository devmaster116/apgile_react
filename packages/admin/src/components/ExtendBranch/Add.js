import React,{useState,useEffect} from "react";
// import { getMaskHelper } from "../ExtendCompany/getMaskHelper";
import {getMaskHelper, statesOptionList, timezonesOptions} from "@facepays/common";
import {FormGenerator} from "@evenlogics/whf-form-generator";
import {Card, CardBody} from "reactstrap";
import {Header} from "@evenlogics/whf-ra-components";
import {formPageTitle} from '@facepays/common';
// import BranchAdd from "@evenlogics/whf-ra-entity/dist/Branch/Add";
import api from "@evenlogics/whf-api";


const ExtendBranchAdd = (props) =>  {

    const [maskedValue, setMaskedValue] = useState("+1 (000) 000-0000")
    const [showStates, setShowStates] = useState(false)
    const {id} = props.match.params;

    const companyChangeHandler = (value) => {
        setTimeout(() => {
            console.log(value,"value")
            let returnMask = getMaskHelper( id ? value : value?.value)
            setMaskedValue(returnMask);
            console.log("working");
            (id ? value : value?.value) === "US" ? setShowStates(true) : setShowStates(false)
        }, 0);

    }

       /* eslint-disable */


    useEffect(() => {
        id && api.request("get", `/branches/${id}`).then(({data}) => {
             companyChangeHandler(data?.address?.country)
           }).catch((error) => console.log(error));

       }, [id])

       /* eslint-enable */


    let fields = {
        branch_name: {
            col:3,
            type:"text",
            label:"Name",
            required:true,
        },
        company_id:{
            type:"advanceSelect",
            target:'companies?limit=1000',
            required:true,
            name:"company_id",
            col:3,
            label:"Select Company",

        },
        country: {
            parent: 'address',
            type: "advanceSelect",
            label: "Country",
            optionValue: "code",
            name: 'country',
            target: "countries?limit=1000",
            required: true,
            col: 3,
            callback: (data) => companyChangeHandler(data)
        },
        branch_phone1:{
            type: "masked",
            mask: maskedValue,
            col:3,
            label:"Phone",
            // required:true,
            // maxlength:13,
            formatChars: {
                '0': '[0-9]',
                'a': '[A-Za-z]',
                '*': '[A-Za-z0-9]'
              },
              className:"phoneMask"
        },
        addr1:{
            parent: 'address',
            col:3,
            type:"text",
            required:true,
            label:"Address",
        },
        city:{
            parent: 'address',
            col:3,
            type:"text",
            required:true,
            label:"City",
        },
        state: {
            parent: "address",
            type: "text",
            label: "State",
            name: "state",
            defaultValue:" ",
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
            parent: 'address',
            type: 'text',
            label: "Zip Code",
            required: true,
            name: 'zip_code',
            col: 3
        },

        "Admin Details": {
            isDummyField: true,
            type: "h4",
            col: 12,

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
            disabled: id ? true : false,
            required: true,
            col: 3,

        },

        first_name: {
            // parent: "user",
            type: "text",
            label: "First Name",
            name: "first_name",
            required: true,
            col: 3,

        },
        last_name: {
            // parent: "user",
            type: "text",
            label: "Last Name",
            name: "last_name",
            required: true,
            col: 3,

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

        },
        email: {
            // parent: "user",
            type: "email",
            label: "Email",
            name: "email",
            // required: true,
            col: 2,

        },
        u_phone1: {
            // parent: "user",
            type: "masked",
            mask: maskedValue,
            label: "Phone",
            name: "u_phone1",
            // required: true,
            col: 2,
            formatChars: {
                0: "[0-9]",
                a: "[A-Za-z]",
                "*": "[A-Za-z0-9]",
            },

            className: "phoneMask",
        },
        password: {
            // parent: "user",
            type: "password",
            label: "Password",
            name: "password",
            required: !id,
            col: 2,

        },
        password_confirmation: {
            // parent: "user",
            oneOf: "password",
            type: "password",
            required: !id,
            label: "Password Confirmation",
            name: "password_confirmation",
            col: 3,

        },

        "Settings": {
            isDummyField: true,
            type: "h4",
            col: 12
        },

        wait_time: {
            parent: 'settings',
            type: "number",
            label: "Wait Time",
            required: true,
            col: 2,
            min:0
        },
        cycle: {
            parent: 'settings',
            type: "number",
            label: "Cycle",
            required: true,
            col: 2,
            min:0

        },
        throttle_wait: {
            parent: 'settings',
            type: "number",
            label: "Throttle Wait",
            required: true,
            col: 2,
            min:0

        },

        max_users:{
            parent: 'settings',
            type: "number",
            label: "Max. Users",
            required: true,
            col: 2
        },

        max_watches:{
            parent: 'settings',
            type: "number",
            label: "Max. Watches",
            required: true,
            col: 2
        },

        max_codes:{
            parent: 'settings',
            type: "number",
            label: "Max. QR Codes",
            required: true,
            col: 2
        },

        internal_active: {
            parent: 'settings',
            type: "switch",
            label: "Allow Internal Call",
            required: true,
            col: 2
        },

        "Site Content": {
            isDummyField: true,
            type: "h4",
            col: 12,
        },

        page_subtitle:{
            parent: 'settings',
            type: "text",
            label: "Sub Title",
            // required: true,
            col: 4,
        },

        page_title:{
            parent: 'settings',
            type: "text",
            label: "Title",
            // required: true,
            col: 4,
        },

        timezone: {
            parent: 'settings',
            type: "advanceSelect",
            label: "Timezone",
            name: "timezone",
            required: true,
            options: timezonesOptions(),
            col: 4,
        },

        "Style Details": {
            isDummyField: true,
            type: "h4",
            col: 12
        },
        font_color: {
            type: "color",
            label: "Font Color",
            defaultValue: "#000000",
            name: "font_color",
            col: 2,
        },
        bg_color: {
            type: "color",
            label: "Background Color",
            defaultValue: "#ffffff",
            name: "bg_color",
            col: 2
        },

        logo: {
            type: "filePic",
            label: "Logo",
            name: "logo",
            // required: true,
            col: 3
        },
        bg_image: {
            type: "filePic",
            label: "Background Image",
            name: "bg_image",
            // required: true,
            col: 5
        },
    }

    return (
        <div>
            <Card className="animated fadeIn">
                <Header title={formPageTitle('Outlet', id)} />
                <CardBody>
                    <FormGenerator
                        targetEntity="branches"
                        // getValues={this.handleValue}
                        fields={fields}
                        targetId={id}
                        name={id ? "editForm" : ""}
                        // repeater={true}
                        // initialValues={props.location.aboutProps}
                        redirect="entity/branches"
                        // noEdit={true}
                        // match={props.match}
                        // handleSameValueFields={["title", "slug"]}
                        // debug={true}
                    />
                </CardBody>
            </Card>
        </div>
    )

    // return <FormGenerator
    //     targetEntity="branches"
    //     // getValues={this.handleValue}
    //     fields={fields}
    //     targetId={id}
    //     name="Branches"
    //     // repeater={true}
    //     // initialValues={props.location.aboutProps}
    //     redirect="branches"
    //     noEdit={false}
    //     // match={props.match}
    //     // handleSameValueFields={["title", "slug"]}
    //     // debug={true}
    // />
    // return <FormGenerator deleteFields = {deleteFields} extendedFields={fields} noEdit={false} match={props.match} />;

}

export default ExtendBranchAdd;
