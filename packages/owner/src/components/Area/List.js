import React, {useEffect, useState} from "react";
import RemoteTable from "@evenlogics/whf-remote-table";
import {Card, CardBody, Button} from "reactstrap";
import {Header} from "@evenlogics/whf-ra-components";
import {connect} from "react-redux";
import api from "@evenlogics/whf-api";

const List = (props) => {


    const [query, setQuery] = useState(false);
    useEffect(() => {
        setQuery((prev) => !prev)
    }, [props.branchId]);

    const changeStatus = (data) => {
        let payload = {
            status: !data?.status
        }
        api.request("put", `/${props.branchId}/areas/status/${data?.id}`, payload)
            .then((data) => {
                console.log(data)
                setQuery(!query)
            })
            .catch((error) => console.log(error));
    }
    const defaultSorted = [{dataField: "name", order: "desc"}];


    const filters = {

        location_id: {
            type: "advanceSelect",
            label: "Select Location",
            target: `${props?.branchId}/locations`,
            async: true,
            col: 12 + ' col-sm-3  ',
        },

        // team_id: {
        //     type: "advanceSelect",
        //     label: "Select Team",
        //     target: `${props?.branchId}/teams`,
        //     async: true,
        //     col: 12 + ' col-sm-3  ',
        // },

        // user_id: {
        //     type: "advanceSelect",
        //     label: "Select Staff Member",
        //     target: `${props?.branchId}/role-users/staff`,
        //     optionLabel: "username",
        //     async: true,
        //     col: 12 + ' col-sm-3  ',
        // },
        item_id: {
            type: "advanceSelect",
            label: "Select Item",
            target: `${props?.branchId}/items`,
            async: true,
            col: 12 + ' col-sm-3  ',
        },
    }
    const columns = [
        // {
        //   dataField: "id",
        //   text: "ID",
        //   align: "center",
        //   sort: true,
        // },

        {
            dataField: "created_at",
            text: "Created At",
            align: "center",
            sort: true,
        },
        {
            dataField: "name",
            text: "Area Name",
            align: "center",
            sort: true,
        },
        {
            dataField: "description",
            text: "Area Description",
            align: "center",
            sort: true,
        },
        {
            align: "center",
            text: "Status",
            sort: true,
            formatter: (cell, row) => {
                console.log(row?.status, "status")
                return (
                    <Button color={row?.status === true ? "success" : "danger"} onClick={() => changeStatus(row)}>
                        {row?.status === true ? "Active" : "Inactive"}
                    </Button>
                );
            },
        },

    ];


    return (
        <div>
            <div>
                <Card className="animated fadeIn">
                    <Header title="All Areas"/>
                    <CardBody>
                        <RemoteTable

                            // entity={props?.branchId !== null ? `areas?branch_id=${props?.branchId}`:`areas`}
                            // customEntity={props?.branchId !== null ? `areas?branch_id=${props?.branchId}`:`areas`}
                            entity={`${props?.branchId}/areas`}
                            customEntity={`areas`}
                            columns={columns}
                            sort={defaultSorted}
                            hideEdit={false}
                            hideDetail={true}
                            hideDelete={false}
                            addRoute="/areas/add"
                            Query={query}
                            filters={filters}
                            showAdvancedFilters={true}
                            // query={calculateParams()}
                        />
                    </CardBody>
                </Card>
            </div>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        branchId: state.selectedBranchId,
        companyName: state.companyName,
        companyId: state.companyId,
        userRole: state.userRole
    }
}


export default connect(mapStateToProps, null)(List);
