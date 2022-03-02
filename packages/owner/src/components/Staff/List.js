import React, {useState, useEffect} from 'react';
import {Card, CardBody, CardHeader} from 'reactstrap';
import RemoteTable from '@evenlogics/whf-remote-table';
import {connect} from "react-redux";
import api from "@evenlogics/whf-api";

const ItemsList = (props) => {

    const [query, setQuery] = useState(false);
    const [optionsArr, setOptionsArr] = useState([])
    useEffect(() => {
        var rolesArray=[];
        api.request("get","/roles")
        .then(({data}) => {
          rolesArray = data?.filter((role)=>(
             role.name !== "super-admin"
          ))
          let newOption = rolesArray?.map((role)=>{
            return {value:role.id,label:role.name}
          })
          setOptionsArr(newOption);
        })
        .catch((error) => console.log(error));
        setQuery((prev) => !prev);
    }, [props.branchId]);


    console.log(props?.branchId,"branchid")

    const filters = {

        roles_role_id: {
            // parent: "user",
            type: "advanceSelect",
            label: "Role",
            name: "roles_role_id",
            // target: "roles",
            options:optionsArr,
            // optionValue: 'value',
            // optionLabel: 'label',
            // required: true,
            col: 4,
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
        // {
        //     dataField: "id",
        //     text: "ID",
        //     align: "center",
        //     sort: true,
        // },
        {
            dataField: "username",
            text: "User Name",
            align: "center",
            sort: true,
        },
        {
            dataField: "first_name",
            text: "First Name",
            align: "center",
            sort: true,
        },
        {
            isDummyField: true,
            align: "center",
            text: "User Role",
            sort: true,
            formatter: (cell, row) => {
                return row.roles.map((rol) => {
                    return <span key={rol.id}>{rol?.name}</span>
                });
            },
        },
    ];


    const defaultSorted = [
        {
            dataField: 'username',
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
                        showAdvanceFilters = {true}
                        addRoute="/staff/add"
                        {...props.remoteTableFields}
                        Query={query}
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
