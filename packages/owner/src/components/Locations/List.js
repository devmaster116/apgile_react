import React, { useEffect,useState } from 'react';
import { Card, CardBody, CardHeader } from 'reactstrap';
import RemoteTable from '@evenlogics/whf-remote-table';
import {connect} from "react-redux";

const KithcenCallList  = (props) => {
	const [query, setQuery] = useState(false);
    const [minDate, setMinDate] = useState('');

	useEffect(() => {
		setQuery((prev)=>!prev)
	}, [props.branchId]);


	const filters = {
		start_date:{
            type:"date",
            label:"Select From",
            col: 12 + ' col-sm-2  ',
            getValue:(data) => {
                setTimeout(() => {
                setMinDate(data?.value)
            }, 0)
        }
        },
        end_date:{
            type:"date",
            label:"Select To",
            col: 12 + ' col-sm-2  ',
            placeholderText: minDate ? "" : "Please select the start date",
            disabled:minDate ? false : true,
            minDate:minDate,
        }
    };

		const columns = [
			// {
			// 	dataField: 'id',
			// 	text: 'ID',
			// 	align: 'center',
			// 	sort: true
			// },
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
				dataField: 'start_time',
				text: 'Start Time',
				align: 'center',
				sort: true
			},
			{
				isDummyField: true,
				text: "Start Time",
				align: "center",
				sort: true,
				formatter: (cell, row) => {
					if(row?.start_time){
						return (
								<span className="badge badge-dark">
									 {row?.start_time}
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
					if(row?.end_time){
						return (
								<span className="badge badge-dark">
									 {row?.end_time}
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
			


		];

		if (props.extendedFields) {
			props.extendedFields.forEach(field => columns.push(field))
		}

		const defaultSorted = [
			{
				dataField: 'name',
				order: 'desc'
			}
		];

		return (
			<div className="animated">
				<Card>
					<CardHeader>
						<strong>Locations List</strong>
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

