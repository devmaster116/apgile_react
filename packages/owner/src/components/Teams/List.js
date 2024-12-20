import React, {useState, useEffect} from 'react';
import {Card, CardBody, CardHeader} from 'reactstrap';
import RemoteTable from '@evenlogics/whf-remote-table';
import {connect} from "react-redux";

const TeamsList = (props) => {
    const [query, setQuery] = useState(false);
    const [minDate, setMinDate] = useState('');
    const [valueOff, setValueOff] = useState(0);

/* eslint-disable */

    useEffect(() => {
        if(valueOff === 0){
            setValueOff(1)
        }else{
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
            col: 3,
        },

        ...(props.userRole !== "supervisor" && {
            supervisor_id: {
                type: "advanceSelect",
                label: "Select Supervisor",
                target:`${props.branchId}/role-users/supervisor`,
                optionLabel: "full_name",
                // required: true,
                // async: true,
                col: 3,
            },
        }),

        staff: {
            type: "advanceSelect",
            label: "Select Team Member",
            target:props?.userRole === "supervisor" ? `${props?.branchId}/supervisor-staffs` : `${props.branchId}/role-users/staff` ,
            optionLabel: "full_name",
            optionId: "id",
            async: true,
            col: 2,
        },
        start_date:{
            type:"date",
            label:"Select From",
            col: 2,
            getValue:(data) => {
                setTimeout(() => {
                setMinDate(data?.value)
            }, 0)
        }
        },
        end_date:{
            type:"date",
            label:"Select To",
            col: 2,
            placeholderText: minDate ? "" : "Please select the start date",
            disabled:minDate ? false : true,
            minDate:minDate,
        }
    };

    const columns = [
        {
            hidden:true,
            dataField: "id",
            text: "ID",
            align: "center",
            sort: true,
        },
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
            dataField: 'location_name.name',
            text: 'Location',
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
                return row?.users?.map((users,i) => {
                    return users && <span className={`badge h6 badge-dark text-capitalize  ${i !== row?.roles?.length-1 ? "mr-1" : ""}`}>
                           {users?.full_name}
					</span>
                })
            },
        },


    ];


    const defaultSorted = [
        {
            dataField: 'id',
            order: 'desc'
        }
    ];

    return (
        <div className="animated">
            <Card>
                <CardHeader>
                    <strong>All Teams</strong>
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
                        // query={
                        //     {
                        //         sort : "id|desc"
                        //     }
                        // }
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

