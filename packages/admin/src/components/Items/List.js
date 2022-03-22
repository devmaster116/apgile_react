import React, { useState } from "react";
import { Card, CardBody, CardHeader } from "reactstrap";
import RemoteTable from "@evenlogics/whf-remote-table";

const ItemsList = (props) => {
  const [target, setTarget] = useState("branches");

  const companiesChangeHandler = (data) => {
    console.log(data, "lll");
    setTimeout(() => {
      setTarget(`branches/${data.value}/all`);
    }, 0);
  };

  const filters = {
    company_id: {
      type: "advanceSelect",
      label: "Company",
      target: "companies?limit=1000",
      //   async: true,
      name: "company_id",
      optionValue: "id",
      optionLabel: "name",
      required: true,
      col: 12 + " col-xl-3 mt-2",
      callback: (data) => companiesChangeHandler(data),
    },
    branch_id: {
      type: "advanceSelect",
      label: "Branch",
      target: target,
      async: true,
      name: "branch_id",
      optionValue: "id",
      optionLabel: "name",
      required: true,
      col: 12 + " col-xl-3 mt-2",
    },
  };

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
      dataField: "description",
      text: "Description",
      align: "center",
      sort: true,
    },
    // {
    // 	dataField: 'branch.name',
    // 	text: 'Branch Name',
    // 	align: 'center',
    // 	sort: true
    // },
  ];

  const defaultSorted = [
    {
      dataField: "id",
      order: "desc",
    },
  ];

  return (
    <div className="animated">
      <Card>
        <CardHeader>
          <strong>All Items</strong>
        </CardHeader>
        <CardBody>
          <RemoteTable
            entity="items"
            customEntity="items"
            columns={columns}
            sort={defaultSorted}
            addRoute="/owner/items/add"
            filters={filters}
						hideDetail={true}
            showAdvanceFilters={true}
            {...props.remoteTableFields}
          />
        </CardBody>
      </Card>
    </div>
  );
};

export default ItemsList;
