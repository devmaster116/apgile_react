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
    text: "Name",
    align: "center",
    sort: true,
  },
  {
    dataField: "font_color",
    text: "Font Color",
    align: "center",
    sort: true,
  },
  {
    dataField: "bg_color",
    text: "Background Color",
    align: "center",
    sort: true,
  },
  {
    dataField: "logo.name",
    text: "Logo",
    align: "center",
    sort: true,
  },
  
  {
    dataField: "bg_image.name",
    text: "Background Image",
    align: "center",
    sort: true,
  },

  
 
];

const VendorsList = () => {
  return (
    <div>
      <div>
        <Card className="animated fadeIn">
          <Header title="All Styles" />
          <CardBody>
            <RemoteTable
              entity="styles"
              customEntity="styles"
              columns={columns}
              sort={defaultSorted}
              hideEdit={false}
              hideDetail={false}
              hideDelete={false}
              addRoute="/pages/styles/add"

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
