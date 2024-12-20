import React, { useState,useEffect } from 'react';
import { Card, CardBody, CardHeader } from 'reactstrap';
import RemoteTable from '@evenlogics/whf-remote-table';
import {connect} from "react-redux";


const ItemsList = (props) => {

	const [query, setQuery] = useState(false);
    const [minDate, setMinDate] = useState('');
    const [valueOff, setValueOff] = useState(0);

/* eslint-disable */
    useEffect(() => {
        if(valueOff === 0){
            setValueOff(1)
        }else{
            setQuery((prev) => !prev)
        }
    }, [props.branchId]);
/* eslint-enable */

		const filters = {
			location_id: {
				type: "advanceSelect",
				label: "Select Location",
				target: `${props?.branchId}/locations`,
				async: true,
				col: 4,
			},
			start_date:{
				type:"date",
				label:"Select From",
				col: 4,
				getValue:(data) => {
					setTimeout(() => {
					setMinDate(data?.value)
				}, 0)
			}
			},
			end_date:{
				type:"date",
				label:"Select To",
				col: 4,
				placeholderText: minDate ? "" : "Please select the start date",
				disabled:minDate ? false : true,
				minDate:minDate,
			}
		 }

		const columns = [
			{
				hidden:true,
				dataField: "id",
				text: "ID",
				align: "center",
				sort: true,
			},
			{
				dataField: "created_at",
				text: "Created At",
				align: "center",
				sort: true,
			},
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
			{
				dataField: 'location.name',
				text: 'Location',
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
						<strong>All Items</strong>
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
							// query={
							// 	{
							// 		sort : "id|desc"
							// 	}
							// }
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
