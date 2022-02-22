import React, {useEffect} from "react";
import {FormGenerator} from "@evenlogics/whf-form-generator";
import {Card, CardBody} from "reactstrap";
import {Header} from "@evenlogics/whf-ra-components";
import {connect} from "react-redux";

const Add = (props) => {

    useEffect(() => {
    }, [props.branchId]);

    const {id} = props.match.params;
    let fields = {
        title: {
            type: "text",
            label: "Category Title",
            required: true,
            col: 3,
        },
        sub_title: {
            type: "text",
            label: "Category Sub Title",
            required: true,
            col: 3,
        },
        sort_order: {
            type: "number",
            label: "Sort Order",
            defaultValue: 10,
            col: 3,
        },
        status: {
            type: "switch",
            label: "Status",
            required: true,
            col: 2
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
                <Header title="Add New Category"/>
                <CardBody>
                    <FormGenerator
                        targetEntity={`${props.branchId}/categories`}
                        fields={fields}
                        targetId={id}
                        name="categories"
                        // getInitialValues={this.getInitialValues}
                        // debug={false}
                        extraVals={extraVal}
                        // extraVals={{branch_id:props.branchId}}
                        redirect="categories"
                    />
                </CardBody>
            </Card>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        branchId: state.selectedBranchId,
    }
}


export default connect(mapStateToProps, null)(Add);