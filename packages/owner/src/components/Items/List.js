import React, { useState,useEffect } from 'react';
import { Card, CardBody, CardHeader } from 'reactstrap';
import RemoteTable from '@evenlogics/whf-remote-table';
import {connect} from "react-redux";


const ItemsList = (props) => {

	const [query, setQuery] = useState(false);
	useEffect(() => {
		setQuery((prev)=>!prev)
		}, [props.branchId]);

		const filters = {
			location_id: {
				type: "advanceSelect",
				label: "Select Location",
				target: `${props?.branchId}/locations`,
				async: true,
				col: 12 + ' col-sm-3  ',
			},
		 }

		const columns = [
			// {
			// 	dataField: 'id',
			// 	text: 'ID',
			// 	align: 'center',
			// 	sort: true
			// },
			{
				dataField: 'name',
				text: 'Name',
				align: 'center',
				sort: true
			},
			// {
			// 	dataField: 'description',
			// 	text: 'Description',
			// 	align: 'center',
			// 	sort: true
			// },
			{
				dataField: 'prefix',
				text: 'Prefix',
				align: 'center',
				sort: true
			},
			{
				dataField: 'postfix',
				text: 'Postfix',
				align: 'center',
				sort: true
			},
			{
				dataField: 'starting_number',
				text: 'Starting Number',
				align: 'center',
				sort: true
			},

		];

		if (props.extendedFields) {
			props.extendedFields.forEach(field => columns.push(field))
		}

		const defaultSorted = [
			{
				dataField: 'name',
				order: 'desc'
			}
		];



		return (
			<div className="animated">
				<Card>
					<CardHeader>
						<strong>Items</strong>
					</CardHeader>
					<CardBody>
						<RemoteTable
							entity={`${props?.branchId}/items`}
							customEntity={`items`}
							columns={columns}
							hideDetail={true}
							sort={defaultSorted}
							addRoute="/items/add"
							{...props.remoteTableFields}
							Query={query}
							filters={filters}
							showAdvancedFilters={true}
						/>
					</CardBody>
				</Card>
			</div>
		);
}
const mapStateToProps = state => {
	return {
		branchId : state.selectedBranchId,
	  }
  }


export default connect(mapStateToProps,null)(ItemsList);
