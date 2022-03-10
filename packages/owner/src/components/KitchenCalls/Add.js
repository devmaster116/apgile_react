import React, {useState} from "react";
import {FormGenerator} from "@evenlogics/whf-form-generator";
import {Card, CardBody} from "reactstrap";
import {Header} from "@evenlogics/whf-ra-components";
import {connect} from "react-redux";
import {formPageTitle} from "@facepays/common";


const Add = (props) => {

    const {id} = props.match.params;
    const [showArea, setShowArea] = useState(false);
    let fields = {
      location_id: {
        type: "advanceSelect",
        label: "Select Location",
        name: "location_id",
        target: `${props.branchId}/locations`,
        required: true,
        async:true,
        col: 4,
        callback: () => setShowArea(true),
      },


      ...(showArea && {
        area_id: {
            type: "advanceSelect",
            label: "Select Area",
            name: "area_id",
            target: `${props.branchId}/areas`,
            required: true,
            async:true,
            disabled:showArea === false ? true : false,
            col: 4,
          },
      })


    };

    return (
        <div>
            <Card className="animated fadeIn">
                <Header title={formPageTitle("Kitchen Call", id)} />
                <CardBody>
                    <FormGenerator
                        targetEntity={`${props.branchId}/add-kitchen-call`}
                        fields={fields}
                        targetId={id}
                        name={id ? "editForm" : ""}
                        repeater={true}
                        redirect="kitchen-calls"
                        extraVals={{branch_id: props.branchId}}
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

    }
}


export default connect(mapStateToProps, null)(Add);
