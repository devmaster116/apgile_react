import React from "react";
import { FormGenerator } from "@evenlogics/whf-form-generator";
import { Card, CardBody } from "reactstrap";
import { Header } from "@evenlogics/whf-ra-components";

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
      label: "company name",
      required: true,
      name: "name",
      col: 4,
    },
    phone1: {
      type: "text",
      label: "company phone",
      required: true,
      name: "phone1",
      col: 4,
    },
    // phone2: {
    //   type: "text",
    //   label: "company secondary phone",
    //   required: true,
    //   name: "phone2",
    //   col: 4,
    // },

    address: {
      type: "text",
      label: "company address",
      required: true,
      name: "address",
      col: 12,
    },
    "Branch Details": {
      isDummyField: true,
      type: "h4",
      col: 12,
    },
    b_name: {
      parent: "branch",
      type: "text",
      label: "branch name",
      required: true,
      name: "b_name",
      col: 4,
    },
    b_phone1: {
      parent: "branch",
      type: "text",
      label: "branch phone",
      name: "b_phone1",
      col: 4,
    },
    // b_phone2: {
    //   parent: "branch",
    //   type: "text",
    //   label: "branch phone 2",
    //   required: true,
    //   name: "b_phone2",
    //   col: 4,
    // },
    addr1: {
      parent: "address",
      type: "text",
      label: "Address",
      required: true,
      name: "addr1",
      col: 4,
    },

    city: {
      parent: "address",
      type: "text",
      label: "city",
      required: true,
      name: "city",
      col: 4,
    },
    zip_code: {
      parent: "address",
      type: "text",
      label: "zipcode",
      required: true,
      name: "zip_code",
      col: 4,
    },
    country: {
      parent: "address",
      type: "text",
      label: "country",
      required: true,
      name: "country",
      col: 4,
    },

    "User Details": {
      isDummyField: true,
      type: "h4",
      col: 12,
    },
    title: {
        parent: "user",
        type: "text",
        label: "Title",
        name: "title",
        col: 4,
      },

    first_name: {
      parent: "user",
      type: "text",
      label: "first name",
      name: "first_name",
      col: 4,
    },
    last_name: {
      parent: "user",
      type: "text",
      label: "last name",
      name: "last_name",
      col: 4,
    },
    email: {
      parent: "user",
      type: "email",
      label: "email",
      name: "email",
      col: 4,
    },
    password: {
      parent: "user",
      type: "password",
      label: "password",
      name: "password",
      col: 4,
    },
    password_confirmation: {
      parent: "user",
      oneOf: "password",
      type: "password",
      label: "password confirmation",
      name: "password_confirmation",
      col: 4,
    },
    gender_id: {
      parent: "user",
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
      label: "gender",
      name: "gender_id",
      col: 4,
    },
    role_id: {
      parent: "user",
      type: "advanceSelect",
      label: "Role",
      name: "role_id",
      target: "roles",
      col: 4,
    },
    u_phone1: {
        parent: "user",
        type: "text",
        label: "user phone",
        name: "u_phone1",
        col: 4,
      },
    
  };

  return (
    <div>
      <Card className="animated fadeIn">
        <Header title="Add New Company" />
        <CardBody>
          <FormGenerator
            targetEntity="company-branches"
            // getValues={this.handleValue}
            fields={fields}
            targetId={id}
            name="company-branches"
            // repeater={true}
            // initialValues={props.location.aboutProps}
            redirect="admin/companies"
            // handleSameValueFields={["title", "slug"]}
          />
        </CardBody>
      </Card>
    </div>
  );
};

export default Add;
