import React, { useEffect,useState } from 'react';
import { Card, CardBody, CardHeader,Button } from 'reactstrap';
import RemoteTable from '@evenlogics/whf-remote-table';
import {connect} from "react-redux";
import api from "@evenlogics/whf-api";

const OrderItemList  = (props) => {
	const [query, setQuery] = useState(false);
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
			status_id: !data?.status,
		}
		api.request("put",`/${props?.branchId}/order-items/status/${data?.id}`,payload)
		.then((data) => {
			setQuery(!query)
		})
		.catch((error) => console.log(error));
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
				dataField: 'title',
				text: 'Title',
				align: 'center',
				sort: true
			},
			{
				isDummyField: true,
				text: "Slots",
				align: "center",
				sort: true,
				formatter: (cell, row) => {
					if (row?.slots_obj) {
						return (
							
								row.slots_obj.map((s)=><span className="badge badge-dark">{s.name}</span>)
							
						)
					}
				},
			},
			{
				dataField: 'description',
				text: 'Description',
				align: 'center',
				sort: true
			},

			{
				isDummyField: true,
				align: "center",
				text: "Status",
				sort: true,
				formatter: (cell, row) => {
				  return (
					<Button color={row?.status ? "success" : "danger"} onClick={()=>changeStatus(row)}>
					  {row?.status === 0 ? "Inactive" : "Active"}
					</Button>
				  );
				},
			  }

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
						<strong>All Order Items</strong>
					</CardHeader>
					<CardBody>
						<RemoteTable
							entity={`${props?.branchId}/order-items`}
							customEntity={`order-items`}
							columns={columns}
							sort={defaultSorted}
							hideDetail={true}
							Query={query}
							addRoute="/order-items/add"
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

export default connect(mapStateToProps,null)(OrderItemList);

