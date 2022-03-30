import React, {useState, useEffect} from "react";
import {Card, CardBody, CardHeader} from "reactstrap";
import RemoteTable from "@evenlogics/whf-remote-table";
import {connect} from "react-redux";


const List = (props) => {
    const [query, setQuery] = useState(false);
    const [minDate, setMinDate] = useState('');
    const [valueOff, setValueOff] = useState(0);

    /* eslint-disable */
    useEffect(() => {
        if (valueOff === 0) {
            setValueOff(1)
        } else {
            setQuery((prev) => !prev)
        }
    }, [props.branchId]);
    /* eslint-enable */
    const filters = {
        location_id: {
            type: "advanceSelect",
            label: "Select Location",
            target: props?.userRole === "supervisor" ? `${props?.branchId}/supervisor-locations` : `${props?.branchId}/locations`,
            async: true,
            col: 4,
        },

        status_id: {
            type: "advanceSelect",
            label: "Select Status",
            target: `${props.branchId}/call/status-list`,
            optionLabel: 'name',
            optionId: 'id',
            async: true,
            col: 4,
        },
        start_date: {
            type: "date",
            label: "Select From",
            col: 4,
            getValue: (data) => {
                setTimeout(() => {
                    setMinDate(data?.value)
                }, 0)
            }
        },
        end_date: {
            type: "date",
            label: "Select To",
            col: 4,
            placeholderText: minDate ? "" : "Please select the start date",
            disabled: minDate ? false : true,
            minDate: minDate,
        }
    }

    const columns = [
        {
            dataField: "id",
            text: "ID",
            align: "center",
            hidden: true
        },
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
                if (row?.created_at) {
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
                if (row?.completed_at) {
                    return (
                        <span className="badge badge-dark">
                                 {row?.completed_at}
                            </span>

                    )
                }

            },
        },

        {
            dataField: "status_id",
            text: "Status",
            align: "center",
            sort: true,
            formatter: (cell, row) => {
                return (
                    <span className="badge badge-primary">
                                 {row?.status}
                            </span>
                )
            },
        },

    ];

    const defaultSorted = [
        {
            dataField: "id",
            order: "desc",
        },
    ];

    return (
        <div className="animated">
            <Card>
                <CardHeader>
                    <strong>Customer Calls List</strong>
                </CardHeader>
                <CardBody>
                    <RemoteTable
                        entity={props.userRole === "supervisor" ? `${props.branchId}/supervisor-calls` : `${props.branchId}/calls`}
                        customEntity="calls"
                        columns={columns}
                        sort={defaultSorted}
                        hideEdit={false}
                        // hideDetail={props.userRole === "supervisor" ? true : false}
                        hideDetail={false}
                        disableDelete={true}
                        hideActionCol={props.userRole === "staff" ? true : false}
                        Query={query}
                        filters={filters}
                        showAdvancedFilters={true}
                        // query={
                        //     {
                        //         sort : "id|desc"
                        //     }
                        // }

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
