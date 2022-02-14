import React, { useState,useEffect } from 'react';
import { FormGenerator } from "@evenlogics/whf-form-generator";
import { Card, CardBody } from "reactstrap";
import { Header } from "@evenlogics/whf-ra-components";
import {connect} from "react-redux";

const Add = (props) => {

	const [query, setQuery] = useState(false);
  useEffect(() => {
    console.log(query)
    setQuery((prev) => !prev);
  }, [props.branchId]);

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
      target: `${props.branchId}/teams?limit=1000`,
      async: true,
      name: 'team_id',
      multi:true,
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
const extraVals = {
  branch_id : props.branchId
}
  return (
    <div>
      <Card className="animated fadeIn">
        <Header title="Add New Shift" />
        <CardBody>
          <FormGenerator
            targetEntity={`${props.branchId}/shifts`}
            fields={fields}
            targetId={id}
            name="shifts"
            redirect="shifts"
            extraVals={extraVals}
          />
        </CardBody>
      </Card>
    </div>
  );
};

const mapStateToProps = state => {
  return {
      branchId : state.selectedBranchId,
  }
}

export default connect(mapStateToProps,null)(Add);