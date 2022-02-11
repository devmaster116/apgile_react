import React from "react";
import { FormGenerator } from "@evenlogics/whf-form-generator";
import { Card, CardBody } from "reactstrap";
import { Header } from "@evenlogics/whf-ra-components";

const Add = (props) => {
const {id} = props.match.params;

  let fields = {
    "Add Company Style": {
      isDummyField: true,
      type: "h4",
      col: 12,
    },
    company_id: {
      type: "advanceSelect",
      label: "Select Company",
      target: 'companies?limit=1000',
      async: true,
      name: "company_id",
      required: true,
      col: 4,
    },

    "Style Details": {
      isDummyField: true,
      type: "h4",
      col: 12,
    },

    name: {
      type: "text",
      label: "Title",
      required: true,
      name: "name",
      col: 4,
    },
    font_color: {
      type: "text",
      label: "Font",
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

    "Media": {
      isDummyField: true,
      type: "h4",
      col: 12,
    },

    logo: {
      type: "filePic",
      label: "Add Logo",
      name: "logo",
      required: true,
      col: 4,
    },
    bg_image:{
      type: "filePic",
      label: "Add Background Image",
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
            redirect="/owner/styles"
            handleSameValueFields={["title", "slug"]}
          />
        </CardBody>
      </Card>
    </div>
  );
};

export default Add;
