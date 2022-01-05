import React, { Component } from 'react';
import { Card, CardBody, CardHeader } from 'reactstrap';
import RemoteTable from '@evenlogics/whf-remote-table';
import { withTranslation } from 'react-i18next';

class LocationsList extends Component {
	render() {
		const columns = [
			{
				dataField: 'id',
				text: 'ID',
				align: 'center',
				sort: true
			},
			{
				dataField: 'name',
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
			{
				dataField: 'branch.name',
				text: 'Branch Name',
				align: 'center',
				sort: true
			},
			
		];

		if (this.props.extendedFields) {
			this.props.extendedFields.forEach(field => columns.push(field))
		}

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
						<strong>{this.props.t('base:terms')}</strong>
					</CardHeader>
					<CardBody>
						<RemoteTable
							entity="locations"
							customEntity="locations"
							columns={columns}
							sort={defaultSorted}
							addRoute="/owner/locations/add"
							{...this.props.remoteTableFields}
						/>
					</CardBody>
				</Card>
			</div>
		);
	}
}
export default withTranslation()(LocationsList);
