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
    const [showRadius, setShowRadius] = useState(false)
    const {id} = props.match.params;

    const companyChangeHandler = (value, field, loadOptions, setFunction) => {
        if(typeof setFunction !== 'undefined') {
            setFunction('state_txt', '');
            setFunction('state', '');
        }
        setTimeout(() => {
            value.value && setMaskedValue((prev) => prev = getMaskHelper(value.value))
            value.value === "US" ? setShowStates(true) : setShowStates(false)
        }, 0);
       value?.value === "US" ? setShowStates(true) : setShowStates(false)
    }

    const changeGeoRadius = (data) => {
        setTimeout(() => {
            if(data && data.value) {
                setShowRadius(true);
            } else {
                setShowRadius(false);
            }
        }, 0);
    }

       /* eslint-disable */


    useEffect(() => {
        id && api.request("get", `/branches/${id}`).then(({data}) => {
             companyChangeHandler({value :data?.address?.country});
             // console.log(data?.settings?.geolock, 'asdlfkajsdf');
            if(data?.settings?.geolock) {
                setShowRadius(data?.settings?.geolock);
            }
           }).catch((error) => console.log(error));

       }, [id])

       /* eslint-enable */


    let fields = {
        branch_name: {
            col:4,
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
            callback: companyChangeHandler
        },
        branch_phone1:{
            type: "masked",
            mask: maskedValue,
            col:2,
            label:"Phone",
            formatChars: {
                '0': '[0-9]',
                'a': '[A-Za-z]',
                '*': '[A-Za-z0-9]'
              },
        },
        addr1:{
            parent: 'address',
            col:4,
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
            name: "state_txt",
            defaultValue:" ",
            col: 3,
            condition: !showStates
        },

        state_list: {
            // parent: "user",
            required:true,
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
            col: 1
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

        dummy2: {
            isDummyField: true,
        },
        email: {
            // parent: "user",
            type: "email",
            label: "Email",
            name: "email",
            // required: true,
            col: 3,

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
                '0': '[0-9]',
                'a': '[A-Za-z]',
                '*': '[A-Za-z0-9]'
              },
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
            col: 2,

        },

        "Settings": {
            isDummyField: true,
            type: "h4",
            col: 12
        },

        internal_active: {
            parent: 'settings',
            type: "switch",
            label: "Internal",
            required: true,
            col: 1
        },

        promotions: {
            parent: 'settings',
            type: "switch",
            label: "Promotions",
            required: true,
            col: 1
        },

        dashboard: {
            parent: 'settings',
            type: "switch",
            label: "Dashboard",
            required: true,
            col: 1
        },

        geolock: {
            parent: 'settings',
            type: "switch",
            label: "Geo Lock",
            required: true,
            col: 1,
            callback: (data) => changeGeoRadius(data)
        },

        georadius:{
            parent: 'settings',
            type: "number",
            label: "Geo Radius",
            required: true,
            col: 2,
            condition: showRadius
        },

        dummy6: {
            isDummyField: true,
            col: 12
        },

        max_users:{
            parent: 'settings',
            type: "number",
            label: "Max. Users",
            required: true,
            col: 2
        },

        max_buttons: {
            parent: 'settings',
            type: "number",
            label: "Max. Buttons",
            required: true,
            col: 2,
        },
        max_vbtn: {
            parent: 'settings',
            type: "number",
            label: "Max. Virtual Buttons",
            name: "max_vbtn",
            required: true,
            col: 2,
            min: 0,
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


        max_calls:{
            parent: 'settings',
            type: "number",
            label: "Max. Calls",
            required: true,
            col: 2
        },

        // spacer: {
        //     type: "hidden",
        //     col: 1,
        //     groupClass: "d-none d-md-block d-sm-block col-lg-1"
        // },

        wait_time: {
            parent: 'settings',
            type: "number",
            label: "Wait Time",
            required: true,
            col: 2,
            min:0
        },
        // cycle: {
        //     parent: 'settings',
        //     type: "number",
        //     label: "Cycle",
        //     required: true,
        //     col: 1,
        //     min:0

        // },
        throttle_wait: {
            parent: 'settings',
            type: "number",
            label: "Throttle Wait",
            required: true,
            col: 2,
            min:0
        },

        button_wait: {
            parent: 'settings',
            type: "number",
            label: "Button Wait",
            required: true,
            col: 2,
            min: 0,
        },

        "Site Content": {
            isDummyField: true,
            type: "h4",
            col: 12,
        },

        page_title:{
            parent: 'settings',
            type: "text",
            label: "Title",
            // required: true,
            col: 3,
        },

        page_subtitle:{
            parent: 'settings',
            type: "text",
            label: "Sub Title",
            // required: true,
            col: 3,
        },

        page_footer:{
            parent: 'settings',
            type: "text",
            label: "Footer",
            // required: true,
            col: 3,
        },

        timezone: {
            parent: 'settings',
            type: "advanceSelect",
            label: "Timezone",
            name: "timezone",
            required: true,
            options: timezonesOptions(),
            col: 3,
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
        "break": {
            isDummyField: true,
            col: 12
        },
        logo: {
            type: "filePic",
            label: "Logo",
            name: "logo",
            // required: true,
            col: 3
        },
        delete_logo: {
           
            type: "switch",
            label: "Delete Logo",
            required: true,
            name:"delete_logo",
            col: 3 
        },
        bg_image: {
            type: "filePic",
            label: "Background Image",
            name: "bg_image",
            // required: true,
            col: 3
        },
        delete_bg_image:{
           
            type: "switch",
            label: "Delete Background",
            required: true,
            name:"delete_bg_image",
            col: 3 
        }
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
                        redirect="entity/outlets"
                        // noEdit={true}
                        // match={props.match}
                        // handleSameValueFields={["title", "slug"]}
                        //debug={true}
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
