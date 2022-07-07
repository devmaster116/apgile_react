import React, {useEffect} from 'react';
import {Card, CardBody, CardHeader} from 'reactstrap';
import {FormGenerator} from '@evenlogics/whf-form-generator';
import {connect} from "react-redux";
import {formPageTitle} from "@facepays/common";

const ReservationAdd = (props) => {

    useEffect(() => {
        // setQuery((prev) => !prev);
    }, [props.branchId]);
    const {id} = props.match.params;

    const fields = {
        name: {
            type: "text",
            label: "Name",
            required: true,
            col: 4,
        },
        contact: {
            type: "text",
            label: "Email / Phone",
            col: 3,
        },
        target_date:{
            type:"date",
            label:"Date",
            col: 2,
            required: true,
            // placeholderText: minDate ? "" : "Please select the start date",
            // disabled:minDate ? false : true,
            // minDate:minDate,
        },
        time: {
            type: 'timeRange',
            label: 'Time',
            required: true,
            col: 3,
        },
        pages: {
            type: "advanceSelect",
            label: "Reserved Items",
            name: "page_ids",
            target: `${props.branchId}/pages?limit=2000`,
            required: true,
            multi:true,
            // async: true,
            col: 6
        },
        description: {
            type: 'textarea',
            label: 'Notes',
            col: 6
        }
    };

    return (
        <Card className="animated fadeIn">
            <CardHeader>
                {formPageTitle('Reservation', id)}
            </CardHeader>
            <CardBody>
                <FormGenerator
                    targetEntity={`${props.branchId}/reservations`}
                    fields={fields}
                    targetId={id}
                    name={id ? "editForm" : ""}
                    extraVals={{branch_id: props.branchId}}
                    redirect="reservations"
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

export default connect(mapStateToProps, null)(ReservationAdd);
