import React, {useState, useEffect} from "react";
import {Card, CardBody, CardHeader} from "reactstrap";
import RemoteTable from "@evenlogics/whf-remote-table";
import {connect} from "react-redux";


const List = (props) => {
    const [query, setQuery] = useState(false);
    useEffect(() => {
        setQuery((prev) => !prev);
    }, [props.branchId]);

    // const filters = {
    //     company_id: {
    //         type: "advanceSelect",
    //         label: "Company",
    //         target: 'companies?limit=1000',
    //         async: true,
    //         name: "company_id",
    //         required: true,
    //         col: 12 + ' col-xl-3 ',
    //     },
    //     branch_id: {
    //         type: "advanceSelect",
    //         label: "Branch",
    //         target: 'branches?limit=1000',
    //         async: true,
    //         name: "branch_id",
    //         required: true,
    //         col: 12 + ' col-xl-3 ',
    //     },
    // }

    const columns = [
        {dataField: "id", text: "ID", align: "center", sort: true},
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
                        entity={`${props.branchId}/calls`}
                        customEntity="calls"
                        columns={columns}
                        sort={defaultSorted}
                        hideEdit={true}
                        // filters={props.userRole?.includes("supervisor" && "staff") ? null : filters}
                        // showAdvanceFilters={true}
                        hideDetail={false}
                        hideActionCol={props.userRole === "supervisor" || props.userRole === "staff" ? true : false}
                        customButton={{
                            name: "Assigned Call",
                            color: "warning",
                            classes:"text-white",
                            callback: (data) => props?.history?.push(`/calls/${data?.id}/assigned`),
                          }}
                        Query={query}

                    />
                </CardBody>
            </Card>
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
