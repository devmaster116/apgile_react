import React, {useEffect} from 'react';
import {Card, CardBody, CardHeader} from 'reactstrap';
import {FormGenerator} from '@evenlogics/whf-form-generator';
import {connect} from "react-redux";
import {formPageTitle} from "@facepays/common";

const OrderItemAdd = (props) => {

    useEffect(() => {
        // setQuery((prev) => !prev);
    }, [props.branchId]);
    const {id} = props.match.params;

    const fields = {
        title: {
            type: "text",
            label: "Title",
            required: true,
            col: 8,
        },
        status_id: {
            type: "switch",
            label: "Status",
            required: true,
            col: 4
        },
        description: {
            type: 'textarea',
            label: 'Description',
            col: 12
        },

    };

    return (
        <Card className="animated fadeIn">
            <CardHeader>
                {formPageTitle('Order Item', id)}
            </CardHeader>
            <CardBody>
                <FormGenerator
                    targetEntity={`${props.branchId}/order-items`}
                    fields={fields}
                    targetId={id}
                    name={id ? "editForm" : ""}
                    extraVals={{branch_id: props.branchId}}
                    redirect="order-items"
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

export default connect(mapStateToProps, null)(OrderItemAdd);
