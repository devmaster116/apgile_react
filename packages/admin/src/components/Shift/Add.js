import React from "react";
import { FormGenerator } from "@evenlogics/whf-form-generator";
import { Card, CardBody } from "reactstrap";
import { Header } from "@evenlogics/whf-ra-components";

const Add = (props) => {

const {id} = props.match.params;

const fields = {
  name: {
      type: 'text',
      label: 'Name',
      required: true,
      name: 'name',
      col: 4
  },
  team_id: {
      type: 'advanceSelect',
      label: "Team",
      target: 'teams',
      async: true,
      name: 'team_id',
      multi:true,
      required: true,
      col: 4
  },
  company_id: {
    type: 'advanceSelect',
    label: "Select Company",
    target: 'companies',
    async: true,
    name: 'company_id',
    // multi:true,
    required: true,
    col: 4
},
  shift_time: {
      type: 'timeRange',
      label: 'Shift Time',
      required: true,
      name: 'shift_time',
      col: 4
  },
};

  return (
    <div>
      <Card className="animated fadeIn">
        <Header title="Add New Shift" />
        <CardBody>
          <FormGenerator
            targetEntity="shifts"
            // getValues={this.handleValue}
            fields={fields}
            targetId={id}
            name="shifts"
            // repeater={true}
            // initialValues={props.location.aboutProps}
            redirect="owner/shifts"
            // handleSameValueFields={["title", "slug"]}
          />
        </CardBody>
      </Card>
    </div>
  );
};

export default Add;
