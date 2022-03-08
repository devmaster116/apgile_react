import React from "react";
import { Card, CardBody, CardHeader } from "reactstrap";
import RemoteTable from "@evenlogics/whf-remote-table";

const ItemsList = (props) => {
 

 

  // const filters = {
  //   company_id: {
  //     type: "advanceSelect",
  //     label: "Company",
  //     target: "companies?limit=1000",
  //     //   async: true,
  //     name: "company_id",
  //     optionValue: "id",
  //     optionLabel: "name",
  //     // required: true,
  //     col: 12 + " col-xl-3 mt-2",
  //     callback: (data) => companiesChangeHandler(data),
  //   },
  //   // userDetail_branch_id: {
  //   //   type: "advanceSelect",
  //   //   label: "Branch",
  //   //   target: target,
  //   //   async: true,
  //   //   name: "userDetail_branch_id",
  //   //   optionValue: "id",
  //   //   optionLabel: "name",
  //   //   // required: true,
  //   //   col: 12 + " col-xl-3 mt-2",
  //   // },
  //   // roles_role_id: {
  //   //     type: "advanceSelect",
  //   //     label: "Role",
  //   //     target: "roles",
  //   //     async: true,
  //   //     name: "roles_role_id",
  //   //     // optionValue: "id",
  //   //     // optionLabel: "name",
  //   //     // required: true,
  //   //     col: 12 + " col-xl-3 mt-2",
  //   //   },
  // };

  const columns = [
    // {
    //   dataField: "id",
    //   text: "ID",
    //   align: "center",
    //   sort: true,
    // },
    {
      dataField: "username",
      text: "Username",
      align: "center",
      sort: true,
      
    },
    {
      dataField: "email",
      text: "Email",
      align: "center",
      sort: true,
      
    },
    // {
    //     isDummyField: true,
    //     align: "center",
    //     text: "User Role",
    //     sort: true,
    //     formatter: (cell, row) => {
    //         return row.roles.map((rol) => {
    //             return <span key={rol.id}>{rol?.name}</span>
    //         });
    //     },
    // },
   
  ];

  const defaultSorted = [
    {
      dataField: "username",
      order: "desc",
    },
  ];


  return (
    <div className="animated">
      <Card>
        <CardHeader>
          <strong>All Super Admins</strong>
        </CardHeader>
        <CardBody>
          <RemoteTable
            entity="super-admins"
            customEntity="super-admins"
            columns={columns}
            sort={defaultSorted}
            addRoute="super-admins/add"
            // filters={filters}
			      hideDetail={false}
            // disableDelete={true}
            // Query={query}
            // showAdvanceFilters={true}
            {...props.remoteTableFields}
           
          />
        </CardBody>
      </Card>
    </div>
  );
};

export default ItemsList;
