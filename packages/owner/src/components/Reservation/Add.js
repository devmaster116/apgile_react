import React, {useEffect,useState} from 'react';
import {Card, CardBody, CardHeader} from 'reactstrap';
import {FormGenerator} from '@evenlogics/whf-form-generator';
import {connect} from "react-redux";
import {formPageTitle} from "@facepays/common";
import { Button } from 'react-bootstrap';

const ReservationAdd = (props) => {
// const [targetItemsPath, setTargetItemsPath] = useState(`${props.branchId}/pages?limit=2000`)
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
        weekdays: {
            type: 'advanceSelect',
            label: "Days",
            target: `${props.branchId}/week-day-list`,
            // async: true,
            name: 'weekdays',
            multi:true,
            required: true,
            col: 4
        },
        // location_id: {
        //     type: "advanceSelect",
        //     label: "Location",
        //     target: `${props.branchId}/active/locations?limit=1000`,
        //     // optionLabel: 'title',
        //     async: true,
        //     required: true,
        //     name: "location_id",
        //     col: 3,
        //     callback : (data) => {
        //        setTimeout(() => {
        //            setTargetItemsPath(`${props.branchId}/location/${data.value}/items`)
        //        }, 100);
        //     } 
        // },
        pages: {
            type: "advanceSelect",
            label: "Reserved Items",
            name: "page_ids",
            target: `${props.branchId}/pages?limit=2000`,
            required: true,
            multi:true,
            // async: true,
            col: 4
        },
        //   pages: {
        //     type: "advanceSelect",
        //     label: "Reserved Items",
        //     name: "page_ids",
        //     target: targetItemsPath,
        //     required: true,
        //     multi:true,
        //     async: true,
        //     col: 5
        // },
        // buttons: {
        //     type: "advanceSelect",
        //     label: "Enable Buttons",
        //     name: "buttons",
        //     // target: `${props.branchId}/promotions?limit=2000`,
        //     options: [
        //         { label: "Open Link", value: 1 },
        //         { label: "Call A Supervisor/Manager", value: 2 },
        //         { label: "Call A Staff", value: 3 },
        //         { label: "Custom Request with Quantity (e.g get towels x 2)", value: 4 },
        //         { label: "Custom Request (Get Tea)", value: 5 },
        //     ],
        //     optionLabel: 'label',
        //     // required: true,
        //     multi:true,
        //     // async: true,
        //     col: 4
        // },

        promotions: {
            type: "advanceSelect",
            label: "Promotions",
            name: "promotion_ids",
            target: `${props.branchId}/promotions?limit=2000`,
            optionLabel: 'title',
            // required: true,
            multi:true,
            // async: true,
            col: 4
        },
        description: {
            type: 'textarea',
            label: 'Notes',
            col: 4
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
