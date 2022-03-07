import React, { useState, useEffect } from "react";
import { Card, CardBody, CardHeader,Button } from 'reactstrap';
import RemoteTable from '@evenlogics/whf-remote-table';
import {connect} from "react-redux";
import api from "@evenlogics/whf-api";
import { toast } from 'react-toastify';

const List = (props) => {

	const [query, setQuery] = useState(false)

	useEffect(() => {
		setQuery((prev)=>!prev)
	}, [props.branchId]);

	const changeStatus = (data) => {
		let payload = {
			status:!data?.status
		}
		api.request("put",`/${props.branchId}/watch/status/${data?.id}`,payload)
			.then((data) => {
				console.log(data)
				setQuery(!query)
			})
			.catch((error) => toast.error(`${error.response.data.message}`));
	}

	const columns = [

		// {
		// 	dataField: 'id',
		// 	text: 'ID',
		// 	align: 'center',
		// 	sort: true
		// },
		{
			dataField: 'user.username',
			text: 'Username',
			align: 'center',
			sort: true
		},
		{
			dataField: 'branch.name',
			text: 'Branch',
			align: 'center',
			sort: true
		},
		{
			dataField: 'os',
			text: 'Operating System',
			align: 'center',
			sort: true
		},
		{
			dataField: 'device',
			text: 'Device',
			align: 'center',
			sort: true
		},
		{
			align: "center",
			text: "Status",
			sort: true,
			formatter: (cell, row) => {
				console.log(row?.status,"status")
				return (
					<Button color={row?.status === true ? "success" : "danger"} onClick={()=>changeStatus(row)}>
						{row?.status === true ? "Active" : "Inactive"}
					</Button>
				);
			},
		},

		{
			dataField: 'uuid',
			text: 'Uuid',
			align: 'center',
			sort: true
		},


	];




		const defaultSorted = [
			{
				dataField: 'user.username',
				order: 'desc'
			}
		];

		return (
			<div className="animated">
				<Card>
					<CardHeader>
						<strong>All Watches</strong>
					</CardHeader>
					<CardBody>
						<RemoteTable
							entity={`${props?.branchId}/watches`}
							customEntity={`watches`}
							columns={columns}
							hideDetail={true}
							sort={defaultSorted}
							// addRoute="/watches/add"
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
	  branchId : state.selectedBranchId,
	  companyName : state.companyName,
	  companyId : state.companyId,
	  userRole : state.userRole
	  }
  }


export default connect(mapStateToProps,null)(List);
