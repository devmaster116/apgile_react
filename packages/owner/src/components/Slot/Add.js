import React, {useEffect, useState} from 'react';
import {Card, CardBody, CardHeader} from 'reactstrap';
import {FormGenerator} from '@evenlogics/whf-form-generator';
import {connect} from "react-redux";
import {formPageTitle} from "@facepays/common";

const SlotAdd = (props) => {
    useEffect(() => {
        // setQuery((prev) => !prev);
    }, [props.branchId]);
    const {id} = props.match.params;

    const [isFullDay, setIsFullDay] = useState(false)
    const [isFullWeek, setIsFullWeek] = useState(false)


    const fields = {
        name: {
            type: "text",
            label: "Name",
            required: true,
            col: 4,
        },
        weekdays: {
            type: 'advanceSelect',
            label: "Days",
            target: `${props.branchId}/week-day-list`,
            // async: true,
            name: 'weekdays',
            multi:true,
            required: true,
            condition:!isFullWeek,
            col: 4
        },
        target: {
            type: 'advanceSelect',
            label: "Available On",
            target: `${props.branchId}/slot-targets`,
            // async: true,
            multi:true,
            // required: true,
            col: 4
        },
        full_day: {
            type: "switch",
            label: "All Day",
            required: false,
            name:'full_day',
            col: 2,
            callback:async (e)=>{
                await e
                setIsFullDay(e.value)
            }
        },
        full_week: {
            type: "switch",
            label: "Full Week",
            required: false,
            name:'full_week',
            col: 2,
            callback:async (e)=>{
                await e
                setIsFullWeek(e?.value)
            }
        },
        time: {
            type: 'timeRange',
            label: 'Time',
            required: true,
            col: 3,
            condition:!isFullDay
        },

    };
    const  getInitialValues=(data)=>{
        setIsFullDay(data.full_day)
        setIsFullWeek(data.full_week)
    }
    return (
        <Card className="animated fadeIn">
            <CardHeader>
                {formPageTitle('Slot', id)}
            </CardHeader>
            <CardBody>
                <FormGenerator
                    targetEntity={`${props.branchId}/slots`}
                    fields={fields}
                    targetId={id}
                    name={id ? "editForm" : ""}
                    extraVals={{branch_id: props.branchId}}
                    getInitialValues={getInitialValues}
                    redirect="slots"
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

export default connect(mapStateToProps, null)(SlotAdd);
