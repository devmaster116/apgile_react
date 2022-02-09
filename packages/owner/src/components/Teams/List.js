import React, { useState,useEffect } from 'react';
import { Card, CardBody, CardHeader } from 'reactstrap';
import RemoteTable from '@evenlogics/whf-remote-table';
import {connect} from "react-redux";

const TeamsList = (props) => {

	const [companyID, setCompanyID] = useState(null)
	const [userRole, setUserRole] = useState(null)
    const [branchID, setBranchID] = useState(null)
    const [query, setQuery] = useState(false)

   
  useEffect(() => {
    let ls = JSON.parse(localStorage.getItem("currentUser"));
    setCompanyID(ls?.branch?.company_id);
    setBranchID(ls?.branch?.id);
	let roled = ls?.roles?.map(role => setUserRole(role));
    setQuery(!query);
    
 },[companyID,userRole,branchID,props?.BranchID]);


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
							entity={ userRole?.includes("supervisor") ? `teams?branch_id=${branchID}` : props?.BranchID !== null ? `teams?branch_id=${props?.BranchID}` :`teams?company_id=${companyID}` }
							customEntity={ userRole?.includes("supervisor") ? `teams?branch_id=${branchID}` : props?.BranchID !== null ? `teams?company_id=${companyID}&branch_id=${props?.BranchID}` :`teams?company_id=${companyID}` }
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


const mapStateToProps = state => {
    return {
       BranchID : state.selectedBranchId
      }
}

export default connect(mapStateToProps,null)(TeamsList);

