import React from "react";
import RemoteTable from "@evenlogics/whf-remote-table";
import {Card, CardBody} from "reactstrap";
import {Header} from "@evenlogics/whf-ra-components";
import api from "@evenlogics/whf-api";
import {fullAddressFormat} from "@facepays/common";

const List = (props) => {

    const filters = {
        address_country: {
            type: "advanceSelect",
            label: "Country",
            optionValue: "code",
            target: "countries?limit=1000",
            col: 4,
        },
        // city: {
        //     type: "text",
        //     label: "City",
        //     name: "city",
        //     col: 3,
        // },

        // state: {
        //     type: "text",
        //     label: "State",
        //     name: "state",
        //     col: 3,
        // },

    }

    const columns = [
      {
        dataField: "name",
        text: "Company Name",
        align: "center",
        sort: true,
      },
        {
            dataField: "address",
            text: "Address",
            align: "center",
            sort: true,
            formatter: (cell, row) => {
                if(row?.address){
                    return (
                        fullAddressFormat(row.address)
                    )
                }

            },
        },
      {
        dataField: "phone1",
        text: "Phone Number",
        align: "center",
        sort: true,
      }
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
                            filters={filters}
                            customButton={{
                                name: "Manage Company",
                                color: "warning",
                                classes:"text-white",
                                callback: (data) => companyLogin(data),
                            }}
                            query={
								{
									sort : "id|desc"
								}
							}
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
