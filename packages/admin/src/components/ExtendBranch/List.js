import React, {Component} from 'react';
import {Card, CardBody, CardHeader} from 'reactstrap';
import RemoteTable from '@evenlogics/whf-remote-table';
import api from "@evenlogics/whf-api";
import { toast } from 'react-toastify';
import {fullAddressFormat} from "@facepays/common";

class List extends Component {
    render() {


        const filters = {
            company_company_id: {
                type: "advanceSelect",
                label: "Company",
                target: 'companies?limit=1000',
                // async: true,
                name: "company_company_id",
                // required: true,
                col: 12 + ' col-xl-3 mt-2',
            }
        }
        const columns = [
            {
                hidden:true,
                dataField: "id",
                text: "ID",
                align: "center",
                sort: true,
            },
            {
                dataField: 'name',
                text: 'Name',
                align: 'center',
                sort: true
            }, {
                dataField: 'company_name',
                text: 'Company',
                align: 'center',
                sort: true
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
            }

        ];

        if (this.props.extendedFields) {
            this.props.extendedFields.forEach(field => columns.push(field))
        }

        const defaultSorted = [
            {
                dataField: 'id',
                order: 'desc'
            }
        ];

        const companyLogin = (data) => {
            let currentUser = JSON.parse(localStorage?.getItem('currentUser'));
            if(typeof data.manager_id === 'undefined') {
                toast.error(`Sorry, no manager user is available`)
            }

            let payload = {
                // id : data?.user?.id,
                id: data?.manager_id,
            }
            api.request("post", "/generate-token", payload, currentUser?.authToken).then((data) => {
                console.log(data,"data")
                window.open(`${process.env.REACT_APP_OWNER_PANEL_URL}/#/validateAsOwner/${data?.data?.token}&${currentUser?.authToken}`, "_blank")
            }).catch((error) => console.log(error));
        };

        return (
            <div className="animated">
                <Card>
                    <CardHeader>
                        <strong>All Outlets</strong>
                    </CardHeader>
                    <CardBody>
                        <RemoteTable
                            entity="branches"
                            customEntity="outlets"
                            columns={columns}
                            sort={defaultSorted}
                            hideDetail={true}
                            // hideEdit={true}
                            addRoute="/entity/outlets/add"
                            filters={filters}
                            showAdvanceFilters={true}
                            {...this.props.remoteTableFields}
                            customButton={{
                                name: "Manage Outlet",
                                color: "warning",
                                classes:"text-white",
                                callback: (data) => companyLogin(data),
                            }}
                            // query={
							// 	{
							// 		sort : "id|desc"
							// 	}
							// }
                        />
                    </CardBody>
                </Card>
            </div>
        );
    }
}

export default List;
