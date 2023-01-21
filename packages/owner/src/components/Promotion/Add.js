import React, {useEffect,useState} from "react";
import {FormGenerator} from "@evenlogics/whf-form-generator";
import {Card, CardBody} from "reactstrap";
import {Header} from "@evenlogics/whf-ra-components";
import {connect} from "react-redux";
import {formPageTitle} from "@facepays/common";

const Add = (props) => {
    const [minDate, setMinDate] = useState('');


    useEffect(() => {
    }, [props.branchId]);


    const {id} = props.match.params;
    let fields = {
        title: {
            type: "text",
            label: "Title",
            required: true,
            name: "title",
            col: 3,
        },
        headline: {
            type: "text",
            label: "Sub Title",
            // required: true,
            name: "headline",
            col: 3,
        },
        link: {
            type: "text",
            label: "Link",
            // required: true,
            name: "link",
            col: 3,
        },
        category_id: {
            type: "advanceSelect",
            label: "Select Category",
            target: `${props.branchId}/active/category`,
            optionLabel: "name",
            name: "category_id",
            async: true,
            col: 3,
            required: true,
        },
        description: {
            type: "text",
            label: "Description",
            // required: true,
            name: "description",
            col: 4,
        },
        dummy3: {
            col: 8,
            isDummyField: true
        },


        valid_from:{
            type:"date",
            label:"Select From",
            col: 3,
            minDate:new Date(),
            getValue:(data) => {
                setTimeout(() => {
                setMinDate(data?.value)
            }, 0)
        }
        },
        valid_till:{
            type:"date",
            label:"Select To",
            col: 3,
            placeholderText: minDate ? "" : "Please select the start date",
            disabled:minDate ? false : true,
            minDate:minDate,
        },
        // time: {
        //     type: 'timeRange',
        //     label: 'Time',
        //     // required: true,
        //     name: 'time',
        //     col: 4,
        // },

        slots: {
            type: 'advanceSelect',
            label: "Time Slots",
            target: `${props.branchId}/slot-filters/promotion`,
            // async: true,
            multi:true,
            required: true,
            col: 4
        },

        dummy2: {
            col: 3,
            isDummyField: true
        },

        // weekdays: {
        //     type: 'advanceSelect',
        //     label: "Days",
        //     target: `${props.branchId}/week-day-list`,
        //     // async: true,
        //     multi:true,
        //     // required: true,
        //     col: 6,
        // },

        location_id: {
            type: "advanceSelect",
            label: "Select Location",
            name: "location_id",
            target: `${props.branchId}/active/locations`,
            // required: true,
            multi:true,
            async: true,
            col: 4
        },


        dummy: {
            col: 6,
            isDummyField: true
        },

        status: {
            type: "switch",
            label: "Status",
            required: true,
            name:"status",
            col: 12,
        },

        // "Media Details": {
        //     isDummyField: true,
        //     type: "h4",
        //     col: 12,
        //   },
        promotion_image: {
            type: "filePic",
            label: "Promotion Banner",
            name: "promotion_image",
            // required: id ? false : true,
            col: 4,
        },

    };
    const extraVal = id ? {
        _method: "PUT",
        branch_id: props.branchId
    } : {
        branch_id: props.branchId
    };
    return (
        <div>
            <Card className="animated fadeIn">
                <Header title={formPageTitle('Promotion', id)}/>
                <CardBody>
                    <FormGenerator
                        targetEntity={`${props.branchId}/promotions`}
                        fields={fields}
                        targetId={id}
                        name={id ? "editForm" : ""}
                        // getInitialValues={this.getInitialValues}
                        // debug={false}
                        extraVals={extraVal}
                        // extraVals={{branch_id:props.branchId}}
                        redirect="promotions"
                    />
                </CardBody>
            </Card>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        branchId: state.selectedBranchId,
        companyName: state.companyName,
        companyId: state.companyId,
        userRole: state.userRole
    }
}


export default connect(mapStateToProps, null)(Add);
