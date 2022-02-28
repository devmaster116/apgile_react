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
            type: "textarea",
            label: "Description",
            // required: true,
            name: "description",
            col: 4,
        },
        promotion_image: {
            type: "filePic",
            label: "Promotion Banner",
            name: "promotion_image",
            required: true,
            col: 4,
        },
        status: {
            type: "switch",
            label: "Status",
            required: true,
            name:"status",
            col: 2
        }
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
                <Header title={formPageTitle('Section', id)}/>
                <CardBody>
                    <FormGenerator
                        targetEntity={`${props.branchId}/promotions`}
                        fields={fields}
                        targetId={id}
                        name="promotions"
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
