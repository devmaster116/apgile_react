import React, { useState,useEffect } from 'react';
import { Card, CardBody, CardHeader } from 'reactstrap';
import RemoteTable from '@evenlogics/whf-remote-table';
import {connect} from "react-redux";

const TeamsList = (props) => {
    const [query, setQuery] = useState(false);
    useEffect(() => {
      setQuery((prev) => !prev);
    }, [props.branchId]);

		const columns = [
			{ dataField: 'id', text: 'ID', align: 'center', sort: true },
			{
				dataField: 'name',
				text: 'Name',
				align: 'center',
				sort: true
			},
			{
				dataField: 'supervisor.first_name',
				text: 'Supervisor',
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
						<strong>Team List</strong>
					</CardHeader>
					<CardBody>
						<RemoteTable
							entity={`${props?.branchId}/teams` }
							// entity="teams"
							// customEntity={ props?.userRole === "supervisor" ? `teams?branch_id=${props?.branchId}` : props?.branchId !== null ? `teams?company_id=${props?.companyId}&branch_id=${props?.branchId}` :`teams?company_id=${props?.companyId}` }
							customEntity={`teams`}
							hideActionCol={ props?.userRole === "supervisor" ? true : false}
							columns={columns}
							hideDetail={true}
							Query={query}
							sort={defaultSorted}
							addRoute={ props?.userRole === "supervisor" ? null : "teams/add"}
							{...props.remoteTableFields}
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

export default connect(mapStateToProps,null)(TeamsList);

