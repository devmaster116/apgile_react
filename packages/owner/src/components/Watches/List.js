import React, { useState, useEffect } from "react";
import { Card, CardBody, CardHeader,Button } from 'reactstrap';
import RemoteTable from '@evenlogics/whf-remote-table';
import {connect} from "react-redux";
import api from "@evenlogics/whf-api";
import { toast } from 'react-toastify';

const List = (props) => {

	const [query, setQuery] = useState(false)
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
	const filters = {
		status:{
			type: "advanceSelect",
			label: "Select Status",
		   options:[
			 {label:"Active",value:"1"},
			 {label:"Inactive",value:"0"},
		   ],
			col: 4,
		},
	  };
	const columns = [

		{
            hidden:true,
            dataField: "id",
            text: "ID",
            align: "center",
            sort: true,
        },
		{
			dataField: 'user.full_name',
			text: 'Name',
			align: 'center',
			sort: true
		},
		// {
		// 	dataField: 'branch.name',
		// 	text: 'Branch',
		// 	align: 'center',
		// 	sort: true
		// },
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
			dataField: 'app_version',
			text: 'App Ver.',
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
				dataField: 'id',
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
	  companyName : state.companyName,
	  companyId : state.companyId,
	  userRole : state.userRole
	  }
  }


export default connect(mapStateToProps,null)(List);
