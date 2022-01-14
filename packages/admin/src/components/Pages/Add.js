import React from "react";
import { FormGenerator } from "@evenlogics/whf-form-generator";
import { Card, CardBody } from "reactstrap";
import { Header } from "@evenlogics/whf-ra-components";

const Add = (props) => {
const {id} = props.match.params;
  let fields = {
    name: {
      type: "text",
      label: "Name",
      required: true,
      name: "name",
      col: 4,
    },
    // total_calls: {
    //   type: "number",
    //   label: "Total Calls",
    //   required: true,
    //   name: "total_calls",
    //   disabled:true,
    //   col: 4,
    // },
    description: {
      type: "text",
      label: "Description",
      required: true,
      name: "description",
      col: 4,
    },
    
    style_id: {
      type: "advanceSelect",
      label: "Select Style",
      target: "styles",
      // optionValue: "id",
      // optionLabel: "role_id",
      name: "style_id",
      col: 4,
      required: true,
    },
  message_box:{
    type: "switch",
    label: "Message",
    name: "message_box",
    required: true,
    col: 2,
  },
  customer_required:{
    type: "switch",
    label: "Customer Required",
    required: true,
    name: "customer_required",
    col: 2,
  },
 
    // last_used: {
    //   type: "date",
    //   label: "Last Used",
    //   name: "last_used",
    //   required: true,
    //   col: 4,
    // },

    // branch_id: {
    //   type: "advanceSelect",
    //   label: "Branch",
    //   target: 'branches',
    //   async: true,
    //   name: "branch_id",
    //   required: true,
    //   col: 4,
    // },
  
    // location_id: {
    //   type: "advanceSelect",
    //   label: "Select Location",
    //   target: "locations",
    //   // optionValue: "id",
    //   // optionLabel: "role_id",
    //   name: "location_id",
    //   col: 4,
    //   required: true,
    // },

 
    // logo:{
    //   type:"filePic",
    //   name: "logo",
    //   col: 4,
    //   required: true,
    // }
  };

  return (
    <div>
      <Card className="animated fadeIn">
        <Header title="Add New Area" />
        <CardBody>
          <FormGenerator
            targetEntity="pages"
            // getValues={this.handleValue}
            fields={fields}
            targetId={id}
            name="pages"
            repeater={true}
            initialValues={props.location.aboutProps}
            redirect="pages/page"
            handleSameValueFields={["name"]}
          />
        </CardBody>
      </Card>
    </div>
  );
};

export default Add;
