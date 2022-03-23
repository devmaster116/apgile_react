import React, {useState} from 'react';
import {Card, CardBody, CardHeader} from 'reactstrap';
import {FormGenerator} from '@evenlogics/whf-form-generator';
import {connect} from "react-redux";
import {timezonesOptions} from '@facepays/common';


const Add = (props) => {

    const [showPlaces, setShowPlaces] = useState(false);
    const id = props.branchId;

    // const showInternalPlaces = (data) => {
    //     if (typeof data.value !== 'undefined' && data.value)
    //         setShowPlaces(false);
    //     else
    //         setShowPlaces(true);
    // }
console.log(showPlaces,"showPlaces")
    const getInitialValues = (data) => {
        setShowPlaces(data.internal_active);
    }

    const fields = {
        qrcode_details: {
            type: "switch",
            label: "Show location on QR Codes",
            // required: true,
            col: 3,
        },

        wait_time: {
            type: "number",
            label: "Wait Time",
            required: true,
            name: "wait_time",
            // groupClass: "col-xxl-2 col-xl-2 col-md-3 col-sm-6",
            col: 2,
            min: 0
        },
        throttle_wait: {
            type: "number",
            label: "Throttle Wait",
            // groupClass: "col-xxl-2 col-xl-2 col-md-3 col-sm-6",
            required: true,
            name: "throttle_wait",
            col: 2,
            min: 0

        },
        // escalation_hop: {
        //     type: "number",
        //     label: "Escalation Hop",
        //     // required: true,
        //     name: "escalation_hop",
        //     col: 3,
        //     min: 0
        //
        // },
        // cycle: {
        //     type: "number",
        //     label: "Cycle",
        //     required: true,
        //     name: "cycle",
        //     col: 1,
        //     min: 0

        // },




        "Site Content": {
            isDummyField: true,
            type: "h4",
            col: 12,
        },

        page_title: {
            type: "text",
            label: "Title",
            // required: true,
            col: 3,
        },

        page_subtitle: {
            type: "text",
            label: "Sub Title",
            // required: true,
            col: 3,
        },

        // page_footer: {
        //     type: "text",
        //     label: "Footer Text",
        //     // required: true,
        //     col: 3,
        // },

        timezone: {
            type: "advanceSelect",
            label: "Timezone",
            name: "timezone",
            required: true,
            options: timezonesOptions(),
            col: 3,
        },

        "Social Media Links": {
            isDummyField: true,
            type: "h4",
            col: 12,
        },
        facebook: {
            type: "text",
            label: "Facebook",
            // required: true,
            name: "facebook",
            col: 6,
        },
        instagram: {
            type: "text",
            label: "Instagram",
            // required: true,
            name: "instagram",
            col: 6,
        },
        linkedin: {
            type: "text",
            label: "Linkedin",
            // required: true,
            name: "linkedin",
            col: 6,
        },
        youtube: {
            type: "text",
            label: "Youtube",
            // required: true,
            name: "youtube",
            col: 6,
        },
        reddit: {
            type: "text",
            label: "Reddit",
            // required: true,
            name: "reddit",
            col: 6,
        },
        pinterest: {
            type: "text",
            label: "Pinterest",
            // required: true,
            name: "pinterest",
            col: 6,
        },
        twitter: {
            type: "text",
            label: "Twitter",
            // required: true,
            name: "twitter",
            col: 6,
        },

        // "Internal Calls": {
        //     isDummyField: true,
        //     type: "h4",
        //     col: 12,
        //     condition: showPlaces
        // },

        // internal_active: {
        //     type: "switch",
        //     label: "Activate Internal Calls",
        //     name: "internal_active",
        //     // required: true,
        //     col: 12,
        //     callback: (data) => showInternalPlaces(data)
        // },
    };

    // if(showPlaces) {
    //     fields['internal_places'] = {
    //         type: "dynamicFields",
    //         label: "Internal Places",
    //         name: "internal_places",
    //         // required: true,
    //         col: 4,
    //         condition: true,
    //         schema: {
    //             name: {
    //                 type: "text",
    //                 label: "",
    //                 // required: true,
    //                 col: 12,
    //             }
    //         }
    //     }
    // }

    return (
        <Card className="animated fadeIn xl-12 lg-12 md-12 sm-12 xs-12">
            <CardHeader>
                Branch Settings
            </CardHeader>
            <CardBody>
                <FormGenerator
                    targetEntity={`${props.branchId}/setting`}
                    // getValues={this.handleValue}
                    fields={fields}
                    targetId={id}
                    name={id ? "editForm" : ""}
                    repeater={true}
                    // initialValues={props.location.aboutProps}
                    extraVals={{branch_id: props.branchId}}
                    redirect="settings"
                    // debug={true}
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


export default connect(mapStateToProps, null)(Add);
