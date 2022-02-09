import React,{ useEffect,useState } from "react";
import RemoteTable from "@evenlogics/whf-remote-table";
import { Card, CardBody} from "reactstrap";
import { Header } from "@evenlogics/whf-ra-components";
import {connect} from "react-redux";


const List = (props) => {


	const [query, setQuery] = useState(false);

  useEffect(() => {
    let ls = JSON.parse(localStorage.getItem("currentUser"));
    // setCompanyID(ls?.branch?.company_id);
    console.log(ls,"ls");
		setQuery(!query)
	}, [query,props?.BranchID]);

  const defaultSorted = [{ dataField: "id", order: "desc" }];
  const columns = [
    {
      dataField: "id",
      text: "ID",
      align: "center",
      sort: true,
    },

    {
      dataField: "name",
      text: "Area Name",
      align: "center",
      sort: true,
    },
    {
      dataField: "description",
      text: "Area Description",
      align: "center",
      sort: true,
    },
    
  ];


  return (
    <div>
      <div>
        <Card className="animated fadeIn">
          <Header title="All Areas"/>
          <CardBody>
            <RemoteTable
             
              entity={props?.BranchID !== null ? `areas?branch_id=${props?.BranchID}`:`areas`}
              customEntity={props?.BranchID !== null ? `areas?branch_id=${props?.BranchID}`:`areas`}
              columns={columns}
              sort={defaultSorted}
              hideEdit={false}
              hideDetail={true}
              hideDelete={false}
              addRoute="/areas/add"
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
     BranchID : state.selectedBranchId
    }
}


export default connect(mapStateToProps,null)(List);
