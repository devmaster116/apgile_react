import React, {useEffect, useState} from 'react';
import {Card, CardBody, CardHeader} from 'reactstrap';
import {FormGenerator} from '@evenlogics/whf-form-generator';
import {connect} from "react-redux";
import {formPageTitle} from "@facepays/common";

const LocationsAdd = (props) => { 
    const [fullDay,setFullDay]=useState("true")
    const [showTeam, setShowTeam] = useState(false);
    useEffect(() => {
        // setQuery((prev) => !prev);
    }, [props.branchId]);
    const {id} = props.match.params;

    const manageTeamField = data => {
        if(typeof data.value !== 'undefined' && data.value)
            setShowTeam(false);
        else
            setShowTeam(true);
    };

    const fields = {
        name: {
            type: "text",
            label: "Name",
            required: true,
            name: "name",
            col: 2,
        },
        description: {
            type: 'text',
            label: 'Description',
            col: 4
        },
        supervisor_id: {
            type: 'advanceSelect',
            label: "Select Supervisor",
            target: `${props.branchId}/role-users/supervisor`,
            optionLabel: 'full_name',
            required: true,
            // async: true,
            name: 'supervisor_id',
            col: 2,
            condition: !showTeam
        },
        // start_time: {
        //     type: "date",
        //     label: "Start Time",
        //     showTimeSelect:true,
        //     showTimeSelectOnly:true,
        //     required: true,
        //     timeCaption:"Time",
        //     dateFormat:"h:mm aa",
        //     col:2,
        // },
        // end_time: {
        //     type: "date",
        //     label: "End Time",
        //     col: 2,
        //     showTimeSelect:true,
        //     required: true,
        //     timeCaption:"Time",
        //     dateFormat:"h:mm aa",
        //     showTimeSelectOnly:true,
        // },

        // time: {
        //     type: 'timeRange',
        //     label: 'Time',
        //     required: true,
        //     name: 'time',
        //     col: 4,
        // },

        slots: {
            type: 'advanceSelect',
            label: "Time Slots",
            target: `${props.branchId}/slot-filters/location?limit=1000`,
            // async: true,
            multi:true,
            required: false,
            col: 4,
            callback:async (e)=>{
                await e
                setFullDay(e.value && e.value.length?"false":"true")
            }
        },

        // dummy: {
        //     isDummyField: true,
        //     col: 1
        // },
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
        orderItems: {
            type: 'advanceSelect',
            label: "Order Items",
            target: `${props.branchId}/order-items?limit=1000`,
            // async: true,
            optionLabel: 'title',
            name: 'order_items',
            multi:true,
            // required: true,
            col: 6
        },
        virtualbtn_ids: {
            type: 'advanceSelect',
            label: "Virtual Buttons",
            target: `${props.branchId}/virtual-buttons?limit=1000`,
            // async: true,
            optionLabel: 'title',
            name: 'virtualbtn_ids',
            multi:true,
            // required: true,
            col: 6
        },
        dummy2: {
            isDummyField: true,
            col: 12
        },
        status: {
            type: "switch",
            label: "Status",
            // required: true,
            col: 2
        },
        message_box: {
            type: "switch",
            label: "Include Message",
            name: "message_box",
            // required: true,
            col: 2,
        },
        customer_required: {
            type: "switch",
            label: "Include Customer ID",
            // required: true,
            name: "customer_required",
            col: 2,
        },
        bypass_cycle: {
            type: "switch",
            label: "Bypass Call Cycle",
            // required: true,
            name: "bypass_call_cycle",
            col: 6,
        },
        "Manage Auto Assinged": {
            isDummyField: true,
            type: "h4",
            col: 12,
        },
        location_banner: {
            type: "filePic",
            label: "Location Banner",
            col: 3,
        },
        delete_location_banner: { 
            type: "switch",
            label: "Delete Banner",
            required: true,
            name:"delete_location_banner",
            col: 3 
        },
        location_logo: {
            type: "filePic",
            label: "Location Logo",
            col: 3,
        },
        delete_location_logo: { 
            type: "switch",
            label: "Delete Logo",
            required: true,
            name:"delete_location_logo",
            col: 3 
        },
        auto: {
            type: "switch",
            label: "Auto Assign Staff",
            name: "auto_assign",
            // required: true,
            col: 2,
            callback: (data) => manageTeamField(data)
        },
        team: {
            type: "advanceSelect",
            label: "Team",
            target: `${props.branchId}/teams?limit=1000`,
            // optionLabel: 'title',
            multi: true,
            async: true,
            required: true,
            name: "team",
            col: 3,
            condition: showTeam
        },
    };

    const getInitialValues = async (data) => {
    await data;
        console.log(data,"data")
        if (typeof data.auto_assign !== "undefined" && data.auto_assign === 1){
            setShowTeam(true);
        }else {
            setShowTeam(false);
        }
        setFullDay(data.slots && data.slots.length?"false":"true")
    }

    return (
        <Card className="animated fadeIn">
            <CardHeader>
                {formPageTitle('Location', id)}
            </CardHeader>
            <CardBody>
                <FormGenerator
                    targetEntity={`${props.branchId}/locations`}
                    // getValues={handleValue}
                    fields={fields}
                    targetId={id}
                    name={id ? "editForm" : ""}
                    // repeater={true}
                    // initialValues={props.location.aboutProps}
                    extraVals={
                        {
                            branch_id: props.branchId,
                            ...(id&& {_method:'patch'}),
                            full_day:fullDay
                        }
                    }
                    redirect="locations"
                    getInitialValues={getInitialValues}

                    // handleSameValueFields={['title', 'slug']}
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

export default connect(mapStateToProps, null)(LocationsAdd);
