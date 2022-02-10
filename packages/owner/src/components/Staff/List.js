import React, { useState,useEffect } from 'react';
import { Card, CardBody, CardHeader } from 'reactstrap';
import RemoteTable from '@evenlogics/whf-remote-table';

const ItemsList = (props) => {
	
	const [companyID, setCompanyID] = useState(null)
	useEffect(() => {
	  let ls =  JSON.parse(localStorage.getItem('currentUser'));
	  setCompanyID(ls?.company?.id);
   },[companyID]);

//    useEffect(() => {
// 	window.location.reload()
//     },[]);

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

		return (
			<div className="animated">
				<Card>
					<CardHeader>
						<strong>All Staff</strong>
					</CardHeader>
					<CardBody>
						<RemoteTable
							entity={`all-users/${companyID}`}
							customEntity={`all-users/${companyID}`}
							columns={columns}
							sort={defaultSorted}
							addRoute="/staff/add"
							{...props.remoteTableFields}
						/>
					</CardBody>
				</Card>
			</div>
		);
	
}
export default ItemsList;
