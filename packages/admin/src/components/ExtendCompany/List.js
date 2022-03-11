import React from "react";
import RemoteTable from "@evenlogics/whf-remote-table";
import {Card, CardBody} from "reactstrap";
import {Header} from "@evenlogics/whf-ra-components";
import api from "@evenlogics/whf-api";

const List = (props) => {

    const filters = {
        city: {
            // parent: "address",
            type: "text",
            label: "City",
            required: true,
            name: "city",
            col: 3,
        },

        state: {
            // parent: "address",
            type: "text",
            label: "State",
            name: "state",
            col: 3,
        },
        address_country: {
            type: "advanceSelect",
            label: "Country",
            // defaultValue:{value:"US",label:"US"},
            optionValue: "code",
            target: "countries?limit=1000",
            required: true,
            col: 4,
        }
    }

    const columns = [
      {
        dataField: "name",
        text: "Company Name",
        align: "center",
        sort: true,
      },
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
