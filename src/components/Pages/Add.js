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
    total_calls: {
      type: "number",
      label: "Total Calss",
      required: true,
      name: "total_calls",
      col: 4,
    },
    description: {
      type: "text",
      label: "Description",
      required: true,
      name: "description",
      col: 4,
    },
    last_used: {
      type: "date",
      label: "Last Used",
      name: "last_used",
      required: true,
      col: 4,
    },

    branch_id: {
      type: "advanceSelect",
      label: "Branch",
      target: 'branches?title=%s',
      async: true,
      name: "branch_id",
      required: true,
      col: 4,
    },
    message_box:{
      type: "text",
      label: "Message",
      name: "message_box",
      required: true,
      col: 4,

    },
    location_id: {
      type: "advanceSelect",
      label: "Select Location",
      target: "locations",
      // optionValue: "id",
      // optionLabel: "role_id",
      name: "location_id",
      col: 4,
      required: true,
    },
    log:{
      type:"filePic",
      name: "log",
      col: 4,
      required: true,
    }
  };

  return (
    <div>
      <Card className="animated fadeIn">
        <Header title="Add New Page" />
        <CardBody>
          <FormGenerator
            targetEntity="pages"
            // getValues={this.handleValue}
            fields={fields}
            targetId={id}
            name="pages"
            repeater={true}
            initialValues={props.location.aboutProps}
            redirect="/pages"
            handleSameValueFields={["title", "slug"]}
          />
        </CardBody>
      </Card>
    </div>
  );
};

export default Add;
