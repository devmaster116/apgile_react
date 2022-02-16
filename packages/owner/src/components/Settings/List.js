import React, { useState, useEffect } from "react";
import { Card, CardBody, CardHeader } from 'reactstrap';
import RemoteTable from '@evenlogics/whf-remote-table';
import {connect} from "react-redux";

const List = (props) => {

	const [query, setQuery] = useState(false)

	useEffect(() => {
		setQuery((prev)=>!prev)
	}, [props.branchId]);

		const columns = [
			// {
			// 	dataField: 'id',
			// 	text: 'ID',
			// 	align: 'center',
			// 	sort: true
			// },
			{
				dataField: 'branch_id',
				text: 'Branch Id',
				align: 'center',
				sort: true
			},
			{
				dataField: 'escalation_hop',
				text: 'Escalation Hop',
				align: 'center',
				sort: true
			},
			{
				dataField: 'throttle_wait',
				text: 'Throttle Wait',
				align: 'center',
				sort: true
			},
			{
				dataField: 'wait_time',
				text: 'Wait Time',
				align: 'center',
				sort: true
			},
			{
				dataField: 'cycle',
				text: 'Cycle',
				align: 'center',
				sort: true
			},
			
			
		];

		

		const defaultSorted = [
			{
				dataField: 'branch_id',
				order: 'desc'
			}
		];

		return (
			<div className="animated">
				<Card>
					<CardHeader>
						<strong>All Setting</strong>
					</CardHeader>
					<CardBody>
						<RemoteTable
							entity={`${props?.branchId}/branch-settings`}
							customEntity={`branch-settings`}
							columns={columns}
							sort={defaultSorted}
							addRoute="/setting/add"
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
	  branchId : state.selectedBranchId,
	  companyName : state.companyName,
	  companyId : state.companyId,
	  userRole : state.userRole
	  }
  }
  
  
export default connect(mapStateToProps,null)(List);