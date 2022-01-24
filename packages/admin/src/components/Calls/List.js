import React,{useState} from "react";
import { Card, CardBody, CardHeader } from "reactstrap";
import RemoteTable from "@evenlogics/whf-remote-table";



const List = () => {
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
    target: 'companies?limit=1000',
    async: true,
    name: "company_id",
    required: true,
    col: 12 + ' col-xl-3 ',
    callback: (data) => companiesChangeHandler(data)

  },
  branch_id: {
    type: "advanceSelect",
    label: "Branch",
    target: target,
    async: true,
    name: "branch_id",
    required: true,
    col: 12 + ' col-xl-3 ',
  },
}

  const columns = [
    { dataField: "id", text: "ID", align: "center", sort: true },
    {
      dataField: "cus_name",
      text: "Customer Name",
      align: "center",
      sort: true,
    },
    {
      dataField: "message",
      text: "Message",
      align: "center",
      sort: true,
    },
    {
      dataField: "completed_at",
      text: "Completed At",
      align: "center",
      sort: true,
    },
    {
      dataField: "status",
      text: "Status",
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
      text: "Branch",
      align: "center",
      sort: true,
    },
  ];

  const defaultSorted = [
    {
      dataField: "id",
      order: "asc",
    },
  ];

  return (
    <div className="animated">
      <Card>
        <CardHeader>
          <strong>Call List</strong>
        </CardHeader>
        <CardBody>
          <RemoteTable
            entity="calls"
            customEntity="calls"
            columns={columns}
            sort={defaultSorted}
            hideEdit={true}
            filters={filters}
            showAdvanceFilters = {true}
            // addRoute="/call/add"
            //   {props.remoteTableFields}
          />
        </CardBody>
      </Card>
    </div>
  );
};

export default List;
