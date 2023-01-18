import React, { useState, useEffect } from 'react';
import { Card, CardBody, CardHeader, Button } from 'reactstrap';
import RemoteTable from '@evenlogics/whf-remote-table';
import { connect } from "react-redux";
import api from "@evenlogics/whf-api";

const ButtonList = (props) => {

	const [query, setQuery] = useState(false);
	const [valueOff, setValueOff] = useState(0);

	useEffect(() => {
		if (valueOff === 0) {
			setValueOff(1)
		} else {
			setQuery((prev) => !prev)
		}
	}, [valueOff]);

	// const changeStatus = (data) => {
	// 	let payload = {
	// 		status: !data?.status,
	// 	}
	// 	api.request("put", `/${props?.branchId}/buttons/status/${data?.id}`, payload)
	// 		.then((data) => {
	// 			setQuery(!query)
	// 		})
	// 		.catch((error) => console.log(error));
	// }

	

	// const filters = {
	// 	// uuid: {
	// 	// 	type: "text",
	// 	// 	label: "UUID",
	// 	// 	col: 3
	// 	// },
	// 	action: {
    //         type: "text",
    //         label: "Action",
    //         col: 3,
    //     },
	// 	status: {
	// 		type: "switch",
	// 		label: "Status",
	// 		col: 3
	// 	}
	// }

	const columns = [
		{
			hidden: true,
			dataField: "id",
			text: "ID",
			align: "center",
			sort: true,
		},
	
		{
			dataField: "title",
			text: "Title",
			align: "center",
			sort: true,
		},
		{
			dataField: 'weekdays_name',
			text: 'Days',
			align: 'center',
			sort: true
		},
		{
			isDummyField: true,
			text: "Start Time",
			align: "center",
			sort: true,
			formatter: (cell, row) => {
				if (row?.time) {
					return (
						<span className="badge badge-dark">
							{row.time[0]}
						</span>
					)
				}
			},
		},
		{
			isDummyField: true,
			text: "End Time",
			align: "center",
			sort: true,
			formatter: (cell, row) => {
				if (row?.time) {
					return (
						<span className="badge badge-dark">
							{row?.time[1]}
						</span>
					)
				}
			},
		},
		{
			align: "center",
			text: "Status",
			sort: true,
			formatter: (cell, row) => {
				console.log(row,row.status_id)
				return (
					<Button color={row?.status_id === 1 ? "success" : "danger"} 
					// onClick={
					// 	() => changeStatus(row)
					// 	}
						>
						{row?.status_id === 1 ? "Active" : "Inactive"}
					</Button>
				);
			},
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
					<strong>All Virtual Buttons</strong>
				</CardHeader>
				<CardBody>
					<RemoteTable
						entity={`${props?.branchId}/virtual-buttons`}
						customEntity={`virtual-buttons`}
						columns={columns}
						// hideDetail={true}
						sort={defaultSorted}
						addRoute="/virtual-buttons/add"
						Query={query}
						// filters={filters}
						// showAdvancedFilters={true}
						// customButton={{
						// 	name: "Reset Count",
						// 	color: "warning",
						// 	classes: "text-white",
						// 	callback: (data) => handleCountReset(data),
						// }}
					/>
				</CardBody>
			</Card>
		</div>
	);
}
const mapStateToProps = state => {
	return {
		branchId: state.selectedBranchId,
	}
}


export default connect(mapStateToProps, null)(ButtonList);
