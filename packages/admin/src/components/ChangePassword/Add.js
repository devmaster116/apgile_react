import React from "react";
import {Card, CardBody} from 'reactstrap';
import {FormGenerator} from '@evenlogics/whf-form-generator';
import {Header} from "@evenlogics/whf-ra-components";


const Add = (props) => {


    const {id} = props.match.params;




    let fields = {
    
     

      current_password: {
        // parent: "user",
        type: "password",
        label: "Current Password",
        name: "current_password",
        required: true,
        col: 4,
      },
        password: {
            // parent: "user",
            type: "password",
            label: "New Password",
            name: "password",
            required: true,
            col: 4,
          },
      

  
        password_confirmation: {
          // parent: "user",
          oneOf: "password",
          type: "password",
          // required: !id,
          label: "Password Confirmation",
          name: "password_confirmation",
          col: 4,
        },
     
    };


    return (
        <Card className="animated fadeIn xl-12 lg-12 md-12 sm-12 xs-12">
        
            <Header title="Change Password"/>
       
            <CardBody>
                <FormGenerator
                    targetEntity="change-password"
                    // getValues={handleValue}
                    fields={fields}
                    targetId={id}
                    name="editForm"
                    // repeater={true}
                    // initialValues={props.users.aboutProps}

                    redirect="super-admins"
                    // handleSameValueFields={['title', 'slug']}
                    // Query={query}
                    extraVals={{_method: "patch"}}
                />
            </CardBody>
        </Card>
    );


}

export default Add;
