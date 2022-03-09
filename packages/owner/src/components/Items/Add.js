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
            col: 2,
        },
        // description: {
        //     type: "text",
        //     label: "Description",
        //     // required: true,
        //     name: "description",
        //     col: 2,
        // },
        location_id: {
            type: "advanceSelect",
            label: "Location",
            target: `${props.branchId}/locations?limit=1000`,
            // optionLabel: 'title',
            async: true,
            required: true,
            name: "location_id",
            col: 2,
        },
        prefix: {
            type: "text",
            label: "Prefix",
            // required: true,
            name: "prefix",
            col: 2,
        },
        postfix: {
            type: "text",
            label: "Postfix",
            // required: true,
            name: "postfix",
            col: 2,
        },
        qty: {
            type: "number",
            label: "Quantity",
            required: true,
            name: "qty",
            value: 1,
            min:1,
            col: 2,
        },
        starting_number : {
            type: "number",
            label: "Starting Number",
            required: true,
            value: 1,
            name: "starting_number",
            min:0,
            col: 1,
        },
        increments : {
            type: "number",
            label: "Increments",
            required: true,
            value: 1,
            name: "increments",
            min:1,
            col: 1,
        },



    };

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
                    initialValues={props.location.aboutProps}
                    redirect="items"
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
