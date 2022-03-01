import React from "react";
import RemoteTable from "@evenlogics/whf-remote-table";
import {Card, CardBody} from "reactstrap";
import {Header} from "@evenlogics/whf-ra-components";
import api from "@evenlogics/whf-api";

const List = (props) => {

    const columns = [
      // {
      //   dataField: "id",
      //   text: "ID",
      //   align: "center",
      //   sort: true,
      // },
      {
        isDummyField: true,
        align: "center",
        text: "Company Logo",
        sort: true,
        formatter: (cell, row) => {
            console.log(row,"row")
          return (
            <img
            width="40"
            height="30"
              src={row?.style?.logo?.url}
              alt="logo"
            />
          );
        },
      },
      {
        dataField: "name",
        text: "Company Name",
        align: "center",
        sort: true,
      },
    //   {
    //     dataField: "address.city",
    //     text: "City",
    //     align: "center",
    //     sort: true,
    //   },
      {
        dataField: "phone1",
        text: "Phone Number",
        align: "center",
        sort: true,
      },
      {
        dataField: "address.country",
        text: "Country",
        align: "center",
        sort: true,
      },
      // {
      //   dataField: "phone2",
      //   text: "Secondary Number",
      //   align: "center",
      //   sort: true,
      // },
    ];

    const defaultSorted = [{dataField: 'name', order: 'desc'}];


    const companyLogin = (data) => {
        let currentUser = JSON.parse(localStorage?.getItem('currentUser'));
        let payload = {
            // id : data?.user?.id,
            id: data?.owner_id,
        }
        api.request("post", "/generate-token", payload, currentUser?.authToken).then((data) => {
          console.log(data,"data")
            window.open(`${process.env.REACT_APP_OWNER_PANEL_URL}/#/validateAsOwner/${data?.data?.token}&${currentUser?.authToken}`, "_blank")
        }).catch((error) => console.log(error));
    };

    return (
        <div>
            <div>
                <Card className="animated fadeIn">
                    <Header title="All Companies"/>

                    <CardBody>
                        <RemoteTable
                            entity="companies"
                            customEntity="companies"
                            columns={columns}
                            sort={defaultSorted}
                            // hideEdit={true}
                            hideDetail={true}
                            hideDelete={false}
                            addRoute="/admin/companies/add"

                            customButton={{
                                name: "Manage Company",
                                color: "warning",
                                classes:"text-white",
                                callback: (data) => companyLogin(data),
                            }}
                            // Query={query}
                            // query={queryParams}
                            // {...props.remoteTableFields}

                        />
                    </CardBody>
                </Card>
            </div>
        </div>
    );
};

export default List;
