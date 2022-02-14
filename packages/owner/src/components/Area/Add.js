import React,{useState,useEffect} from "react";
import { FormGenerator } from "@evenlogics/whf-form-generator";
import { Card, CardBody } from "reactstrap";
import { Header } from "@evenlogics/whf-ra-components";
import api from "@evenlogics/whf-api";
import {connect} from "react-redux";


const Add = (props) => {

  // const [targetPoint, setTargetID] = useState(`items/19/pages`);
  const { id } = props.match.params;
  const [options, setOptions] = useState([]);


  useEffect(() => {
    console.log("working render");
  }, [props.branchId]);
  

  console.log(options,"options");
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
      type: 'advanceSelect',
      label: "Users",
      target: `${props.branchId}/users`,
      optionLabel: 'username',
      required: true,
      // async: true,
      multi:true,
      name: 'user_id',
      col: 4
  },
    area: {
      type: "dynamicFields",
      condition: true,
      label: "Area",
      name: "area",
      col: 12,
      schema: {
        page_id: {
          type: "advanceSelect",
          label: "Item#",
          name: "page_id",
          target:`${props.branchId}/items-pages`,
          required: true,
          // optionValue: 'id',
          // optionLabel: 'name',
          col: 12,
        },
    
      },
    },
    message_box: {
      type: "switch",
      label: "Message",
      name: "message_box",
      required: true,
      col: 2,
    },
    customer_required: {
      type: "switch",
      label: "Customer Required",
      required: true,
      name: "customer_required",
      col: 2,
    },
  };

  return (
    <div>
      <Card className="animated fadeIn">
        <Header title="Add New Area"/>
        <CardBody>
          <FormGenerator
            targetEntity={`${props.branchId}/areas`}
            fields={fields}
            targetId={id}
            name="areas"
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
    branchId : state.selectedBranchId,
    companyId : state.companyId,

    }
}


export default connect(mapStateToProps,null)(Add);