import React, {useEffect} from "react";
import {FormGenerator} from "@evenlogics/whf-form-generator";
import {Card, CardBody} from "reactstrap";
import {Header} from "@evenlogics/whf-ra-components";
import {connect} from "react-redux";
import {formPageTitle} from "@facepays/common";
import fontAwesome from '../VirtualButtons/fontAwesome.json'
const Add = (props) => {

    useEffect(() => {
    }, [props.branchId]);

    const {id} = props.match.params;
    let fields = {
        name: {
            type: "text",
            label: "Name",
            required: true,
            col: 3,
        },
        title: {
            type: "text",
            label: "Title",
            required: true,
            col: 3,
        },
        sub_title: {
            type: "text",
            label: "Sub Title",
            // required: true,
            col: 3,
        },
        sort_order: {
            type: "number",
            label: "Sort Order",
            // defaultValue: 10,
            condition: false,
            min:0,
            col: 2,
        },
        dummy: {
            col: 2,
            isDummyField: true
        },
        status: {
            type: "switch",
            label: "Status",
            required: true,
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
        //     col: 4,
        // },

        icon: {
            type: 'faselector',
            label: `Select Icon`,
            required: true,
            name: 'icon',
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
                <Header title={formPageTitle('Category', id)} />
                <CardBody>
                    <FormGenerator
                        targetEntity={`${props.branchId}/categories`}
                        fields={fields}
                        targetId={id}
                        name={id ? "editForm" : ""}
                        // getInitialValues={this.getInitialValues}
                        // debug={true}
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
