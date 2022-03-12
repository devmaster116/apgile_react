import React, {Component} from 'react';
import {Card, CardBody, CardHeader} from 'reactstrap';
import RemoteTable from '@evenlogics/whf-remote-table';
import api from "@evenlogics/whf-api";

class List extends Component {
    render() {


        const filters = {
            company_company_id: {
                type: "advanceSelect",
                label: "Company",
                target: 'companies?limit=1000',
                async: true,
                name: "company_company_id",
                // required: true,
                col: 12 + ' col-xl-3 mt-2',
            }
        }
        const columns = [
            {
                dataField: 'name',
                text: 'Name',
                align: 'center',
                sort: true
            }, {
                dataField: 'phone1',
                text: 'Phone',
                align: 'center',
                sort: true
            }, {
                dataField: 'company_name',
                text: 'Company',
                align: 'center',
                sort: true
            }

        ];

        if (this.props.extendedFields) {
            this.props.extendedFields.forEach(field => columns.push(field))
        }

        const defaultSorted = [
            {
                dataField: 'name',
                order: 'desc'
            }
        ];

        const companyLogin = (data) => {
            let currentUser = JSON.parse(localStorage?.getItem('currentUser'));
            console.log(data);
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
            <div className="animated">
                <Card>
                    <CardHeader>
                        <strong>Outlets List</strong>
                    </CardHeader>
                    <CardBody>
                        <RemoteTable
                            entity="branches"
                            customEntity="branches"
                            columns={columns}
                            sort={defaultSorted}
                            hideDetail={true}
                            // hideEdit={true}
                            addRoute="/entity/branches/add"
                            filters={filters}
                            showAdvanceFilters={true}
                            {...this.props.remoteTableFields}
                            customButton={{
                                name: "Manage Branch",
                                color: "warning",
                                classes:"text-white",
                                callback: (data) => companyLogin(data),
                            }}
                        />
                    </CardBody>
                </Card>
            </div>
        );
    }
}

export default List;
