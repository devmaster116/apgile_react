import React, {useState, useEffect} from "react";
import {FormGenerator} from "@evenlogics/whf-form-generator";
import {Card, CardBody} from "reactstrap";
import {Header} from "@evenlogics/whf-ra-components";
import {connect} from "react-redux";
import {formPageTitle} from "@facepays/common";


const Add = (props) => {

    const {id} = props.match.params;
    const [targetPoint, setTargetID] = useState(id ? `${props.branchId}/items-page/${id}` : `${props.branchId}/items-pages`);
    const [showItem, setShowItem] = useState(id ? '' : 'd-none');


    useEffect(() => {
    }, [props.branchId]);

    const locationChangeHandler = (data) => {
        setTimeout(() => {
            setTargetID(`${props.branchId}/location/${data?.value}/items`)
            if (data?.value) {
                setShowItem('')
            } else {
                setShowItem('d-none')
            }
            // location/{id}/items
            // setTargetID(`${props.branchId}/items-pages`)
        }, 10);
    }

    // console.log(options,"options");
    let fields = {
        area_name: {
            type: "text",
            label: "Name",
            required: true,
            col: 4,
        },

        description: {
            type: "text",
            label: "Description",
            // required: true,
            name: "description",
            col: 4,
        },

        // branch_id: {
        //   type: "advanceSelect",
        //   label: "Select Branch",
        //   target:`owner/${props.companyId}/all`,
        //   name: "branch_id",
        //   col: 4,
        //   required: true,
        // },
        user_id: {
            type: "advanceSelect",
            label: "Team Members",
            // target: `${props.branchId}/users`,
            target: `${props.branchId}/role-users/staff`,
            optionLabel: "full_name",
            optionValue: "id",
            key: "full_name",

            // optionId: 'id',
            required: true,
            // async: true,
            multi: true,
            name: "user_id",
            col: 4,
        },
        location_id: {
            type: "advanceSelect",
            label: "Select Location",
            name: "location_id",
            target: `${props.branchId}/active/locations`,
            required: true,
            // multi:true,
            async: true,
            col: 4,
            callback: (data) => locationChangeHandler(data),
        },

        page_id: {
            type: "advanceSelect",
            label: "Items",
            name: "page_id",
            groupClass: showItem,
            target: targetPoint,
            required: true,
            async: true,
            multi: true,
            col: 4,
        },

        slots: {
            type: 'advanceSelect',
            label: "Time Slots",
            target: `${props.branchId}/slot-filters/area`,
            // async: true,
            multi:true,
            required: true,
            col: 4
        },
    };

    return (
        <div>
            <Card className="animated fadeIn">
                <Header title={formPageTitle("Area", id)}/>
                <CardBody>
                    <FormGenerator
                        targetEntity={`${props.branchId}/areas`}
                        fields={fields}
                        targetId={id}
                        name={id ? "editForm" : ""}
                        repeater={true}
                        redirect="areas"
                        extraVals={{branch_id: props.branchId}}
                        // successCallback={successCallback}
                    />
                </CardBody>
            </Card>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        branchId: state.selectedBranchId,
        companyId: state.companyId,

    }
}


export default connect(mapStateToProps, null)(Add);
