import React, {useEffect,useState} from 'react';
import {Card, CardBody, CardHeader} from 'reactstrap';
import {FormGenerator} from '@evenlogics/whf-form-generator';
import {connect} from "react-redux";
import {formPageTitle} from "@facepays/common";

const OrderItemAdd = (props) => {
    const [fullDay,setFullDay]=useState("true")
    useEffect(() => {
        // setQuery((prev) => !prev);
    }, [props.branchId]);
    const {id} = props.match.params;

    const fields = {
        title: {
            type: "text",
            label: "Title",
            required: true,
            col: 6,
        },
        // weekdays: {
        //     type: 'advanceSelect',
        //     label: "Days",
        //     target: `${props.branchId}/week-day-list`,
        //     // async: true,
        //     name: 'weekdays',
        //     multi:true,
        //     required: true,
        //     col: 6
        // },
        // start_time: {
        //     type: "date",
        //     label: "Start Time",
        //     showTimeSelect:true,
        //     showTimeSelectOnly:true,
        //     required: true,
        //     timeCaption:"Time",
        //     dateFormat:"h:mm aa",
        //     col:3,
        // },
        // end_time: {
        //     type: "date",
        //     label: "End Time",
        //     col: 3,
        //     showTimeSelect:true,
        //     required: true,
        //     timeCaption:"Time",
        //     dateFormat:"h:mm aa",
        //     showTimeSelectOnly:true,
        // },
        slots: {
            type: 'advanceSelect',
            label: "Time Slots",
            target: `${props.branchId}/slot-filters/orderitem?limit=1000`,
            // async: true,
            multi:true,
            col: 4,
            callback:async (e)=>{
                await e
                setFullDay(e.value.length?"false":"true")
            }
        },
       
        status_id: {
            type: "switch",
            label: "Status",
            // required: true,
            col: 2
        },
        locations: {
            type: "advanceSelect",
            label: "Select Location",
            target: `${props.branchId}/locations`,
            name: "locations",
            col: 6,
            multi:true,
          },
        description: {
            type: 'textarea',
            label: 'Description',
            col: 12
        },

    };
    const getInitialValues = async (data) => {
        await data;
        setFullDay(data.slots.length?"false":"true")

    }
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
                    getInitialValues={getInitialValues}
                    extraVals={{branch_id: props.branchId,full_day:fullDay}}
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
