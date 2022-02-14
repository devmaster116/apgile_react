import React, { useState, useEffect } from "react";
import {connect} from "react-redux";
import RemoteTable from "@evenlogics/whf-remote-table";
import { Card, CardBody } from "reactstrap";
import { Header } from "@evenlogics/whf-ra-components";


const List = (props) => {
  const [query, setQuery] = useState(false)
	useEffect(() => {
		setQuery((prev)=>!prev)
	}, [props.branchId]);

  const defaultSorted = [{ dataField: "id", order: "desc" }];
const columns = [
  {
    dataField: "id",
    text: "ID",
    align: "center",
    sort: true,
  },
  
  {
    dataField: "week_day_name",
    text: "Weekday",
    align: "center",
    sort: true,
  },
  {
    dataField: "branch_name",
    text: "Branch",
    align: "center",
    sort: true,
  },
];

  return (
    <div>
      <div>
        <Card className="animated fadeIn">
          <Header title="All roasters" />
          <CardBody>
            <RemoteTable
              entity={`${props?.branchId}/rosters`}
              customEntity={`rosters`}
              columns={columns}
              sort={defaultSorted}
              hideEdit={false}
              hideDetail={false}
              hideDelete={false}
              addRoute="/roasters/add"
              Query={query}
            />
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    branchId : state.selectedBranchId,
    }
}


export default connect(mapStateToProps,null)(List);