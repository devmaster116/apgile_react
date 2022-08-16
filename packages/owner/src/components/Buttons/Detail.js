import React, {useEffect, useState} from 'react';
import {Card, CardBody} from "reactstrap";
import {Header} from "@evenlogics/whf-ra-components";
import {CCol, CRow} from "@coreui/react-pro";
import Block from "../DashboardWidgets/Block";
import api from "@evenlogics/whf-api";
import {connect} from "react-redux";


const ButtonDetail = (props) => {
	const {id} = props.match.params;
	const [buttonData, setButtonData] = useState({});
	const [loading, setLoading] = useState(true);
	const [counter, setCounter] = useState(0);

	const dataCall = () => {
		api.request("get", `/${props.branchId}/buttons/${id}`).then(({data}) => {
			setButtonData(data);
			setLoading(false);
		}).catch((error) => console.log(error));
	}

	useEffect(() => {
		dataCall();
		setTimeout(function() {
			setCounter(counter + 1);
		}, 5 * 1000);
	}, [counter]);


	if(loading) {
		return ([]);
	}

	return (
		<div>
			<Card className="animated fadeIn">
				<Header title={`Button for ${buttonData.page.name}`} />
				<CardBody>
					<input type="text" value={buttonData.url} className="form-control" disabled/><br />
					<CRow>
						<CCol md={3}>
							<Block
								title="Live Calls"
								value={buttonData.call_count}
								color="success"
							/>
						</CCol>
						<CCol md={3}>
							<Block
								title="Test Calls"
								value={buttonData.test_call_count}
								color="warning"
							/>
						</CCol>
					</CRow>
				</CardBody>
			</Card>
		</div>
	);
}

const mapStateToProps = state => {
	return {
		branchId : state.selectedBranchId,
	}
}

export default connect(mapStateToProps,null)(ButtonDetail);
