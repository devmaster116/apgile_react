import React from "react";
import { FormGenerator } from "@evenlogics/whf-form-generator";
import { Card, CardBody } from "reactstrap";
import { Header } from "@evenlogics/whf-ra-components";

const Add = (props) => {
const {id} = props.match.params;
  let fields = {
    // style_id: {
    //   type: "advanceSelect",
    //   label: "Select Style",
    //   target: 'styles',
    //   async: true,
    //   name: "style_id",
    //   required: true,
    //   col: 4,
    // },
    company_id: {
      type: "advanceSelect",
      label: "Select Company",
      target: 'companies',
      async: true,
      name: "company_id",
      required: true,
      col: 4,
    },
    name: {
      type: "text",
      label: "Name",
      required: true,
      name: "name",
      col: 4,
    },
    font_color: {
      type: "text",
      label: "Font Color",
      required: true,
      name: "font_color",
      col: 4,
    },
    bg_color: {
      type: "text",
      label: "Background Color",
      required: true,
      name: "bg_color",
      col: 4,
    },
    // other: {
    //   type: "text",
    //   label: "Others",
    //   name: "other",
    //   required: true,
    //   col: 4,
    // },

    logo: {
      type: "filePic",
      label: "Logo",
      name: "logo",
      required: true,
      col: 4,
    },
    bg_image:{
      type: "filePic",
      label: "Background Image",
      name: "bg_image",
      required: true,
      col: 4,
    },
  };

  return (
    <div>
      <Card className="animated fadeIn">
        <Header title="Add New Style" />
        <CardBody>
          <FormGenerator
            targetEntity="styles"
            // getValues={this.handleValue}
            fields={fields}
            targetId={id}
            name="styles"
            repeater={true}
            initialValues={props.location.aboutProps}
            redirect="pages/styles"
            handleSameValueFields={["title", "slug"]}
          />
        </CardBody>
      </Card>
    </div>
  );
};

export default Add;
