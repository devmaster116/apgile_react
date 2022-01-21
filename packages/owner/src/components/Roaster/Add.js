import React from "react";
import { FormGenerator } from "@evenlogics/whf-form-generator";
import { Card, CardBody } from "reactstrap";
import { Header } from "@evenlogics/whf-ra-components";

const Add = (props) => {
const {id} = props.match.params;
  let fields = {
    week_day: {
      type: 'advanceSelect',
      label: "Week Day",
      target: 'rosters/week-day-list',
      // async: true,
      name: 'week_day',
      // multi:true,
      required: true,
      col: 4
  },
    branch_id: {
      type: 'advanceSelect',
      label: "Branch",
      target: 'branches',
      // async: true,
      name: 'branch_id',
      required: true,
      col: 4
  },

  shift_id: {
    type: 'advanceSelect',
    label: "Shifts",
    target: 'shifts',
    // async: true,
    name: 'shift_id',
    required: true,
    col: 4
},

  };

  return (
    <div>
      <Card className="animated fadeIn">
        <Header title="Add New Roaster" />
        <CardBody>
          <FormGenerator
            targetEntity="rosters"
            fields={fields}
            targetId={id}
            name="rosters"
            // getInitialValues={this.getInitialValues}
            // debug={false}
            // extraVals={extraVals}
            redirect="/roasters"
            // repeater={true}
          />
        </CardBody>
      </Card>
    </div>
  );
};

export default Add;
