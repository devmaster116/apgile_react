import React, { useEffect,useState } from 'react';
import { Card, CardBody, CardHeader,Button } from 'reactstrap';
import RemoteTable from '@evenlogics/whf-remote-table';
import {connect} from "react-redux";
import api from "@evenlogics/whf-api";

const LocationsList  = (props) => {
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
    };
	const changeStatus = (data) => {
		console.log(data,"data")
		let payload = {
			status: !data?.status,
		}
		api.request("put",`/${props?.branchId}/location/status/${data?.id}`,payload)
		.then((data) => {
			console.log(data)
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
			{
				dataField: 'description',
				text: 'Description',
				align: 'center',
				sort: true
			},

			{
				isDummyField: true,
				text: "Start Time",
				align: "center",
				sort: true,
				formatter: (cell, row) => {
					if(row?.start_list){
						return (
								<span className="badge badge-dark">
									 {row?.start_list}
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
					if(row?.end_list){
						return (
								<span className="badge badge-dark">
									 {row?.end_list}
								</span>
						)
					}
				},
			},

			{
				dataField: 'weekdays_name',
				text: 'Days',
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
						<strong>All Locations</strong>
					</CardHeader>
					<CardBody>
						<RemoteTable
							entity={`${props?.branchId}/locations`}
							customEntity={`locations`}
							columns={columns}
							sort={defaultSorted}
							hideDetail={true}
							filters={filters}
							showAAdvancedFilters={true}
							addRoute="/locations/add"
							{...props.remoteTableFields}
							Query={query}
							// query={
							// 	{
							// 		sort : "id|desc"
							// 	}
							// }

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

