import React, {useState, useEffect} from "react";
import {FormGenerator} from "@evenlogics/whf-form-generator";
import {Card, CardBody} from "reactstrap";
import {Header} from "@evenlogics/whf-ra-components";
import {connect} from "react-redux";
import {formPageTitle} from "@facepays/common";


const Add = (props) => {

    const {id} = props.match.params;
    const [targetPoint, setTargetID] = useState(id ? `${props.branchId}/items-page/${id}` : `${props.branchId}/items-pages`);
    // const [options, setOptions] = useState([]);


    useEffect(() => {
    }, [props.branchId]);

    const locationChangeHandler = (data) => {
        setTimeout(() => {
            // setTargetID(`${props.branchId}/location/${data?.value}/items`)
            setTargetID(`${props.branchId}/items-page/${data?.value}`)

        }, 10);
    }

    // console.log(options,"options");
    let fields = {
      name: {
        type: "text",
        label: "Name",
        required: true,
        name: "name",
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
        target: `${props.branchId}/locations`,
        required: true,
        // multi:true,
        async: true,
        col: 4,
        callback: (data) => locationChangeHandler(data),
      },

      page_id: {
        type: "advanceSelect",
        label: "Item#",
        name: "page_id",
        target: targetPoint,
        required: true,
        async: true,
        multi: true,
        col: 4,
      },
    };

    return (
        <div>
            <Card className="animated fadeIn">
                <Header title={formPageTitle("Area", id)} />
                <CardBody>
                    <FormGenerator
                        targetEntity={`${props.branchId}/areas`}
                        fields={fields}
                        targetId={id}
                        name={id ? "editForm" : ""}
                        repeater={true}
                        redirect="areas"
                        extraVals={{branch_id: props.branchId}}
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
