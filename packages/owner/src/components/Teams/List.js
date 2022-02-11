import React, { useState,useEffect } from 'react';
import { Card, CardBody, CardHeader } from 'reactstrap';
import RemoteTable from '@evenlogics/whf-remote-table';
import {connect} from "react-redux";

const TeamsList = (props) => {
    const [query, setQuery] = useState(false);
    useEffect(() => {
      setQuery((prev) => !prev);
    }, [props.BranchID]);



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
							entity={ props?.userRole === "supervisor" ? `teams?branch_id=${props?.BranchID}` : props?.BranchID !== null ? `teams?company_id=${props?.companyId}&branch_id=${props?.BranchID}` :`teams?company_id=${props?.companyId}` }
							customEntity={ props?.userRole === "supervisor" ? `teams?branch_id=${props?.BranchID}` : props?.BranchID !== null ? `teams?company_id=${props?.companyId}&branch_id=${props?.BranchID}` :`teams?company_id=${props?.companyId}` }
							hideActionCol={ props?.userRole === "supervisor" ? true : false}
							columns={columns}
							Query={query}
							sort={defaultSorted}
							addRoute={ props?.userRole === "supervisor" ? null : "teams/add"}
							{...props.remoteTableFields}
						/>
					</CardBody>
				</Card>
			</div>
		);
	}


const mapStateToProps = state => {
    return {
       BranchID : state.selectedBranchId,
       companyName : state.companyName,
       companyId : state.companyId,
       userRole : state.userRole
      }
}

export default connect(mapStateToProps,null)(TeamsList);

