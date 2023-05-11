import React, { useState, useEffect } from 'react';
import { Card, CardBody, CardHeader } from 'reactstrap';
import { FormGenerator } from '@evenlogics/whf-form-generator';
import { connect } from "react-redux";
import { formPageTitle } from "@facepays/common";
import Api from '@evenlogics/whf-api'
const ButtonAdd = (props) => {

    // const [locationAndArea, setlocationAndArea] = useState({location:'',area:''})
    const [query, setQuery] = useState(false);
    // const [openQrCode, setsw] = useState(false);
    const [fullDay, setFullDay] = useState("true")
    useEffect(() => {
        setQuery((prev) => !prev)
    }, [props.branchId]);
    console.log(query, "query")
    const { id } = props.match.params;
    // const setValueForLocationAndArea=async (id,setFieldValue)=>{
    //     try {
    //         const { data } = await Api.request('get', `/${props.branchId}/button/info/${id}`)
    //         setFieldValue('area', data.area_page.area.name)
    //         setFieldValue('location', data.location.name) 
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }
    const [selectedLoc, setselectedLoc] = useState(null)
    const [selectedArea, setselectedArea] = useState(null)
    const fields = {
        location: {
            type: "advanceSelect",
            label: "Locations",
            target: `${props?.branchId}/locations?limit=1000`,
            // optionLabel: 'title',
            async: true,
            required: true,
            name: "location",
            col: 6,
            callback:async(data)=>{
                await data
                setselectedLoc(data.value)
                }
          },
          area: {
            type: "advanceSelect",
            label: "Areas",
            target: `${props?.branchId}/areas?limit=1000&location_id=${selectedLoc}`,
            // optionLabel: 'title',
            async: true,
            required: true,
            name: "area",
            col: 6,
            callback:async(data)=>{
                await data
                setselectedArea(data.value)
                }
          },
        ...(selectedArea && {
            page_id: {
                type: "advanceSelect",
                label: "Select Item Type",
                target: `${props.branchId}/area/${selectedArea}?limit=1000`,
                required: true,
                async: true,
                col: 4,
            },
        }),
        // location: {
        //     type: 'text',
        //     disabled: true,
        //     label: 'location',
        //     readonly: true,
        //     col: 4,
        //     defaultValue:locationAndArea.location
        // },
        // area: {
        //     type: 'text',
        //     disabled: true,
        //     label: 'area',
        //     readonly: true,
        //     col: 4,
        //     defaultValue:locationAndArea.area

        // },
        virtual_button_id: {
            type: 'advanceSelect',
            label: "Virtual Button",
            target: `${props.branchId}/virtual-button-physical`,
            // async: true,
            // multi:true,
            optionLabel: "title",
            col: 4
        },
        slots: {
            type: 'advanceSelect',
            label: "Time Slots",
            target: `${props.branchId}/slot-filters/virtualbutton?limit=1000`,
            // async: true,
            multi: true,
            col: 4,
            callback: async (e) => {
                await e
                setFullDay(e.value && e.value.length ? "false" : "true")
            },
            required: false
        },
        // total_click: {
        //     type: "number",
        //     label: "Total Clicks",
        //     col: 2,
        //     required:true
        // },
        message: {
            type: "textarea",
            label: "Message",
            col: 6
        },

        status: {
            type: "switch",
            label: "Status",
            // required: true,
            col: 2
        },
        dummy: {
            col: 5,
            isDummyField: true
        },

    };

    const getInitialValues=(values)=>{
        // setlocationAndArea({location:values.location.name,area:values.area.name})
    }

    return (
        <Card className="animated fadeIn xl-12 lg-12 md-12 sm-12 xs-12">
            <CardHeader>
                {formPageTitle('Button', id)}
            </CardHeader>
            <CardBody>
                <FormGenerator
                    targetEntity={`${props.branchId}/buttons`}
                    getInitialValues={getInitialValues}
                    fields={fields}
                    targetId={id}
                    name={id ? "editForm" : ""}
                    // repeater={true}
                    // initialValues={locationAndArea}
                    redirect="buttons"
                    // debug={true}
                    // handleSameValueFields={['title', 'slug']}
                    extraVals={{ full_day: fullDay }}
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
