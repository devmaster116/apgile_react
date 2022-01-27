import React, { useState,useEffect } from 'react';
import { Card, CardBody, CardHeader } from 'reactstrap';
import RemoteTable from '@evenlogics/whf-remote-table';

const TeamsList = (props) => {

	const [companyID, setCompanyID] = useState(null)
	const [userRole, setUserRole] = useState(null)
    const [branchID, setBranchID] = useState(null)
    const [query, setQuery] = useState(false)

   
  useEffect(() => {
    let ls =  JSON.parse(localStorage.getItem('currentUser'));
   let roled = ls?.roles?.map(role => setUserRole(role));
//    setUserRole(roled)
   console.log(roled);
    setCompanyID(ls?.branch?.company_id);
    setBranchID(ls?.branch?.id);
    setQuery(true);
    
 },[companyID,userRole,branchID]);

	console.log(userRole,"role");

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
							entity= { userRole?.includes("supervisor") ? `teams?branch_id=${branchID}` : `teams?company_id=${companyID}`}
							customEntity={ userRole?.includes("supervisor") ? `teams?branch_id=${branchID}` : `teams?company_id=${companyID}`}
							hideActionCol={ userRole?.includes("supervisor") ? true : false}
							columns={columns}
							Query={query}
							sort={defaultSorted}
							addRoute={ userRole?.includes("supervisor") ? null : "teams/add"}
							{...props.remoteTableFields}
						/>
					</CardBody>
				</Card>
			</div>
		);
	}

export default TeamsList;
