import React from "react";
import RemoteTable from "@evenlogics/whf-remote-table";
import { Card, CardBody} from "reactstrap";
import { Header } from "@evenlogics/whf-ra-components";


const List = () => {


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
      text: "Area Name",
      align: "center",
      sort: true,
    },
    {
      dataField: "description",
      text: "Area Description",
      align: "center",
      sort: true,
    },
    // {
    //   dataField: "total_calls",
    //   text: "Total Calls",
    //   align: "center",
    //   sort: true,
    // },
    // {
    //   dataField: "location.name",
    //   text: "Location",
    //   align: "center",
    //   sort: true,
    // },

    // {
    //   dataField: "location.branch.name",
    //   text: "Branch Name",
    //   align: "center",
    //   sort: true,
    // },
    
  ];


  return (
    <div>
      <div>
        <Card className="animated fadeIn">
          <Header title="All Areas"/>
          <CardBody>
            <RemoteTable
              entity="areas"
              customEntity="areas"
              columns={columns}
              sort={defaultSorted}
              hideEdit={false}
              hideDetail={true}
              hideDelete={false}
              addRoute="/areas/add"

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
