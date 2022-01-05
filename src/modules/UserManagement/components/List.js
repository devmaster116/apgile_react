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
    text: "name",
    align: "center",
    sort: true,
  },
  {
    dataField: "supervisor.username",
    text: "Supervisor",
    align: "center",
    sort: true,
  },
  {
    dataField: "supervisor.email",
    text: "supervisor email",
    align: "center",
    sort: true,
  },
  {
    dataField: "supervisor.title",
    text: "supervisor title",
    align: "center",
    sort: true,
  },
  {
    dataField: "supervisor.first_name",
    text: "supervisor first name",
    align: "center",
    sort: true,
  },
  {
    dataField: "supervisor.last_name",
    text: "supervisor last name",
    align: "center",
    sort: true,
  },
  {
    dataField: "supervisor.gender",
    text: "supervisor gender",
    align: "center",
    sort: true,
  },
  {
    dataField: "supervisor.phone1",
    text: "supervisor phone",
    align: "center",
    sort: true,
  },
  
  {
    dataField: "branch.name",
    text: "branch name",
    align: "center",
    sort: true,
  },
  {
    dataField: "branch.phone1",
    text: "branch phone",
    align: "center",
    sort: true,
  },
  {
    dataField: "branch.phone2",
    text: "branch phone",
    align: "center",
    sort: true,
  },
  
 
];

const VendorsList = () => {
  return (
    <div>
      <div>
        <Card className="animated fadeIn">
          <Header title="All Staffs" />
          <CardBody>
            <RemoteTable
              entity="staffs"
              customEntity="staffs"
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
