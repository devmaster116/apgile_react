import React, {Component, useState} from 'react';
import {Card, CardBody, CardHeader, Button} from 'reactstrap';
import { connect } from "react-redux";
import Block from "../DashboardWidgets/Block";
import {CCol, CRow} from "@coreui/react-pro";
import {getColor} from "@facepays/common";
import {changeBranch, setCompany, setReduxData} from "../Redux/BranchActions";
import api from "@evenlogics/whf-api";

const StaffDetail = (props) => {
	const [userData, setUserData] = useState([])

	let labelArr = []
	let valueArr = []
	api.request("get", `/${props.selectedBranchId}/dashboard/`)
		.then(({ data }) => {
			setUserData(data)
			userData?.calls && Object.entries(userData?.calls).forEach(([key, val], i) => {
				if(key !== "total"){
					labelArr.push(key.toUpperCase());
					valueArr.push(val);
				}

			})
		})
		.catch((error) => console.log(error))

		return (
			<div>
				<Card className="animated fadeIn xl-12 lg-12 md-12 sm-12 xs-12">
					<CardHeader>
						User Name
						<Button
							size="sm"
							color="primary"
							className="float-right"
						>Go Back</Button>
					</CardHeader>
					<CardBody>

						<CCol lg={4}>
							<CRow>
								{
									userData?.calls && Object.entries(userData?.calls).map(([key, val], i) => (
										<CCol xs={12} sm={4} lg={6} key={i}>
											<Block title={key} value={val} color={getColor(i)} />
										</CCol>
									))
								}
							</CRow>
						</CCol>

					</CardBody>

				</Card>
			</div>
		);
}

const mapStateToProps = state => {
	return {
		companyName: state.companyName,
		userRole: state.userRole,
		companyId: state.companyId,
		selectedBranchId: state.selectedBranchId,
	}
}

const mapDispatchToProps = dispatch => {
	return {
		changeBranch: (valueObj) => dispatch(changeBranch(valueObj)),
		setCompany: (valueObj) => dispatch(setCompany(valueObj)),
		setReduxData: (valueObj) => dispatch(setReduxData(valueObj))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(StaffDetail);
