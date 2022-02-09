import React, { useState,useEffect } from 'react';
import { Card, CardBody, CardHeader } from 'reactstrap';
import RemoteTable from '@evenlogics/whf-remote-table';
import {connect} from "react-redux";


const ItemsList = (props) => {

	const [query, setQuery] = useState(false);

	useEffect(() => {
	    	// let ls = JSON.parse(localStorage.getItem("currentUser"));
		// setCompanyID(ls?.branch?.company_id);
			setQuery(!query)
		}, [props?.BranchID]);




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
			
		];

		if (props.extendedFields) {
			props.extendedFields.forEach(field => columns.push(field))
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
						<strong>Items</strong>
					</CardHeader>
					<CardBody>
						<RemoteTable
							entity={props?.BranchID !== null ? `items?branch_id=${props?.BranchID}`:`items`}
							customEntity={props?.BranchID !== null ? `items?branch_id=${props?.BranchID}`:`items`}
							columns={columns}
							sort={defaultSorted}
							addRoute="/items/add"
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
	   BranchID : state.selectedBranchId
	  }
  }
  
  
export default connect(mapStateToProps,null)(ItemsList);