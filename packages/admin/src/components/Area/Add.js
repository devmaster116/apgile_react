import React, {useState} from "react";
import {FormGenerator} from "@evenlogics/whf-form-generator";
import {Card, CardBody} from "reactstrap";
import {Header} from "@evenlogics/whf-ra-components";

const Add = (props) => {

    const [branchUser, setBranchUser] = useState('users');
    const [locations, setLocations] = useState('locations');
    const [branchId, setBranchId] = useState(0);
    const [items, setItems] = useState('items-pages');
    const {id} = props.match.params;


    const changeBranchHandler = (data) => {
        setTimeout(() => {
            setBranchId(data?.value);
            console.log(data?.value, 'data');
            setBranchUser(`branch/${data?.value}/users`)
            setLocations(`branch/${data?.value}/locations`)
        }, 0);
    }

    const handleChangeLocation = (data) => {
        setTimeout(() => {
            console.log(data?.value, 'data');
            setItems(`location/${data?.value}/items`)
        }, 1);
    }
    let fields = {
        name: {
            type: "text",
            label: "Name",
            required: true,
            name: "name",
            col: 4,
        },

        description: {
            type: "text",
            label: "Description",
            // required: true,
            name: "description",
            col: 4,
        },

        branch_id: {
            type: "advanceSelect",
            label: "Select Branch",
            target: "branches?limit=1000000",
            name: "branch_id",
            col: 4,
            required: true,
            callback: (data) => changeBranchHandler(data)
        },
        user_id: {
            type: 'advanceSelect',
            label: "Users",
            target: branchUser,
            optionLabel: 'username',
            required: true,
            async: true,
            multi: true,
            name: 'user_id',
            col: 4
        },

        location_id: {
            type: "advanceSelect",
            label: "Select Location",
            required: true,
            target: locations,
            name: "location_id",
            col: 4,
            // optionValue: 'id',
            // optionLabel: 'name',
            async: true,
            callback: (data) => handleChangeLocation(data)
        },
        page_id: {
            type: "advanceSelect",
            label: "Item#",
            name: "page_id",
            target: items,
            required: true,
            multi: true,
            // key:'target',
            // optionValue: 'id',
            // optionLabel: 'name',
            col: 4,
            async: true
        },

        // message_box: {
        //   type: "switch",
        //   label: "Message",
        //   name: "message_box",
        //   required: true,
        //   col: 2,
        // },
        // customer_required: {
        //   type: "switch",
        //   label: "Customer Name",
        //   required: true,
        //   name: "customer_required",
        //   col: 2,
        // },

        // last_used: {
        //   type: "date",
        //   label: "Last Used",
        //   name: "last_used",
        //   required: true,
        //   col: 4,
        // },

        // branch_id: {
        //   type: "advanceSelect",
        //   label: "Branch",
        //   target: 'branches',
        //   async: true,
        //   name: "branch_id",
        //   required: true,
        //   col: 4,
        // },

        // location_id: {
        //   type: "advanceSelect",
        //   label: "Select Location",
        //   target: "locations",
        //   // optionValue: "id",
        //   // optionLabel: "role_id",
        //   name: "location_id",
        //   col: 4,
        //   required: true,
        // },

        // logo:{
        //   type:"filePic",
        //   name: "logo",
        //   col: 4,
        //   required: true,
        // }
    };

    return (
        <div>
            <Card className="animated fadeIn">
                <Header title="Add New Area"/>
                <CardBody>
                    <FormGenerator
                        targetEntity="areas"
                        // getValues={this.handleValue}
                        fields={fields}
                        targetId={id}
                        name="areas"
                        repeater={true}
                        // initialValues={props.location.aboutProps}
                        redirect="pages/area"
                        // handleSameValueFields={["name"]}
                    />
                </CardBody>
            </Card>
        </div>
    );
};

export default Add;
