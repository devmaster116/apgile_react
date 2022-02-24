import React from "react";
import RemoteTable from "@evenlogics/whf-remote-table";
import { Card, CardBody } from "reactstrap";
import { Header } from "@evenlogics/whf-ra-components";



const List = () => {
  const filters = {
    company_id: {
      type: "advanceSelect",
      label: "Company",
      target: 'companies?limit=1000',
      name: "company_id",
      optionValue: 'id',
      optionLabel: 'name',
      required: true,
      col: 12 + ' col-xl-3 mt-2',
    }
    }
  
  const defaultSorted = [{ dataField: "id", order: "desc" }];
  const columns = [
    {
      dataField: "id",
      text: "ID",
      align: "center",
      sort: true,
    },
    {
      dataField: "company.name",
      text: "Company",
      align: "center",
      sort: true,
    },
    {
      dataField: "name",
      text: "Style Title",
      align: "center",
      sort: true,
    },
    {
      dataField: "font_color",
      text: "Font",
      align: "center",
      sort: true,
    },
  
  ];
  
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
              // hideDetail={true}
              hideDelete={false}
              filters={filters}
							showAdvanceFilters ={true}
              addRoute="/owner/styles/add"
            />
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default List;
