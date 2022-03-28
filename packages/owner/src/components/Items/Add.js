import React, {useState, useEffect} from 'react';
import {Card, CardBody, CardHeader} from 'reactstrap';
import {FormGenerator} from '@evenlogics/whf-form-generator';
import {connect} from "react-redux";
import {formPageTitle} from "@facepays/common";


const ItemAdd = (props) => {

    const [query, setQuery] = useState(false);
    // const [openQrCode, setsw] = useState(false);
    useEffect(() => {
        setQuery((prev) => !prev)
    }, [props.branchId]);
    console.log(query, "query")
    const {id} = props.match.params;

    const fields = {
        name: {
            type: "text",
            label: "Name",
            required: true,
            name: "name",
            col: 3,
        },
        // description: {
        //     type: "text",
        //     label: "Description",
        //     // required: true,
        //     name: "description",
        //     col: 2,
        // },
        prefix: {
            type: "text",
            label: "Prefix",
            // required: true,
            name: "prefix",
            col: 3,
        },
        postfix: {
            type: "text",
            label: "Postfix",
            // required: true,
            name: "postfix",
            col: 3,
        },
        location_id: {
            type: "advanceSelect",
            label: "Location",
            target: `${props.branchId}/active/locations?limit=1000`,
            // optionLabel: 'title',
            async: true,
            required: true,
            name: "location_id",
            col: 3,
        },

        qty: {
            type: "number",
            label: "Quantity",
            required: true,
            name: "qty",
            min:10,
            col: 2
        },
        starting_number : {
            type: "number",
            label: "Starting Number",
            required: true,
            name: "starting_number",
            min:1,
            col: 2
        },
        increments : {
            type: "number",
            label: "Increments",
            required: true,
            name: "increments",
            min:1,
            col: 2
        },

    };

    let initialValues = props.location.aboutProps;

    if(typeof initialValues === 'undefined' ) {
        initialValues = {
            about: props.location.aboutProps,
            qty: 10,
            starting_number: 1,
            increments: 1,
        };
    }


    return (
        <Card className="animated fadeIn xl-12 lg-12 md-12 sm-12 xs-12">
            <CardHeader>
                {formPageTitle('Items', id)}
            </CardHeader>
            <CardBody>
                <FormGenerator
                    targetEntity={`${props.branchId}/items`}
                    // getValues={handleValue}
                    fields={fields}
                    targetId={id}
                    name={id ? "editForm" : ""}
                    repeater={true}
                    initialValues={initialValues}
                    redirect="items"
                    // debug={true}
                    handleSameValueFields={['title', 'slug']}
                />
            </CardBody>
        </Card>
    );
}
const mapStateToProps = state => {
    return {
        branchId: state.selectedBranchId,
    }
}


export default connect(mapStateToProps, null)(ItemAdd);
