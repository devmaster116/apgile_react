
import React from "react";
import { Card, CardHeader,CardBody } from "reactstrap";
import RemoteTable from "@evenlogics/whf-remote-table";

const Detail = (props) => {
  const columns = [
    { dataField: "id", text: "ID", align: "center", sort: true },
    {
      dataField: "call_id",
      text: "Call ID",
      align: "center",
      sort: true,
    },
    {
      dataField: "action_title",
      text: "Action Status",
      align: "center",
      sort: true,
    },
   
    {
      dataField: "created_at",
      text: "Created On",
      align: "center",
      sort: true,
    },
    {
      dataField: "target_user_name",
      text: "Assigned To",
      align: "center",
      sort: true,
    },
    {
      dataField: "action_by_name",
      text: "Action By",
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
          <strong>Call Detail</strong>
        </CardHeader>
        <CardBody>
          <RemoteTable
            entity={`call-logs/detail/${props.match.params.id}`}
            customEntity={`call-logs/detail/${props.match.params.id}`}
            columns={columns}
            sort={defaultSorted}
            hideActionCol={true}
          />
        </CardBody>
      </Card>
    </div>
  );
};

export default Detail;
