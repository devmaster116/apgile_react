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
    dataField: "name",
    text: "Username",
    align: "center",
    sort: true,
  },
  {
    dataField: "description",
    text: "Descriptiond",
    align: "center",
    sort: true,
  },
  {
    dataField: "total_calls",
    text: "Total Calls",
    align: "center",
    sort: true,
  },
  {
    dataField: "location.name",
    text: "Location",
    align: "center",
    sort: true,
  },
  
  {
    dataField: "location.branch.name",
    text: "Branch Name",
    align: "center",
    sort: true,
  },

  
 
];

const VendorsList = () => {
  return (
    <div>
      <div>
        <Card className="animated fadeIn">
          <Header title="All Pages" />
          <CardBody>
            <RemoteTable
              entity="pages"
              customEntity="pages"
              columns={columns}
              sort={defaultSorted}
              hideEdit={false}
              hideDetail={false}
              hideDelete={false}
              addRoute="/pages/page/add"

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
