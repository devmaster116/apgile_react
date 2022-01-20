import React,{useState} from "react";
import { FormGenerator } from "@evenlogics/whf-form-generator";
import { Card, CardBody } from "reactstrap";
import { Header } from "@evenlogics/whf-ra-components";

const Add = (props) => {

  const [targetPoint, setTargetID] = useState(`items/19/pages`);
  const { id } = props.match.params;

  const handleTarget = (row,col)=> {
    setTimeout(() => {
     console.log(col?.value,'kkk');
     setTargetID(`items/${col?.value}/pages`)
    }, 1000);
   
  } 
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

    branch_id: {
      type: "advanceSelect",
      label: "Select Branch",
      target: "branches",
      name: "branch_id",
      col: 4,
      required: true,
    },
    user_id: {
      type: 'advanceSelect',
      label: "Users",
      target: 'users',
      optionLabel: 'username',
      required: true,
      // async: true,
      // multi:true,
      name: 'user_id',
      col: 4
  },
    area: {
      type: "dynamicFields",
      condition: true,
      label: "Area",
      name: "area",
      col: 4,
      schema: {
        item_id: {
          type: "advanceSelect",
          label: "Select Item Type",
          target: "items",
          name: "item_id",
          col: 6,
          optionValue: 'id',
          optionLabel: 'name',
          async:true,
          callback : (row,col) => handleTarget(row,col)
        },
        page_id: {
          type: "advanceSelect",
          label: "Item#",
          name: "page_id",
          target:targetPoint,
          required: true,
          key:'target',
          optionValue: 'id',
          optionLabel: 'name',
          col: 6,
          async:true
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
        <Header title="Add New Area"/>
        <CardBody>
          <FormGenerator
            targetEntity="areas"
            // getValues={this.handleValue}
            fields={fields}
            targetId={id}
            name="areas"
            repeater={true}
            // initialValues={props.location.aboutProps}
            redirect="pages/area"
            // handleSameValueFields={["name"]}
          />
        </CardBody>
      </Card>
    </div>
  );
};

export default Add;
