import React, {useState} from "react";
import {FormGenerator} from "@evenlogics/whf-form-generator";
import {Card, CardBody} from "reactstrap";
import {Header} from "@evenlogics/whf-ra-components";
import {connect} from "react-redux";
// import {formPageTitle} from "@facepays/common";

const Add = (props) => {

    const {id} = props.match.params;
    const [showArea, setShowArea] = useState(false);
    const [targetPoint, setTargetID] = useState(id ? `${props.branchId}/items-page/${id}/0` : `${props.branchId}/items-pages`);

    const locationChangeHandler = async (data) => {
        await data;
        console.log(data.value);
        if(data.value) {
            setTargetID(`${props.branchId}/items-page/${data?.value}/0`);
            setShowArea(true);
        } else {
            setShowArea(false);
        }
    }

    let fields = {
        internal_place: {
            type: "advanceSelect",
            label: "Select Call Venue",
            target: `${props.branchId}/call-places`,
            optionValue: 'name',
            required: true,
            async: true,
            col: 3,
        },

        location_id: {
            type: "advanceSelect",
            label: "Select Location",
            name: "location_id",
            target: props?.userRole === "supervisor" ? `${props?.branchId}/supervisor-locations` : `${props?.branchId}/locations`,
            required: true,
            async: true,
            col: 3,
            callback: (data) => locationChangeHandler(data),
        },

        page_id: {
            type: "advanceSelect",
            label: "Item#",
            name: "page_id",
            target: targetPoint,
            condition: showArea,
            required: true,
            async: true,
            col: 3,
        },


    };

    return (
        <div>
            <Card className="animated fadeIn">
                <Header title="Make New Internal Call"/>
                <CardBody>
                    <FormGenerator
                        targetEntity={`${props.branchId}/internal-call`}
                        fields={fields}
                        targetId={id}
                        name={id ? "editForm" : ""}
                        repeater={true}
                        redirect="internal"
                        extraVals={{branch_id: props.branchId}}
                        successCallback={props.successCallback}
                        // getInitialValues={getInitialValues}
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
        userRole: state.userRole
    }
}


export default connect(mapStateToProps, null)(Add);
