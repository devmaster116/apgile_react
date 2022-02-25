import React from "react";
import {FormGenerator} from "@evenlogics/whf-form-generator";
import {Card, CardBody} from "reactstrap";
import {Header} from "@evenlogics/whf-ra-components";

const Add = (props) => {
    const {id} = props.match.params;

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
            col: 6,
        },
        phone1: {
            type: "masked",
            mask: '99/99/9999',
            maskChar: '_',
            alwaysShowMask: true,
            label: "Company Phone",
            required: true,
            name: "phone1",
            col: 6,
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
            col: 2,
        },

        state: {
            // parent: "address",
            type: "text",
            label: "State",
            name: "state",
            col: 2,
        },

        zip_code: {
            // parent: "address",
            type: "text",
            label: "Zipcode",
            required: true,
            name: "zip_code",
            col: 2,
        },

        country: {
            // parent: "user",
            type: "advanceSelect",
            label: "Country",
            optionValue: "code",
            target: "countries?limit=1000",
            required: true,
            col: 3,
        },

        "Admin Details": {
            isDummyField: true,
            type: "h4",
            col: 12,
        },
        title: {
            // parent: "user",
            type: "advanceSelect",
            label: "Title",
            target: "title-list",
            name: "title",
            required: true,
            col: 2,
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
            col: 2,
        },
        email: {
            // parent: "user",
            type: "email",
            label: "Email",
            name: "email",
            required: true,
            col: 2,
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
        // role_id: {
        //   // parent: "user",
        //   type: "advanceSelect",
        //   label: "Role",
        //   name: "role_id",
        //   target: "roles",
        //   required:true,
        //   col: 4,
        // },
        u_phone1: {
            // parent: "user",
            type: "masked",
            mask: "+999-999-9999",
            label: "User Phone",
            name: "u_phone1",
            required:true,
            col: 4,
        },


        "Style Details": {
            isDummyField: true,
            type: "h4",
            col: 12,
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
            defaultValue: "#000000",
            label: "Font Color",
            required: true,
            name: "font_color",
            col: 3,
        },
        bg_color: {
            type: "color",
            defaultValue: "#ffffff",
            // parent:"style",
            label: "Background Color",
            // required: true,
            name: "bg_color",
            col: 3,
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
        },
        bg_image: {
            type: "filePic",
            label: "Background Image",
            name: "bg_image",
            // required: true,
            col: 3,
        },

    };

    return (
        <div>
            <Card className="animated fadeIn">
                <Header title="Add New Company"/>
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
                        // handleSameValueFields={["title", "slug"]}
                        // debug={true}
                    />
                </CardBody>
            </Card>
        </div>
    );
};

export default Add;
