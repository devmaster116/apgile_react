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
        {dataField: "id", text: "ID", align: "center", hidden: true},
        {
            dataField: "staff_name",
            text: "Assigned To",
            align: "center"
        },
        {
            dataField: "page.name",
            text: "Area",
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
            dataField: "message",
            text: "Message",
            align: "center",
            sort: true,
        },
        {
            dataField: "cus_name",
            text: "Customer",
            align: "center",
            sort: true,
        },

        {
            isDummyField: true,
            text: "Created At",
            align: "center",
            sort: true,
            formatter: (cell, row) => {
                if(row?.created_at){
                    var now = new Date(row?.created_at);
                    now.setSeconds(0, 0);
                    var stamp = now
                        .toISOString()
                        .replace(/T/, " ")
                        .replace(/:00.000Z/, "");
                    console.log(stamp)
                    return (
                        <span className="badge badge-dark">
                                 {stamp}
                            </span>

                    )
                }

            },
        },

        {
            isDummyField: true,
            text: "Completed At",
            align: "center",
            sort: true,
            formatter: (cell, row) => {
                if(row?.completed_at){
                    var now = new Date(row?.completed_at);
                    now.setSeconds(0, 0);
                    var stamp = now
                      .toISOString()
                      .replace(/T/, " ")
                      .replace(/:00.000Z/, "");
                    console.log(stamp)
                    return (
                            <span className="badge badge-dark">
                                 {stamp}
                            </span>

                    )
                }

            },
        },

        {
            dataField: "status",
            text: "Status",
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
                        entity={props.userRole === "supervisor" ? `${props.branchId}/supervisor-calls` : `${props.branchId}/calls` }
                        customEntity="calls"
                        columns={columns}
                        sort={defaultSorted}
                        hideEdit={false}
                        // filters={props.userRole?.includes("supervisor" && "staff") ? null : filters}
                        // showAdvanceFilters={true}
                        hideDetail={props.userRole === "supervisor" ? true : false}
                        disableDelete={props.userRole === "supervisor" ? true : false}
                        hideActionCol={props.userRole === "staff" ? true : false}
                        // customButton={{
                        //     name: "Assigned Call",
                        //     color: "warning",
                        //     classes:"text-white",
                        //     callback: (data) => props?.history?.push({
                        //         pathname: `/calls/${data?.id}/assigned`,
                        //         state: data?.location.id
                        //     })
                        //   }}
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
