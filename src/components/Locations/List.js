import React, { Component } from 'react';
import { Card, CardBody, CardHeader } from 'reactstrap';
import RemoteTable from '@evenlogics/whf-remote-table';
import { withTranslation } from 'react-i18next';

class LocationsList extends Component {
	render() {
		const columns = [
			{ dataField: 'id', text: this.props.t('id'), align: 'center', sort: true },
			{
				dataField: 'title',
				text: this.props.t('title'),
				align: 'center',
				sort: true
			},
			{
				dataField: 'parent_id',
				text: this.props.t('parent_id'),
				align: 'center',
				sort: true
			},
			{
				dataField: 'slug',
				text: this.props.t('slug'),
				align: 'center',
				sort: true
			},
			{
				dataField: 'module_name',
				text: this.props.t('base:module-name'),
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
							entity="terms"
							customEntity="base/terms"
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
