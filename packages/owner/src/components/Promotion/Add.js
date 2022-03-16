import React, {useEffect} from "react";
import {FormGenerator} from "@evenlogics/whf-form-generator";
import {Card, CardBody} from "reactstrap";
import {Header} from "@evenlogics/whf-ra-components";
import {connect} from "react-redux";
import {formPageTitle} from "@facepays/common";

const Add = (props) => {

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
            target: `${props.branchId}/categories`,
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
        status: {
            type: "switch",
            label: "Status",
            required: true,
            name:"status",
            col: 8,
        },

        weekdays: {
            type: 'advanceSelect',
            label: "Week Day",
            target: `${props.branchId}/week-day-list`,
            // async: true,
            multi:true,
            // required: true,
            col: 2,
        },

        valid_from: {
            type: 'date',
            label: 'Start Date',
            // required: true,
            col: 2
        },

        valid_till: {
            type: 'date',
            label: 'End Date',
            // required: true,
            col: 2
        },

        time: {
            type: 'timeRange',
            label: 'Time',
            // required: true,
            name: 'time',
            col: 3,
        },


        dummy: {
            col: 3,
            isDummyField: true
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
