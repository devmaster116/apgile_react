import React from "react";
import RemoteTable from "@evenlogics/whf-remote-table";
import { Card, CardBody } from "reactstrap";
import { Header } from "@evenlogics/whf-ra-components";



const defaultSorted = [{ dataField: "id", order: "asc" }];
const columns = [
  {
    dataField: "id",
    text: "ID",
    align: "center",
    sort: true,
  },
//   {
//     dataField: "address",
//     text: "Address",
//     align: "center",
//     sort: true,
//   },
  
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
  return (
    <div>
      <div>
        <Card className="animated fadeIn">
          <Header title="All Companies" />
          <CardBody>
            <RemoteTable
              entity="companies"
              customEntity="companies"
              columns={columns}
              sort={defaultSorted}
              hideEdit={false}
              hideDetail={false}
              hideDelete={false}
              addRoute="/admin/company/add"

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

export default List;
