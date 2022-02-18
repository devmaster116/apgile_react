import React from "react";
import { FormGenerator } from "@evenlogics/whf-form-generator";
import { Card, CardBody } from "reactstrap";
import { Header } from "@evenlogics/whf-ra-components";

const Add = (props) => {
const {id} = props.match.params;
  let fields = {
    title: {
      type: "text",
      label: "Title",
      required: true,
      name: "title",
      col: 4,
    },
    headline: {
      type: "text",
      label: "Headline",
      required: true,
      name: "headline",
      col: 4,
    },
    link: {
      type: "text",
      label: "Link",
      required: true,
      name: "link",
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
      target: "branches?limit=1000",
      optionLabel: "name",
      name: "branch_id",
      col: 4,
      required: true,
    },
    category_id: {
      type: "advanceSelect",
      label: "Select Category",
      target: "categories?limit=1000",
      optionLabel: "title",
      name: "category_id",
      col: 4,
      required: true,
    },
    valid_from: {
      type: "date",
      dateFormat:'yyyy/MM/dd',
      label: "Valid From",
      name: "valid_from",
      // required: true,
      col: 4,
    },

    valid_till: {
      type: "date",
      dateFormat:"yyyy/MM/dd",
      label: "Valid Until",
      name: "valid_till",
      // required: true,
      col: 4,
    },
    promotion_image: {
      type: "filePic",
      label: "Promotion Image",
      name: "promotion_image",
      // required: true,
      col: 4,
    },
  
  };

  return (
    <div>
      <Card className="animated fadeIn">
        <Header title="Add New Promotion" />
        <CardBody>
          <FormGenerator
            targetEntity="promotions"
            fields={fields}
            targetId={id}
            name="promotions"
            // getInitialValues={this.getInitialValues}
            // debug={false}
            // extraVals={extraVals}
            redirect="promotions"
            // repeater={true}
          />
        </CardBody>
      </Card>
    </div>
  );
};

export default Add;
