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


  const defaultSorted = [{ dataField: "id", order: "desc" }];
  const columns = [
    {
      dataField: "id",
      text: "ID",
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
      dataField: "sub_title",
      text: "Sub Title",
      align: "center",
      sort: true,
    },
    
    // {
    //   dataField: "branch.name",
    //   text: "Branch",
    //   align: "center",
    //   sort: true,
    // },
  

    
   
  ];
  return (
    <div>
      <div>
        <Card className="animated fadeIn">
          <Header title="All Categories" />
          <CardBody>
            <RemoteTable
              entity={`${props?.branchId}/categories`}
              customEntity="categories"
              columns={columns}
              sort={defaultSorted}
              hideEdit={false}
              hideDetail={true}
              hideDelete={false}
              addRoute="/categories/add"
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