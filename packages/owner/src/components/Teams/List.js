import React, { useState,useEffect } from 'react';
import { Card, CardBody, CardHeader } from 'reactstrap';
import RemoteTable from '@evenlogics/whf-remote-table';

const TeamsList = (props) => {

	const [companyID, setCompanyID] = useState(null)
     useEffect(() => {
       let ls =  JSON.parse(localStorage.getItem('currentUser'));
       setCompanyID(ls?.company?.id);
    },[companyID])

		const columns = [
			{ dataField: 'id', text: 'ID', align: 'center', sort: true },
			{
				dataField: 'name',
				text: 'Name',
				align: 'center',
				sort: true
			},
			{
				dataField: 'supervisor.username',
				text: 'Supervisor Name',
				align: 'center',
				sort: true
			},
			{
				dataField: 'branch.name',
				text: 'Branch Name',
				align: 'center',
				sort: true
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
						<strong>Team List</strong>
					</CardHeader>
					<CardBody>
						<RemoteTable
							entity={`teams?company_id=${companyID}`}
							customEntity={`teams?company_id=${companyID}`}
							columns={columns}
							sort={defaultSorted}
							addRoute="teams/add"
							{...props.remoteTableFields}
						/>
					</CardBody>
				</Card>
			</div>
		);
	}

export default TeamsList;
