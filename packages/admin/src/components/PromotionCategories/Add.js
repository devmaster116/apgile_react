import React from "react";
import { FormGenerator } from "@evenlogics/whf-form-generator";
import { Card, CardBody } from "reactstrap";
import { Header } from "@evenlogics/whf-ra-components";

const Add = (props) => {

 
const {id} = props.match.params;

  let fields = {
    title: {
      type: "text",
      label: "Category Title",
      required: true,
      col: 4,
    },
    sub_title: {
      type: "text",
      label: "Category Sub Title",
      required: true,
      col: 4,
    },

    branch_id: {
      type: "advanceSelect",
      label: "Select Branch",
      target: "branches?limit=10000",
      async: true,
      name: "branch_id",
      required: true,
      col: 4,
      }
  };


  return (
    <div>
      <Card className="animated fadeIn">
        <Header title="Add New Category" />
        <CardBody>
          <FormGenerator
            targetEntity="categories"
            fields={fields}
            targetId={id}
            name="categories"
            // getInitialValues={this.getInitialValues}
            // debug={false}
            // extraVals={extraVal}
            // extraVals={{branch_id:props.branchId}}
            redirect="categories"
          />
        </CardBody>
      </Card>
    </div>
  );
};




export default Add;