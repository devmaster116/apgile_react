import React, { useState,useEffect } from 'react';
import { Card, CardBody, CardHeader } from 'reactstrap';
import RemoteTable from '@evenlogics/whf-remote-table';

const ItemsList = (props) => {
	const [companyID, setCompanyID] = useState(null)
	useEffect(() => {
	  let ls =  JSON.parse(localStorage.getItem('currentUser'));
	  setCompanyID(ls?.company?.id);
   },[companyID]);

   console.log(companyID,"llll");

	const columns = [
		{
			dataField: 'id',
			text: 'ID',
			align: 'center',
			sort: true
		},
		{
			dataField: 'username',
			text: 'Name',
			align: 'center',
			sort: true
		},
		{
			dataField: 'description',
			text: 'Description',
			align: 'center',
			sort: true
		},
		// {
		// 	dataField: 'branch.name',
		// 	text: 'Branch Name',
		// 	align: 'center',
		// 	sort: true
		// },
		
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
