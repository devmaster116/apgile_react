import React, { Component } from 'react';
import {Card, CardBody, CardHeader, Button} from 'reactstrap';
import Block from "../DashboardWidgets/Block";
import {CCol} from "@coreui/react-pro";

export default class ItemDetail extends Component {
	render() {
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

						<CCol xs={12} sm={4} lg={6}>
							<Block title="Total Calls" value="50" color="secondary" font="black" />
						</CCol>

					</CardBody>

				</Card>
			</div>
		);
	}
}
