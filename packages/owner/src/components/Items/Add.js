import React, {useState, useEffect} from 'react';
import {Card, CardBody, CardHeader} from 'reactstrap';
import {FormGenerator} from '@evenlogics/whf-form-generator';
import {connect} from "react-redux";


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
            col: 6,
        },
        description: {
            type: "text",
            label: "Description",
            // required: true,
            name: "description",
            col: 6,
        },
        qty: {
            type: "number",
            label: "Quantity",
            required: true,
            name: "qty",
            col: 6,
        },
        location_id: {
            type: "advanceSelect",
            label: "Location",
            target: `${props.branchId}/locations?limit=1000`,
            // optionLabel: 'title',
            async: true,
            required: true,
            name: "location_id",
            col: 6,
        },
        prefix: {
            type: "text",
            label: "Prefix",
            // required: true,
            name: "prefix",
            col: 6,
        },
        postfix: {
            type: "text",
            label: "Postfix",
            // required: true,
            name: "postfix",
            col: 6,
        },
        starting_number : {
            type: "number",
            label: "Starting Number",
            required: true,
            name: "starting_number",
            col: 6,
        },
        increments : {
            type: "number",
            label: "Increments",
            required: true,
            name: "increments",
            col: 6,
        },

       

    };

    return (
        <Card className="animated fadeIn xl-12 lg-12 md-12 sm-12 xs-12">
            <CardHeader>
                Add New Item
            </CardHeader>
            <CardBody>
                <FormGenerator
                    targetEntity={`${props.branchId}/items`}
                    // getValues={handleValue}
                    fields={fields}
                    targetId={id}
                    name="items"
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
