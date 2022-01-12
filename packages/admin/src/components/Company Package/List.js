import React from 'react'
import RemoteTable from "@evenlogics/whf-remote-table";
import { Card, CardBody, Button } from "reactstrap";
import { Header } from "@evenlogics/whf-ra-components";


const List = () => {
    const defaultSorted = [{ dataField: "id", order: "asc" }];
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
        dataField: "total_watches",
        text: "Watches Assigned",
        align: "center",
        sort: true,
      },
      {
        dataField: "total_qr_codes",
        text: "Total QR Codes",
        align: "center",
        sort: true,
      },
      {
        dataField: "total_staff",
        text: "Total Staff",
        align: "center",
        sort: true,
      },
    ]
    return (
        <div>
            <Card className="animated fadeIn">
          <Header title="All Companies Package"/>
          <CardBody>
            <RemoteTable
              entity="company-setups"
              customEntity="company-setups"
              columns={columns}
              sort={defaultSorted}
              hideEdit={false}
              hideDetail={true}
              hideDelete={false}
              addRoute="/company-setup/add"
            />
            
          </CardBody>
        </Card> 
        </div>
        
    )
}

export default List
