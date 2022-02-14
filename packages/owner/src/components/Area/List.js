import React,{ useEffect,useState } from "react";
import RemoteTable from "@evenlogics/whf-remote-table";
import { Card, CardBody} from "reactstrap";
import { Header } from "@evenlogics/whf-ra-components";
import {connect} from "react-redux";


const List = (props) => {


	const [query, setQuery] = useState(false);
	useEffect(() => {
		setQuery((prev)=>!prev)
	}, [props.branchId]);

  // const calculateParams = () => {
  //   let params ;
  //   if(props?.branchId === null){
  //      params = {
  //     company_id:props?.companyId
  //     }
  //   }else{
  //     params = {
  //     company_id:props?.companyId,
  //     branch_id:props?.branchId
  //     }
  //   }
  //   return params;
  //   }

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

              // entity={props?.branchId !== null ? `areas?branch_id=${props?.branchId}`:`areas`}
              // customEntity={props?.branchId !== null ? `areas?branch_id=${props?.branchId}`:`areas`}
              entity={`${props?.branchId}/areas`}
              customEntity={`areas`}
              columns={columns}
              sort={defaultSorted}
              hideEdit={false}
              hideDetail={true}
              hideDelete={false}
              addRoute="/areas/add"
              Query={query}
              // query={calculateParams()}
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
