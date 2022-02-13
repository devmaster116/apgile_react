import React,{ useEffect,useState } from "react";
import RemoteTable from "@evenlogics/whf-remote-table";
import { Card, CardBody } from "reactstrap";
import { Header } from "@evenlogics/whf-ra-components";
import {connect} from "react-redux";


const List = (props) => {

	const [query, setQuery] = useState(false);
  useEffect(() => {
    setQuery((prev)=>!prev);
  }, [props.branchId]);

const defaultSorted = [{ dataField: "id", order: "asc" }];
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
    return  row?.teams?.map((team)=>{
      return ( <span key={row.id}>
         {team?.supervisor?.username}
        </span> )
      })
    },
    },

];

const calculateParams = () => {
  let params ;
  if(props?.branchId === null){
     params = {
      company_id:props?.companyId
    }
  }else{
    params = {
      company_id:props?.companyId,
      branch_id:props?.branchId
    }
  }
  return params;
}

  return (
    <div>
      <div>
        <Card className="animated fadeIn">
          <Header title="All Shifts" />
          <CardBody>
            <RemoteTable
              entity={`shifts`}
              customEntity={`shifts`}
              columns={columns}
              sort={defaultSorted}
              hideEdit={false}
              hideDetail={false}
              hideDelete={false}
              addRoute="/shifts/add"
              Query={query}
              query={calculateParams()}
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
       companyName : state.companyName,
       companyId : state.companyId,
       userRole : state.userRole
    }
}


export default connect(mapStateToProps,null)(List);
