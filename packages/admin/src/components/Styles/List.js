import React from "react";
import RemoteTable from "@evenlogics/whf-remote-table";
import { Card, CardBody } from "reactstrap";
import { Header } from "@evenlogics/whf-ra-components";


const filters = {
  company_id: {
    type: "advanceSelect",
    label: "Company",
    target: 'companies?limit=1000',
  //   async: true,
    name: "company_id",
    optionValue: 'id',
    optionLabel: 'name',
    required: true,
    col: 12 + ' col-xl-3 mt-2',
    // callback: (data) => companiesChangeHandler(data)
  },
  // branch_id: {
  //   type: "advanceSelect",
  //   label: "Branch",
  //   target: target,
  //   async: true,
  //   name: "branch_id",
  //   optionValue: 'id',
  //           optionLabel: 'name',
  //   required: true,
  //   col: 12 + ' col-xl-3 mt-2',
  //   }
  }

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
   
    isDummyField: true,
    align: "center",
    text: "Logo",
    sort: true,
    formatter: (cell, row) => {
      console.log(cell,row, "cell");
      return (
          <div>
             <img width={30} height={40} alt="background" src={row?.logo?.thumbnail}></img>
          </div>
      )
  },
  },
  
  {
  
    isDummyField: true,
    align: "center",
    text: "Background Image",
    sort: true,
    formatter: (cell, row) => {
      console.log(cell,row, "cell");
      return (
          <div>
             <img width={30} height={40} alt="background" src={row?.bg_image?.thumbnail}></img>
          </div>
      )
  },
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
              filters={filters}
							showAdvanceFilters = {true}
              addRoute="/owner/styles/add"

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
