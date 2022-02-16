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

	// const companiesChangeHandler = (data) => {
	//   setTimeout(() => {
	// 	setTarget(`branches/${data.value}/all`);
	//   }, 0);
	// };

  const defaultSorted = [{ dataField: "id", order: "desc" }];
  const columns = [
    {
      dataField: "id",
      text: "ID",
      align: "center",
      sort: true,
    },
    
    // {
    //   dataField: "user.username",
    //   text: "username",
    //   align: "center",
    //   sort: true,
    // },
    {
      dataField: "branch.name",
      text: "Branch",
      align: "center",
      sort: true,
    },
    {
      dataField: "branch.phone1",
      text: "Branch Phone",
      align: "center",
      sort: true,
    },
    
    {
      dataField: "title",
      text: "Title",
      align: "center",
      sort: true,
    },
   
    {
      dataField: "description",
      text: "Description",
      align: "center",
      sort: true,
    },
    {
      dataField: "valid_from",
      text: "valid_from",
      align: "center",
      sort: true,
    },
    {
      dataField: "valid_till",
      text: "valid_till",
      align: "center",
      sort: true,
    },
    
   
  ];
  return (
    <div>
      <div>
        <Card className="animated fadeIn">
          <Header title="All Promotions" />
          <CardBody>
            <RemoteTable
              entity={`${props?.branchId}/promotions`}
              customEntity="promotions"
              columns={columns}
              sort={defaultSorted}
              hideEdit={false}
              hideDetail={true}
              hideDelete={false}
              addRoute="/promotions/add"
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
       companyName : state.companyName,
       companyId : state.companyId,
       userRole : state.userRole
    }
}


export default connect(mapStateToProps,null)(List);