import React, { useState, useEffect } from 'react';
import { Card, CardBody, CardHeader } from 'reactstrap';
import { FormGenerator } from '@evenlogics/whf-form-generator';
import { connect } from "react-redux";
import { formPageTitle } from "@facepays/common";
import fontAwesome from './fontAwesome.json';
import { components  } from "react-select";
const ButtonAdd = (props) => {

    const { id } = props.match.params;
    // const [query, setQuery] = useState(false);
    const [isStaff, setIsStaff] = useState(false);
    const [isLink, setIsLink] = useState(false)
    const [isCustomMsg, setisCustomMsg] = useState(false)
    const [isQty, setIsQty] = useState(false)
    const [isLocation, setIsLocation] = useState(false)
    const [fullDay,setFullDay]=useState("true")
    useEffect(() => {
        // setQuery((prev) => !prev)
    }, [props.branchId]);


    const onTypeChange = (e) => {
        setTimeout(() => {
            setIsStaff(e.value === 2)
            setIsLink(e.value === 3)
            setisCustomMsg(e.value === 4)
            setIsQty(e.value === 5)
        }, 0);

    }
    const { Option  } = components;
    const IconOption = props => (
        <Option {...props}>
            <i className={`fa ${[props.data.value]} mr-2`}></i>
            {props.data.label}
        </Option>
    );
    const SingleValue = ({ children,...props } ) => (
        <components.SingleValue {...props}>
            <i className={`fa ${[props.data.value]} mr-2`}></i>
            {props.data.label}
        </components.SingleValue>
      );

    const fields = {

        title: {
            type: "text",
            label: "Title",
            col: 4,
            required: true,
        },

        type: {
            type: "advanceSelect",
            target: `${props.branchId}/virtualbtn-enums`,
            label: "Type",
            name: "type",
            optionLabel: 'title',
            optionId: 'id',
            col: 4,
            required: true,
            callback: onTypeChange
        },
        // time: {
        //     type: 'timeRange',
        //     label: 'Time',
        //     required: true,
        //     name: 'time',
        //     col: 4,
        // },
        //
        // weekdays: {
        //     type: 'advanceSelect',
        //     label: "Days",
        //     target: `${props.branchId}/week-day-list`,
        //     // async: true,
        //     name: 'weekdays',
        //     multi: true,
        //     required: true,
        //     col: 4
        // },
        slots: {
            type: 'advanceSelect',
            label: "Time Slots",
            target: `${props.branchId}/slot-filters/virtualbutton?limit=1000`,
            // async: true,
            multi:true,
            col: 4,
            callback:async (e)=>{
                await e
                setFullDay(e.value && e.value.length?"false":"true")
            },
            required:false
        },
        call_staff_id: {
            type: 'advanceSelect',
            label: `Select Staff`,
            target: `${props.branchId}/role-users/staff`,
            optionLabel: 'full_name',
            optionId: 'id',
            required: false,
            async: true,
            name: 'call_staff_id',
            col: 2,
            condition: isStaff
        },
        link: {
            type: "text",
            label: "Link",
            col: 3,
            condition: isLink,
            required: isLink,
        },
        custom_message: {
            type: "text",
            label: "Custom Message",
            col: 3,
            condition: isCustomMsg,
            required: isCustomMsg,
        },
        qty: {
            type: "number",
            label: "Quantity",
            col: 3,
            condition: isQty,
            required: isQty,
        },

        // priority_no: {
        //     type: "number",
        //     label: "Priority",
        //     col: 3,
        //     required: true
        // },
        Location:{
            type:'h4',
            value:'Location'
        },
        location_enabled: {
            type: "switch",
            label: "Enable On All Location",
            required: false,
            name:'location_enabled',
            col: 2,
            callback:async (e)=>{
                await e
                setIsLocation(e.value)
            }
        },
        location_ids: {
            type: "advanceSelect",
            label: "Location",
            target: `${props.branchId}/active/locations?limit=1000`,
            // optionLabel: 'title',
            async: true,
            multi:true,
            name: "location_ids",
            col: 3,
            condition:!isLocation
        },
       
        Formatting: {
            type: 'h4',
            value: 'Formatting',
        },

        font_color: {
            type: "color",
            label: "Font Color",
            defaultValue: "#000000",
            name: "font_color",
            col: 2,
            required: false

        },
        background_color: {
            type: "color",
            label: "background Color",
            defaultValue: "#ffffff",
            name: "background_color",
            col: 2,
            required: false
        },
        status_id: {
            type: "switch",
            label: "Status",
            // required: true,
            col: 2
        },
        // icon: {
        //     type: 'advanceSelect',
        //     label: `Select Icon`,
        //     options: fontAwesome,
        //     optionLabel: 'label',
        //     optionId: 'value',
        //     required: true,
        //     name: 'icon',
        //     col: 2,
        //     components:{ Option: IconOption,SingleValue }
        // },
        icon: {
            type: 'faselector',
            label: 'Select Icon',
            required: true,
            col: 2
        },
        shape: {
            type: 'advanceSelect',
            label: `Select Shape`,
            target: `${props.branchId}/virtualbtn-shapes`,
            optionLabel: 'name',
            optionId: 'id',
            required: true,
            name: 'shape',
            col: 2,
        },

    };
    const getInitialValues = async (data) => {
        await data;
        console.log(data.type, 'type');
        setIsStaff(data.type === 2)
        setIsLink(data.type === 3)
        setisCustomMsg(data.type === 4)
        setIsQty(data.type === 5)
        setIsLocation(data.location_enabled)
        setFullDay(data.slots && data.slots.length?"false":"true")

    }
    return (
        <Card className="animated fadeIn xl-12 lg-12 md-12 sm-12 xs-12">
            <CardHeader>
                {formPageTitle('Virtual Button', id)}
            </CardHeader>
            <CardBody>
                <FormGenerator
                    targetEntity={`${props.branchId}/virtual-button`}
                    // getValues={handleValue}
                    fields={fields}
                    targetId={id}
                    name={'buttonForm'}
                    // name={id ? "editForm" : ""}
                    // repeater={true}
                    getInitialValues={getInitialValues}
                    redirect="virtual-buttons"
                    extraVals={{full_day:fullDay}}
                    // debug={false}
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


export default connect(mapStateToProps, null)(ButtonAdd);
