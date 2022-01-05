import React from "react";
import RemoteTable from "@evenlogics/whf-remote-table";
import { Card, CardBody } from "reactstrap";
import { Header } from "@evenlogics/whf-ra-components";



const defaultSorted = [{ dataField: "id", order: "desc" }];
const columns = [
  {
    dataField: "id",
    text: "ID",
    align: "center",
    sort: true,
  },
  
  {
    dataField: "username",
    text: "username",
    align: "center",
    sort: true,
  },
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

const VendorsList = () => {
  return (
    <div>
      <div>
        <Card className="animated fadeIn">
          <Header title="All Promotions" />
          <CardBody>
            <RemoteTable
              entity="promotions"
              customEntity="promotions"
              columns={columns}
              sort={defaultSorted}
              hideEdit={false}
              hideDetail={false}
              hideDelete={false}
            //   customButton={{
            //     name: "Download PDF",
            //     color: "warning",
            //     callback: downloadPdf,
            //   }}
            //   Query={query}
            //   query={queryParams}
            />
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default VendorsList;
