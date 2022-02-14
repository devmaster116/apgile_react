import React, { useEffect,useState } from 'react';
import { Card, CardBody, CardHeader } from 'reactstrap';
import RemoteTable from '@evenlogics/whf-remote-table';
import {connect} from "react-redux";

const LocationsList  = (props) => {
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
			{
				dataField: 'branch.name',
				text: 'Branch Name',
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

		const calculateParams = () => {
			let params ;
			if(props?.branchId === null){
			   params = {
				company_id:props?.companyId
			  }
			}else{
			  params = {
				company_id:props?.companyId,
				branch_id:props?.branchId
			  }
			}
			return params;
		  }

		return (
			<div className="animated">
				<Card>
					<CardHeader>
						<strong>Locations</strong>
					</CardHeader>
					<CardBody>
						<RemoteTable
							entity={`${props?.branchId}/locations`}
							customEntity={`locations`}
							columns={columns}
							sort={defaultSorted}
							addRoute="/locations/add"
							{...props.remoteTableFields}
							Query={query}
							
							// customEditLink = {`locations/:id/edit`}
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

export default connect(mapStateToProps,null)(LocationsList);

