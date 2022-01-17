import React,{useEffect,useState} from 'react'
import RemoteTable from "@evenlogics/whf-remote-table";
import { Card, CardBody } from "reactstrap";
import { Header } from "@evenlogics/whf-ra-components";

const List = () => {

   const [companyID, setCompanyID] = useState(null)
     useEffect(() => {
       let ls =  JSON.parse(localStorage.getItem('currentUser'));
       setCompanyID(ls?.company?.id);
    },)

    const defaultSorted = [{ dataField: "id", order: "desc" }];
    const columns = [
      {
        dataField: "id",
        text: "ID",
        align: "center",
        sort: true,
      },
      // {
      //   dataField: "address",
      //   text: "Address",
      //   align: "center",
      //   sort: true,
      // },   
      {
        dataField: "name",
        text: "Name",
        align: "center",
        sort: true,
      },
      {
        dataField: "phone1",
        text: "Phone",
        align: "center",
        sort: true,
      },
      {
        dataField: "phone2",
        text: "Secondary Phone",
        align: "center",
        sort: true,
      },
      
    
     
     
     
    ];
      return (
        <div>
          {
            companyID && <div>
            <Card className="animated fadeIn">
              <Header title="All Branches" />
              <CardBody>
                
                <RemoteTable
                  entity={`branches/${companyID}/all`}
                  customEntity={`branches/${companyID}/all`}
                  columns={columns}
                  sort={defaultSorted}
                  hideEdit={false}
                  hideDetail={false}
                  hideDelete={false}
                  addRoute="/owner/branches/add"
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
          }
          
        </div>
      );
    };
    

export default List
