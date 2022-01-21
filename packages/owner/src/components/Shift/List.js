import React from "react";
import RemoteTable from "@evenlogics/whf-remote-table";
import { Card, CardBody } from "reactstrap";
import { Header } from "@evenlogics/whf-ra-components";



const defaultSorted = [{ dataField: "id", order: "asc" }];

const columns = [
  { dataField: 'id', text: 'ID', align: 'center', sort: true },
  {
    dataField: 'name',
    text: 'Name',
    align: 'center',
    sort: true
  },
  {
    dataField: 'shift_start_time',
    text: 'Shift Start Time',
    align: 'center',
    sort: true
  },
  {
    dataField: 'shift_end_time',
    text: 'Shift End Time',
    align: 'center',
    sort: true
  },

  {
    isDummyField: true,
    align: "center",
    text: "Team Supervisor",
    sort: true,
    formatter: (cell, row) => {
      console.log(row.teams, "row.teams");
    return  row?.teams?.map((team)=>{
      return ( <span key={row.id}>
         {team?.supervisor?.username}
        </span> )
      })		  
    }, 
    },

];

const List = () => {
  return (
    <div>
      <div>
        <Card className="animated fadeIn">
          <Header title="All Shifts" />
          <CardBody>
            <RemoteTable
              entity="shifts"
              customEntity="shifts"
              columns={columns}
              sort={defaultSorted}
              hideEdit={false}
              hideDetail={false}
              hideDelete={false}
              addRoute="/shifts/add"

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
