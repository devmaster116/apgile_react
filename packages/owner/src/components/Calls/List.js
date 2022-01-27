import React,{useState,useEffect} from "react";
import { Card, CardBody, CardHeader } from "reactstrap";
import RemoteTable from "@evenlogics/whf-remote-table";



const List = () => {
 
  const [companyID, setCompanyID] = useState(null)
	const [userRole, setUserRole] = useState(null)
  const [branchID, setBranchID] = useState(null)
  const [query, setQuery] = useState(false)


  useEffect(() => {
    let ls =  JSON.parse(localStorage.getItem('currentUser'));
   let roled = ls?.roles?.map(role => setUserRole(role));
//    setUserRole(roled)
   console.log(roled);
    setCompanyID(ls?.branch?.company_id);
    setBranchID(ls?.branch?.id);
    setQuery(true);
    
 },[companyID,userRole,branchID]);

 console.log(userRole,"role");


const filters = {
  company_id: {
    type: "advanceSelect",
    label: "Company",
    target: 'companies?limit=1000',
    async: true,
    name: "company_id",
    required: true,
    col: 12 + ' col-xl-3 ',
  },
  branch_id: {
    type: "advanceSelect",
    label: "Branch",
    target: 'branches?limit=1000',
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
            entity= { userRole?.includes("supervisor") ? `calls?branch_id=${branchID}` : "calls"}
            customEntity={ userRole?.includes("supervisor") ? `calls?branch_id=${branchID}` : "calls"}
            columns={columns}
            sort={defaultSorted}
            hideEdit={true}
            filters={ userRole?.includes("supervisor") ? null : filters}
            showAdvanceFilters ={true}
            hideActionCol={ userRole?.includes("supervisor") ? true : false}
            // addRoute="/call/add"
            //   {props.remoteTableFields}
            Query={query}

          />
        </CardBody>
      </Card>
    </div>
  );
};

export default List;
