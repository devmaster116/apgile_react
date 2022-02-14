import React, { useState,useEffect } from 'react';
import { Card, CardBody, CardHeader } from 'reactstrap';
import RemoteTable from '@evenlogics/whf-remote-table';
import {connect} from "react-redux";


const ItemsList = (props) => {

	const [query, setQuery] = useState(false);
	useEffect(() => {
		setQuery((prev)=>!prev)
		}, [props.branchId]);




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

		// const calculateParams = () => {
		// 	let params ;
		// 	if(props?.branchId === null){
		// 	   params = {
		// 		company_id:props?.companyId
		// 	  }
		// 	}else{
		// 	  params = {
		// 		company_id:props?.companyId,
		// 		branch_id:props?.branchId
		// 	  }
		// 	}
		// 	return params;
		//   }

		return (
			<div className="animated">
				<Card>
					<CardHeader>
						<strong>Items</strong>
					</CardHeader>
					<CardBody>
						<RemoteTable
							entity={`${props?.branchId}/items`}
							customEntity={`${props?.branchId}/items`}
							columns={columns}
							sort={defaultSorted}
							addRoute="/items/add"
							{...props.remoteTableFields}
							Query={query}
							// query={calculateParams()}
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


export default connect(mapStateToProps,null)(ItemsList);
