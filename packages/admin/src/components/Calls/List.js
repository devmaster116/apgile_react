import React,{useState} from "react";
import { Card, CardBody, CardHeader } from "reactstrap";
import RemoteTable from "@evenlogics/whf-remote-table";



const List = (props) => {
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
    // required: true,
    col: 12 + ' col-xl-3 ',
    callback: (data) => companiesChangeHandler(data)

  },
  location_branch_id: {
    type: "advanceSelect",
    label: "Branch",
    target: target,
    async: true,
    name: "location_branch_id",
    required: true,
    col: 12 + ' col-xl-3 ',
    // callback: (data) => companiesChangeHandler(data)

  },
  call_status: {
    type: "advanceSelect",
    label: "Call Status",
    target: "call-logs/status-list",
    async: true,
    name: "call_status",
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
      dataField: "assigned_to",
      text: "Assigned To",
      align: "center",
      sort: true,
    },
    {
      dataField: "elayed_response",
      text: "Delayed Response Time",
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
    // {
    //   isDummyField: true,
    //   align: "center",
    //   text: "Call Manage",
    //   sort: true,
    //   formatter: (cell, row) => {
    //     return (
    //       <Button color="warning" onClick={() => props?.history?.push(`/calls/${row?.id}/assigned`)}>
    //         Assign Call
    //       </Button>
    //     );
    //   },
    // },
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
            hideDetail={true}
            filters={filters}
            showAdvanceFilters = {true}
            // addRoute="/call/add"
            //   {props.remoteTableFields}
            customButton={{
              name: "Assigned Call",
              color: "warning",
              callback: (data) => props?.history?.push(`/calls/${data?.id}/assigned`),
            }}
          />
        </CardBody>
      </Card>
    </div>
  );
};

export default List;
