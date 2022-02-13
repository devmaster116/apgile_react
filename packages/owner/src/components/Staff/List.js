import React, {useState, useEffect} from 'react';
import {Card, CardBody, CardHeader} from 'reactstrap';
import RemoteTable from '@evenlogics/whf-remote-table';
import {connect} from "react-redux";

const ItemsList = (props) => {

    // const [query, setQuery] = useState(false);
    // useEffect(() => {
    //     setQuery((prev) => !prev);
    // });

    const columns = [
        {
            dataField: "id",
            text: "ID",
            align: "center",
            sort: true,
        },
        {
            dataField: "username",
            text: "Username",
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
            dataField: "email",
            text: "Email",
            align: "center",
            sort: true,
        },
        {
            isDummyField: true,
            align: "center",
            text: "Role",
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
            dataField: 'id',
            order: 'desc'
        }
    ];


// const calculateParams = () => {
//   let params ;
//   if(props?.branchId === null){
//      params = {
//       company_id:props?.companyId
//     }
//   }else{
//     params = {
//       company_id:props?.companyId,
//       branch_id:props?.branchId
//     }
//   }
//   return params;
// }

    return (
        <div className="animated">
            <Card>
                <CardHeader>
                    <strong>All Staff</strong>
                </CardHeader>
                <CardBody>
                    <RemoteTable
                        entity={ `${props?.branchId}/all-users` }
                        customEntity="staff"
                        columns={columns}
                        sort={defaultSorted}
                        addRoute="/staff/add"
                        {...props.remoteTableFields}
                        // Query={query}
                        // query={calculateParams()}
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
