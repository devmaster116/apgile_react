import React from 'react';
import {Card, CardBody, CardHeader} from 'reactstrap';
// import {FormGenerator} from '@evenlogics/whf-form-generator';
import {connect} from "react-redux";
// import {timezonesOptions} from '@facepays/common';
import Todo from "./Todo";

const Form = (props) => {



    return (
        <Card className="animated fadeIn xl-12 lg-12 md-12 sm-12 xs-12">
            <CardHeader>
                Internal Venues
            </CardHeader>
            <CardBody>
                  <Todo/>
            </CardBody>
        </Card>
    );

}

const mapStateToProps = state => {
    return {
        branchId: state.selectedBranchId,
    }
}


export default connect(mapStateToProps, null)(Form);
