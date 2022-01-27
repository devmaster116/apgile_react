import React from 'react';
import { Card, CardBody, CardHeader } from 'reactstrap';
import RemoteTable from '@evenlogics/whf-remote-table';

const List = (props) => {

		const columns = [
			{
				dataField: 'id',
				text: 'ID',
				align: 'center',
				sort: true
			},
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
				dataField: 'id',
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
							entity="branch-settings"
							customEntity="branch-settings"
							columns={columns}
							sort={defaultSorted}
							addRoute="/setting/add"
							{...props.remoteTableFields}
						/>
					</CardBody>
				</Card>
			</div>
		);
	
}
export default List;
