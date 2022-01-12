import React from "react";
import RemoteTable from "@evenlogics/whf-remote-table";
import { Card, CardBody,CardHeader } from "reactstrap";

const List = () => {

        const columns = [
          { dataField: "id", text: "ID", align: "center", sort: true },
          {
            dataField: "email",
            text: "Email",
            align: "center",
            sort: true,
          },
          {
            dataField: "title",
            text: "Title",
            align: "center",
            sort: true,
          },
          {
            dataField: "first_name",
            text: "First Name",
            align: "center",
            sort: true,
          },
          {
            dataField: "last_name",
            text: "Last Name",
            align: "center",
            sort: true,
          },
          {
            dataField: "phone1",
            text: "Phone",
            align: "center",
            sort: true,
          },
        //   {
        //     isDummyField: true,
        //     align: "center",
        //     text: "QR Code",
        //     sort: true,
        //     formatter: (cell, row) => {
        //       return (
        //       <Button color="primary" onClick={() => {
        //         setID(row.id) 
        //         }}
        //         >
        //           View QR Code
        //         </Button>
        //       );
        //     },
        //   },
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
                <strong>All Profiles</strong>
              </CardHeader>
              <CardBody>
                <RemoteTable
                  entity="profile"
                  customEntity="profile"
                  columns={columns}
                  sort={defaultSorted}
                  hideEdit={true}
                  hideDelete={false}
                //   filters={filters}
                //   showAdvanceFilters = {true}
                  // addRoute="/call/add"
                  //   {props.remoteTableFields}
                />
              </CardBody>
            </Card>
          </div>
        );
};

export default List;
