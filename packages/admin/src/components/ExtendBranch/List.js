import React, { Component } from 'react';
import { Card, CardBody, CardHeader } from 'reactstrap';
import RemoteTable from '@evenlogics/whf-remote-table';


class List extends Component {
	render() {

		
const filters = {
	company_id: {
	  type: "advanceSelect",
	  label: "Company",
	  target: 'companies?limit=1000',
	  async: true,
	  name: "company_id",
	  required: true,
	  col: 12 + ' col-xl-3 mt-2',
	}
  }
		const columns = [

            {
                dataField: 'id',
                text: 'id',
                align: 'center',
                sort: true
              }, {
                dataField: 'name',
                text: 'name',
                align: 'center',
                sort: true
              }, {
                dataField: 'phone1',
                text: 'phone',
                align: 'center',
                sort: true
              }, {
                dataField: 'company_name',
                text: 'company',
                align: 'center',
                sort: true
              }
			
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
						<strong>Branches List</strong>
					</CardHeader>
					<CardBody>
						<RemoteTable
							entity="branches"
							customEntity="branches"
							columns={columns}
							sort={defaultSorted}
							addRoute="/entity/branches/add"
							filters={filters}
							showAdvanceFilters = {true}
							{...this.props.remoteTableFields}
						/>
					</CardBody>
				</Card>
			</div>
		);
	}
}
export default List;
