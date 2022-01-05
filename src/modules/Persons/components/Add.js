import React from "react";
import { FormGenerator } from "@evenlogics/whf-form-generator";
import { Card, CardBody } from "reactstrap";
import { Header } from "@evenlogics/whf-ra-components";

const Add = (props) => {
const {id} = props.match.params;
  let fields = {

    first_name: {
      type: "text",
      label: "First Name",
      required: true,
      name: "first_name",
      col: 4,
    },
    last_name: {
      type: "text",
      label: "Last Name",
      required: true,
      name: "last_name",
      col: 4,
    },
    email: {
        type: "email",
        label: "Email",
        required: true,
        name: "email",
        col: 4,
      },
      title:{
        type: "text",
        label: "Title",
        required: true,
        name: "title",
        col: 4,
      },
    password: {
      type: "password",
      label: "Password",
      required: true,
      name: "password",
      col: 4,
    },
    password_confirmation: {
      type: "text",
      label: "Confirm Password",
      required: true,
      oneOf:"password",
      name: "password_confirmation",
      col: 4,
    },
    gender_id: {
        type: "advanceSelect",
        label: "Select Gender",
        target: "",
        // async: true,
        optionValue: "id",
        optionLabel: "username",
        name: "gender_id",
        col: 4,
        required: true,
      },
    phone1: {
      type: "text",
      label: "Phone",
      required: true,
      name: "phone1",
      col: 4,
    },
    role_id :{
        type: "advanceSelect",
        label: "Select Role",
        target: "",
        // async: true,
        optionValue: "id",
        optionLabel: "role_id",
        name: "role_id",
        col: 4,
        required: true,
    },    
  };

  return (
    <div>
      <Card className="animated fadeIn">
        <Header title="Add New User" />
        <CardBody>
          <FormGenerator
            targetEntity="users"
            fields={fields}
            targetId={id}
            name="users"
            // getInitialValues={this.getInitialValues}
            // debug={false}
            // extraVals={extraVals}
            redirect="redirectURL"
            // repeater={true}
          />
        </CardBody>
      </Card>
    </div>
  );
};

export default Add;
