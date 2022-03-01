import React, { useState } from "react";
import { Card, CardBody, CardHeader } from "reactstrap";
import RemoteTable from "@evenlogics/whf-remote-table";
import api from "@evenlogics/whf-api";
import { toast } from 'react-toastify';

const ItemsList = (props) => {
  const [target, setTarget] = useState("branches");
  const [query, setQuery] = useState(false);

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
      target: "companies?limit=1000",
      //   async: true,
      name: "company_id",
      optionValue: "id",
      optionLabel: "name",
      // required: true,
      col: 12 + " col-xl-3 mt-2",
      callback: (data) => companiesChangeHandler(data),
    },
    branch_id: {
      type: "advanceSelect",
      label: "Branch",
      target: target,
      async: true,
      name: "branch_id",
      optionValue: "id",
      optionLabel: "name",
      // required: true,
      col: 12 + " col-xl-3 mt-2",
    },
    role_id: {
        type: "advanceSelect",
        label: "Role",
        target: "roles",
        async: true,
        name: "role_id",
        // optionValue: "id",
        // optionLabel: "name",
        // required: true,
        col: 12 + " col-xl-3 mt-2",
      },
  };

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
        isDummyField: true,
        align: "center",
        text: "User Role",
        sort: true,
        formatter: (cell, row) => {
            return row.roles.map((rol) => {
                return <span key={rol.id}>{rol?.name}</span>
            });
        },
    },
    {
      dataField: "branch_name",
      text: "Branch",
      align: "center",
      sort: true,
    },
  ];

  const defaultSorted = [
    {
      dataField: "username",
      order: "desc",
    },
  ];


  const deleteUser = (data) => {
    api.request("delete", `/users/${data?.id}`)
    .then((data) => {
      console.log(data.message,"message")
      toast.success(data.message)
      setQuery(!query)
      },3000)
      .catch((error) =>{
         toast.error(`Error ! ${error.response.data.message}`)
      }
        )
    }


  return (
    <div className="animated">
      <Card>
        <CardHeader>
          <strong>All Users</strong>
        </CardHeader>
        <CardBody>
          <RemoteTable
            entity="users"
            customEntity="users"
            columns={columns}
            sort={defaultSorted}
            addRoute="users/add"
            filters={filters}
			      hideDetail={false}
            disableDelete={true}
            Query={query}
            showAdvanceFilters={true}
            {...props.remoteTableFields}
            customButton={{
              name: "Delete",
              color: "danger",
              classes:"text-white",
              callback: (data) => deleteUser(data),
          }}
          />
        </CardBody>
      </Card>
    </div>
  );
};

export default ItemsList;
