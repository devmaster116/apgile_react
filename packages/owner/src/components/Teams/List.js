import React, {useState, useEffect} from 'react';
import {Card, CardBody, CardHeader} from 'reactstrap';
import RemoteTable from '@evenlogics/whf-remote-table';
import {connect} from "react-redux";

const TeamsList = (props) => {
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
            col: 12 + " col-sm-2 Z-Index ",
        },

        ...(props.userRole !== "supervisor" && {
            supervisor_id: {
                type: "advanceSelect",
                label: "Select Supervisor",
                target: `${props.branchId}/role-users/supervisor`,
                optionLabel: "full_name",
                // required: true,
                // async: true,
                col: 12 + " col-sm-2 Z-Index ",
            },
        }),

        staff: {
            type: "advanceSelect",
            label: "Select Team Member",
            target: `${props.branchId}/role-users/staff`,
            optionLabel: "full_name",
            optionId: "id",
            async: true,
            col: 12 + " col-sm-2 Z-Index ",
        },
        start_date:{
            type:"date",
            label:"Select From",
            col: 12 + ' col-sm-2  ',
            getValue:(data) => {
                setTimeout(() => {
                setMinDate(data?.value)
            }, 0)
        }
        },
        end_date:{
            type:"date",
            label:"Select To",
            col: 12 + ' col-sm-2  ',
            placeholderText: minDate ? "" : "Please select the start date",
            disabled:minDate ? false : true,
            minDate:minDate,
        }
    };

    const columns = [
        // { dataField: 'id', text: 'ID', align: 'center', sort: true },
        {
            dataField: "created_at",
            text: "Created At",
            align: "center",
            sort: true,
        },
        {
            dataField: 'name',
            text: 'Name',
            align: 'center',
            sort: true
        },
        {
            dataField: 'supervisor.first_name',
            text: 'Supervisor',
            align: 'center',
            sort: true
        },
        {
            isDummyField: true,
            align: "center",
            text: "Team Members",
            sort: true,
            formatter: (cell, row) => {
                return row?.users?.map(users => {
                    return users && <span>
                           {users?.username + `,`}
					</span>
                })
            },
        },


    ];


    const defaultSorted = [
        {
            dataField: 'name',
            order: 'desc'
        }
    ];

    return (
        <div className="animated">
            <Card>
                <CardHeader>
                    <strong>Team List</strong>
                </CardHeader>
                <CardBody>
                    <RemoteTable
                        entity={props?.userRole === "supervisor" ? `${props?.branchId}/supervisor-team` : `${props?.branchId}/teams`}
                        // entity="teams"
                        // customEntity={ props?.userRole === "supervisor" ? `teams?branch_id=${props?.branchId}` : props?.branchId !== null ? `teams?company_id=${props?.companyId}&branch_id=${props?.branchId}` :`teams?company_id=${props?.companyId}` }
                        customEntity={`teams`}
                        hideActionCol={props?.userRole === "supervisor" ? true : false}
                        columns={columns}
                        hideDetail={true}
                        Query={query}
                        sort={defaultSorted}
                        filters={filters}
                        showAAdvancedFilters={true}
                        addRoute={props?.userRole === "supervisor" ? null : "teams/add"}
                        {...props.remoteTableFields}
                    />
                </CardBody>
            </Card>
        </div>
    );
}


const mapStateToProps = state => {
    return {
        branchId: state.selectedBranchId,
        companyName: state.companyName,
        companyId: state.companyId,
        userRole: state.userRole
    }
}

export default connect(mapStateToProps, null)(TeamsList);

