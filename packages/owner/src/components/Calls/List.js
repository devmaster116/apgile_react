import React, {useState, useEffect} from "react";
import {Card, CardBody, CardHeader} from "reactstrap";
import RemoteTable from "@evenlogics/whf-remote-table";
import {connect} from "react-redux";


const List = (props) => {
    const [query, setQuery] = useState(false);
    const [minDate, setMinDate] = useState('');
    useEffect(() => {
        setQuery((prev) => !prev);
    }, [props.branchId]);


    const filters = {
        location_id: {
            type: "advanceSelect",
            label: "Select Location",
            target: `${props?.branchId}/locations`,
            async: true,
            col: 12 + ' col-sm-2  ',
        },

        status:{
            type: "advanceSelect",
            label: "Select Status",
            target: `${props.branchId}/call/status-list`,
            optionLabel: 'name',
            optionId: 'id',
            async: true,
            col: 12 + ' col-sm-2  ',
        },
        start_date:{
            type:"date",
            label:"Select Start Date",
            col: 12 + ' col-sm-2  ',
            getValue:(data) => {
                setTimeout(() => {
                setMinDate(data?.value)
            }, 0)
        }
        },
        end_date:{
            type:"date",
            label:"Select End Date",
            col: 12 + ' col-sm-2  ',
            placeholderText: minDate ? "" : "Please select the start date",
            disabled:minDate ? false : true,
            minDate:minDate,
        }
    }

    const columns = [
        {dataField: "id", text: "ID", align: "center", hidden: true},
        {
            dataField: "staff_name",
            text: "Assigned To",
            align: "center"
        },
        {
            dataField: "page.name",
            text: "QR Code",
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
                    return (
                        <span className="badge badge-dark">
                                 {row?.created_at}
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
                        hideDetail={props.userRole === "supervisor" ? true : false}
                        disableDelete={props.userRole === "supervisor" ? true : false}
                        hideActionCol={props.userRole === "staff" ? true : false}
                        Query={query}
                        filters={filters}
                        showAdvancedFilters={true}

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
