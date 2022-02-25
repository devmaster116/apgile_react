import React, { useEffect,useState } from 'react';
import { Card, CardBody, CardHeader } from 'reactstrap';
import RemoteTable from '@evenlogics/whf-remote-table';
import {connect} from "react-redux";
import api from "@evenlogics/whf-api";

const KithcenCallList  = (props) => {
	const [query, setQuery] = useState(false);
	useEffect(() => {
		setQuery((prev)=>!prev)
	}, [props.branchId]);



		const columns = [
			// {
			// 	dataField: 'id',
			// 	text: 'ID',
			// 	align: 'center',
			// 	sort: true
			// },
			{
				dataField: 'call.location_name',
				text: 'Location',
				align: 'center',
				sort: true
			},
			{
				dataField: 'action',
				text: 'Status',
				align: 'center',
				sort: true
			},
			{
				dataField: 'user.full_name',
				text: 'Received By',
				align: 'center',
				sort: true
			},



		];

		if (props.extendedFields) {
			props.extendedFields.forEach(field => columns.push(field))
		}

		const defaultSorted = [
			{
				dataField: 'call.location_name',
				order: 'desc'
			}
		];
		const reverseCall = (data) => {
			console.log(data,"data")
			api.request("patch",`/${props?.branchId}/kitchen-call/${data.id}`).then(() => { setQuery(!query)}).catch((error) => console.log(error));
		  }
		return (
			<div className="animated">
				<Card>
					<CardHeader>
						<strong>Kitchen Calls List</strong>
					</CardHeader>
					<CardBody>
						<RemoteTable
							entity={`${props?.branchId}/kitchen-call`}
							customEntity={`kitchen-call`}
							columns={columns}
							sort={defaultSorted}
							hideDetail={true}
							hideEdit={true}
							// addRoute="/kitchen-call/add"
							{...props.remoteTableFields}
							Query={query}
							customButton={{
								name: "Reverse Call",
								color: "warning",
								classes:"text-white",
								callback: (data) => {reverseCall(data)}

							  }}
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

export default connect(mapStateToProps,null)(KithcenCallList);

