import React, {useState, useEffect} from 'react';
import {Card, CardBody, CardHeader} from 'reactstrap';
import RemoteTable from '@evenlogics/whf-remote-table';
import {connect} from "react-redux";
import api from "@evenlogics/whf-api";

const ItemsList = (props) => {

    const [query, setQuery] = useState(false);
    const [minDate, setMinDate] = useState('');
    const [valueOff, setValueOff] = useState(0);

    const [optionsArr, setOptionsArr] = useState([])
        /* eslint-disable */
    useEffect(() => {
        var rolesArray = [];
        api.request("get", "/roles")
            .then(({data}) => {
                rolesArray = data?.filter((role) => (
                    role.name !== "super-admin"
                ))
                let newOption = rolesArray?.map((role) => {
                    return {value: role.id, label: role.name}
                })
                setOptionsArr(newOption);
            })
            .catch((error) => console.log(error));
            if(valueOff === 0){
                setValueOff(1)
            }else{
                setQuery((prev) => !prev)
            }
    }, [props.branchId]);
    /* eslint-enable */


     

    console.log(props?.branchId, "branchid")

    const filters = {

        roles_role_id: {
            // parent: "user",
            type: "advanceSelect",
            label: "Role",
            name: "roles_role_id",
            col: 4,
            // target: "roles",
            options: optionsArr,
            // optionValue: 'value',
            // optionLabel: 'label',
            // required: true,
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
        //     role_id: {
        //       type: "advanceSelect",
        //       label: "Roles",
        //       target: "roles",
        //       classes:"mt-5",
        //       async: true,
        //       name: "role_id",
        //       required: true,
        //       col:4

        //   }
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
            dataField: "created_at",
            text: "Created At",
            align: "center",
            sort: true,
            className: "badge h6 badge-dark"
        },
        {
            dataField: "username",
            text: "User Name",
            align: "center",
            sort: true,
        },
        {
            dataField: "full_name",
            text: "Name",
            align: "center",
            sort: true,
        },
        {
            isDummyField: true,
            align: "center",
            text: "User Role",
            sort: true,
            formatter: (cell, row) => {
                return row.roles.map((rol, i) => {
                    return <span
                        className={`badge h6 badge-dark text-capitalize  ${i !== row?.roles?.length - 1 ? "mr-1" : ""}`}
                        key={rol.id}>{rol?.name}</span>
                });
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
                    <strong>All Staff</strong>
                </CardHeader>
                <CardBody>
                    <RemoteTable
                        entity={`${props?.branchId}/users`}
                        customEntity="staff"
                        columns={columns}
                        sort={defaultSorted}
                        hideDetail={true}
                        filters={filters}
                        showAdvanceFilters={true}
                        addRoute="/staff/add"
                        {...props.remoteTableFields}
                        Query={query}
                        customButton={{
                            name: "Performance",
                            color: "warning",
                            callback: (data) => props?.history?.push(`/staff/${data?.id}/details`),
                        }}
                        // query={
                        //     {
                        //         sort: "id|desc"
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

export default connect(mapStateToProps, null)(ItemsList);
