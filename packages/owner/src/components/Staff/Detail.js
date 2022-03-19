import React, { useEffect,useState } from 'react';
import {Card, CardBody, CardHeader, Button} from 'reactstrap';
import { connect } from "react-redux";
import Block from "../DashboardWidgets/Block";
import {CCol,CRow} from "@coreui/react-pro";
import api from "@evenlogics/whf-api";
import { getColor } from "@facepays/common";
import Graph from '../DashboardWidgets/Graph';
import "../../style/style.css";
import Dashboard from "../Dashboard";

const Detail = (props) => {

  let {id} = props.match.params;



  return (
   <div>
      <Card className="animated fadeIn xl-12 lg-12 md-12 sm-12 xs-12">
        <CardHeader>
          <b>User Detail</b>
          <Button size="sm" color="primary" className="float-right" onClick={()=>props.history.goBack()}>
            Go Back
          </Button>
        </CardHeader>
        <CardBody>
            <Dashboard user={id} />
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


  export default connect(mapStateToProps,null)(Detail);

