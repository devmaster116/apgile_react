import React, { useEffect,useState } from 'react';
import { Card, CardBody, CardHeader } from 'reactstrap';
import RemoteTable from '@evenlogics/whf-remote-table';
import {connect} from "react-redux";

const LocationsList  = (props) => {
	const [query, setQuery] = useState(false);
    // const {id} = props.match.params;
	// console.log(props?.match?.params,"id");
	useEffect(() => {
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

		return (
			<div className="animated">
				<Card>
					<CardHeader>
						<strong>Locations</strong>
					</CardHeader>
					<CardBody>
						<RemoteTable
							entity={props?.BranchID !== null ? `locations?branch_id=${props?.BranchID}` : "locations"}
							customEntity={props?.BranchID !== null ? `locations?branch_id=${props?.BranchID}` : "locations"}
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
       BranchID : state.selectedBranchId
      }
}

export default connect(mapStateToProps,null)(LocationsList);

