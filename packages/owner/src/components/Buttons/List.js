import React, { useState, useEffect } from 'react';
import { Card, CardBody, CardHeader, Button } from 'reactstrap';
import RemoteTable from '@evenlogics/whf-remote-table';
import { connect } from "react-redux";
import api from "@evenlogics/whf-api";
import { toast } from 'react-toastify';

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

	const changeStatus = (data) => {
		let payload = {
			status: !data?.status,
		}
		api.request("put", `/${props?.branchId}/buttons/status/${data?.id}`, payload)
			.then((data) => {
				setQuery(!query)
			})
			.catch((error) => console.log(error));
	}

	const handleCountReset = (data) => {
		console.log(data,"data")
		api.request("post", `/${props?.branchId}/buttons/reset-count/${data?.uuid}`)
			.then((data) => {
				setQuery(!query)
				toast.success('Counter has been reset')
			})
			.catch((error) => console.log(error));
	}

	const filters = {
		// uuid: {
		// 	type: "text",
		// 	label: "UUID",
		// 	col: 3
		// },
		page_id: {
			type: "advanceSelect",
			label: "Select Item Type",
			target: `${props.branchId}/pages`,
			col: 3,
		},
		status: {
			type: "switch",
			label: "Status",
			col: 3
		}
	}

	const columns = [
		{
			hidden: true,
			dataField: "id",
			text: "ID",
			align: "center",
			sort: true,
		},
		{
			dataField: "uuid",
			text: "UUID",
			align: "center",
			sort: true,
		},
		{
			dataField: 'page.name',
			text: 'Item',
			align: 'center',
			sort: true
		},
		{
			dataField: 'table.area_page.area.name',
			text: 'Area',
			align: 'center',
			sort: true
		},
		{
			dataField: 'table.location.name',
			text: 'Location',
			align: 'center',
			sort: true
		},
		{
			isDummyField: true,
			text: "Slots",
			align: "center",
			sort: true,
			formatter: (cell, row) => {
				if (row?.slots) {
					return (
						
							row.slots.map((s)=><span className="badge badge-dark">{s.name}</span>)
						
					)
				}
			},
		},
		// {
		// 	dataField: 'type_label',
		// 	text: 'Type',
		// 	align: 'center',
		// 	sort: true
		// },
		{
			dataField: 'call_count',
			text: 'Count',
			align: 'center',
			sort: true
		},
		{
			dataField: 'url',
			align: "center",
			text: "URL",
			sort: true,
			formatter: (cell, row) => {
				return (
					<input type="text" value={cell} className="form-control" disabled />
				);
			},
		},
		{
			align: "center",
			text: "Status",
			sort: true,
			formatter: (cell, row) => {
				return (
					<Button color={row?.status === true ? "success" : "danger"} onClick={() => changeStatus(row)}>
						{row?.status === true ? "Active" : "Inactive"}
					</Button>
				);
			},
		},
		{
			align: "center",
			text: "Battery Percentage",
			sort: true,
			formatter: (cell, row) => {
				return (
                   <span class={row?.battery_percentage <= 30 ? 'badge badge-pill badge-danger' : 'badge badge-pill badge-success'}>{row?.battery_percentage}%</span>
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
					<strong>All Buttons</strong>
				</CardHeader>
				<CardBody>
					<RemoteTable
						entity={`${props?.branchId}/buttons`}
						customEntity={`buttons`}
						columns={columns}
						// hideDetail={true}
						sort={defaultSorted}
						addRoute="/buttons/add"
						Query={query}
						filters={filters}
						showAdvancedFilters={true}
						customButton={{
							name: "Reset Count",
							color: "warning",
							classes: "text-white",
							callback: (data) => handleCountReset(data),
						}}
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
		branchId: state.selectedBranchId,
	}
}


export default connect(mapStateToProps, null)(ButtonList);
