import React from "react";
import RemoteTable from "@evenlogics/whf-remote-table";
import { Card, CardBody } from "reactstrap";
import { Header } from "@evenlogics/whf-ra-components";
import api from "@evenlogics/whf-api";



const defaultSorted = [{ dataField: "id", order: "asc" }];
const columns = [
  {
    dataField: "id",
    text: "ID",
    align: "center",
    sort: true,
  },
  {
    dataField: "name",
    text: "Name",
    align: "center",
    sort: true,
  },
  {
    dataField: "phone1",
    text: "Phone",
    align: "center",
    sort: true,
  },
  {
    dataField: "phone2",
    text: "Secondary Number",
    align: "center",
    sort: true,
  },
 
];


const List = () => {


  const companyLogin = (data) => {
    console.log(data?.owner,"data company");
    let currentUser = JSON.parse(localStorage?.getItem('currentUser'));
    console.log(currentUser?.authToken,"current User Token");
    let payload = {
      // id : data?.user?.id,
      id : data?.owner,
    }
    api.request("post","/generate-token",payload,currentUser?.authToken).then((data) => {
      console.log(data?.data?.token,"data");
      window.open(`http://localhost:3006/#/validateAsOwner/${data?.data?.token}&${currentUser?.authToken}`,'_blank')
   }).catch((error) => console.log(error)); 
   
    
  };
  
  return (
    <div>
      <div>
        <Card className="animated fadeIn">
          <Header title="All Companies" />

          <CardBody>
            <RemoteTable
              entity="companies?limit=1000"
              customEntity="companies?limit=1000"
              columns={columns}
              sort={defaultSorted}
              hideEdit={false}
              hideDetail={false}
              hideDelete={false}
              addRoute="/admin/company/add"

              customButton={{
                name: "Login As Owner",
                color: "warning",
                callback: (data) => companyLogin(data),
              }}
              // Query={query}
              // query={queryParams}
            />
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default List;
