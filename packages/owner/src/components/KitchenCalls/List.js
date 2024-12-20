import React, {useEffect, useState} from 'react';
import {Card, CardBody, CardHeader} from 'reactstrap';
import RemoteTable from '@evenlogics/whf-remote-table';
import {connect} from "react-redux";
// import api from "@evenlogics/whf-api";
// import {toast} from 'react-toastify';
import AddInternal from "./Add";


const KithcenCallList = (props) => {
    const [query, setQuery] = useState(false);
    const [minDate, setMinDate] = useState('');
    const [internalActive, setInternalActive] = useState(false);
    const [valueOff, setValueOff] = useState(0);

/* eslint-disable */


    useEffect(() => {
        if(valueOff === 0){
            setValueOff(1)
        }else{
            setQuery((prev) => !prev)
        }
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));

        if(currentUser?.settings?.internal_active) {
            setInternalActive(true);
        }
    }, [props.branchId]);



    
/* eslint-enable */


    if(!internalActive) {
        return [];
    }
    const filters = {

        location_id: {
            type: "advanceSelect",
            label: "Select Location",
            target: props?.userRole === "supervisor" ? `${props?.branchId}/supervisor-locations` : `${props?.branchId}/locations`,
            async: true,
            col: 3,
        },

        staff_id: {
            type: "advanceSelect",
            label: "Select Staff Member",
            target:props?.userRole === "supervisor" ? `${props?.branchId}/supervisor-staffs` : `${props.branchId}/role-users/staff` ,
            optionLabel: "username",
            async: true,
            col: 2,
        },

        start_date: {
            type: "date",
            label: "Select From",
            col: 2,
            getValue: (data) => {
                setTimeout(() => {
                    setMinDate(data?.value)
                }, 0)
            }
        },
        end_date: {
            type: "date",
            label: "Select To",
            col: 2,
            placeholderText: minDate ? "" : "Please select the start date",
            disabled: minDate ? false : true,
            minDate: minDate,
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
            isDummyField: true,
            text: "Time Call Created",
            align: "center",
            sort: true,
            formatter: (cell, row) => {
                if (row?.created_at) {
                    return <span className="badge badge-dark">{row?.created_at}</span>;
                }
            },
        },

        {
            dataField: "staff_name",
            text: "Staff Member",
            align: "center",
            sort: true,
        },
        {
            dataField: "location_name",
            text: "Location",
            align: "center",
            sort: true,
        },
        {
            dataField: "status",
            text: "Status",
            align: "center",
            sort: true,
        }
    ];


    if (props.extendedFields) {
        props.extendedFields.forEach(field => columns.push(field))
    }

    const defaultSorted = [
        {
            dataField: 'id',
            order: 'desc'
        }
    ];

    const successCallback = (data) => {
        window.location.reload();
    }
    // const reverseCall = (id) => {
    //     console.log(id, "data")
    //     api.request("patch", `/${props?.branchId}/internal-call/${id}`).then(() => {
    //         setQuery(!query)
    //     }).catch((error) => console.log(error));
    // }
    return (
        <div className="animated">
            <AddInternal match={props.match} successCallback={successCallback}/>
            <Card>
                <CardHeader>
                    <strong>Internal Calls List</strong>
                </CardHeader>
                <CardBody>
                    <RemoteTable
                        entity={props.userRole === "supervisor" ? `${props?.branchId}/supervisor-internal-calls` : `${props?.branchId}/internal-call`}
                        customEntity={`internal-call`}
                        columns={columns}
                        sort={defaultSorted}
                        hideDetail={true}
                        hideDelete={true}
                        hideEdit={true}
                        filters={filters}
                        showAdvancedFilter={true}
                        // addRoute="/add-internal-call"
                        {...props.remoteTableFields}
                        Query={query}
                        hideActionCol={true}
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

}

const mapStateToProps = state => {
    return {
        branchId: state.selectedBranchId,
        companyName: state.companyName,
        companyId: state.companyId,
        userRole: state.userRole
    }
}

export default connect(mapStateToProps, null)(KithcenCallList);

