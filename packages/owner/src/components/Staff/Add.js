import React, {useState, useEffect} from 'react';
import {Card, CardBody, CardHeader} from 'reactstrap';
import {FormGenerator} from '@evenlogics/whf-form-generator';
import {connect} from "react-redux";

const ItemAdd = (props) => {

    const [query, setQuery] = useState(false)
	useEffect(() => {
		setQuery((prev)=>!prev)
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
            col: 4,
        },
        last_name: {
            type: "text",
            label: "Last Name",
            required: true,
            name: "last_name",
            col: 4,
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
            col: 4,
        },
        email: {
            type: "email",
            label: "Email",
            required: true,
            name: "email",
            col: 4,
        },
        phone1: {
            type: "text",
            label: "Phone Number",
            // required: true,
            name: "phone1",
            col: 4,
        },

        "Account Details": {
            isDummyField: true,
            type: "h4",
            col: 12,
        },
        // title: {
        //     // parent: "user",
        //     type: "advanceSelect",
        //     label: "Title",
        //     target:"title-list",
        //     name: "title",
        //     // optionLabel:"title",
        //     // optionValue:"id",
        //     // callback: (data)=> console.log(data,"data"),
        //     required:true,
        //     col: 4,
        //   },

        title: {
            // parent: "user",
            required:true,
            type: "advanceSelect",
            options: [
              {
                value: "1",
                label: "Mr",
              },
              {
                value: "2",
                label: "Mrs",
              },
              {
                value: "3",
                label: "Ms",
              },
            ],
            label: "Title",
            name: "title",
            col: 4,
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
        role_id: {
            // parent: "user",
            type: "advanceSelect",
            label: "Role",
            name: "role_id",
            target: "roles",
            optionValue: 'id',
            optionLabel: 'name',
            required: true,
            col: 4,
        }

    };

    return (
        <Card className="animated fadeIn xl-12 lg-12 md-12 sm-12 xs-12">
            <CardHeader>
                Add New Staff
            </CardHeader>
            <CardBody>
                <FormGenerator
                    targetEntity={`${props.branchId}/users`}
                    // getValues={handleValue}
                    fields={fields}
                    targetId={id}
                    name="items"
                    repeater={true}
                    initialValues={props.location.aboutProps}

                    redirect="staff"
                    handleSameValueFields={['title', 'slug']}
                    Query={query}
                    extraVals={{branch_id: props.branchId}}
                />
            </CardBody>
        </Card>
    );
}

const mapStateToProps = state => {
  return {
    branchId : state.selectedBranchId,
    companyName : state.companyName,
    companyId : state.companyId,
    userRole : state.userRole
  }
}

export default connect(mapStateToProps,null)(ItemAdd);
