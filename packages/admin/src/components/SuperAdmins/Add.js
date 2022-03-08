import React from "react";
import {Card, CardBody, CardHeader} from 'reactstrap';
import {FormGenerator} from '@evenlogics/whf-form-generator';
import {formPageTitle} from "@facepays/common";
// import { getMaskHelper } from "../ExtendCompany/getMaskHelper";
// import {getMaskHelper} from "@facepays/common";

const Add = (props) => {


    const {id} = props.match.params;




    let fields = {
      username: {
        col: 3,
        type: "text",
        label: "Username",
        required: true,
      },
      email: {
        col: 3,
        type: "email",
        label: "Email",
        required: true,
      },
      ...(!id && {
        password: {
            // parent: "user",
            type: "password",
            label: "Password",
            name: "password",
            required: !id,
            col: 4,
          },
      }),

      ...(!id && {
        password_confirmation: {
          // parent: "user",
          oneOf: "password",
          type: "password",
          required: !id,
          label: "Password Confirmation",
          name: "password_confirmation",
          col: 4,
        },
      }),
    };


    return (
        <Card className="animated fadeIn xl-12 lg-12 md-12 sm-12 xs-12">
            <CardHeader>
                {formPageTitle('Super Admin', id)}
            </CardHeader>
            <CardBody>
                <FormGenerator
                    targetEntity="super-admins"
                    // getValues={handleValue}
                    fields={fields}
                    targetId={id}
                    name={id ? "editForm" : ""}
                    // repeater={true}
                    // initialValues={props.users.aboutProps}

                    redirect="owner/admin"
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
