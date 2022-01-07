import React from "react";
import RemoteTable from "@evenlogics/whf-remote-table";
import { Card, CardBody,Button} from "reactstrap";
import { Header } from "@evenlogics/whf-ra-components";

const VendorsList = (props) => {

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
    {
      isDummyField: true,
      align: "center",
      text: "QR Code",
      sort: true,
      formatter: (cell, row) => {
        return (
            <Button color="primary" onClick={()=> props.history.push("/pages/12/details")}>
              View QR Code
            </Button> 
        );
      },
    },
  ];


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
              hideDetail={true}
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
