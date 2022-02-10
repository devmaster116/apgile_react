import React,{ useEffect,useState } from "react";
import RemoteTable from "@evenlogics/whf-remote-table";
import { Card, CardBody } from "reactstrap";
import { Header } from "@evenlogics/whf-ra-components";
import {connect} from "react-redux";


const List = (props) => {

	const [query, setQuery] = useState(false);
  // const [companyID, setCompanyID] = useState(null)

  const defaultSorted = [{ dataField: "id", order: "asc" }];

  useEffect(() => {
    let ls = JSON.parse(localStorage.getItem("currentUser"));
    // setCompanyID(ls?.branch?.company_id);
    console.log(ls,"ls");
		setQuery(!query)
	}, [query,props.BranchID]);
	
const columns = [
  { dataField: 'id', text: 'ID', align: 'center', sort: true },
  {
    dataField: 'name',
    text: 'Name',
    align: 'center',
    sort: true
  },
  {
    dataField: 'shift_start_time',
    text: 'Shift Start Time',
    align: 'center',
    sort: true
  },
  {
    dataField: 'shift_end_time',
    text: 'Shift End Time',
    align: 'center',
    sort: true
  },

  {
    isDummyField: true,
    align: "center",
    text: "Team Supervisor",
    sort: true,
    formatter: (cell, row) => {
      console.log(row.teams, "row.teams");
    return  row?.teams?.map((team)=>{
      return ( <span key={row.id}>
         {team?.supervisor?.username}
        </span> )
      })		  
    }, 
    },

];

  return (
    <div>
      <div>
        <Card className="animated fadeIn">
          <Header title="All Shifts" />
          <CardBody>
            <RemoteTable
              entity={props?.BranchID !== null ? `shifts?branch_id=${props?.BranchID}`:`shifts`}
              customEntity={props?.BranchID !== null ? `shifts?branch_id=${props?.BranchID}`:`shifts`}
              columns={columns}
              sort={defaultSorted}
              hideEdit={false}
              hideDetail={false}
              hideDelete={false}
              addRoute="/shifts/add"
              Query={query}
            //   query={queryParams}
            />
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
     BranchID : state.selectedBranchId
    }
}


export default connect(mapStateToProps,null)(List);
