import React, {useState} from 'react';
import {Card, CardBody, CardHeader} from 'reactstrap';
import {FormGenerator} from '@evenlogics/whf-form-generator';
import {connect} from "react-redux";
import {timezonesOptions} from '@facepays/common';


const Form = (props) => {

    const [showPlaces, setShowPlaces] = useState(false);
    const id = props.branchId;


    return (
        <Card className="animated fadeIn xl-12 lg-12 md-12 sm-12 xs-12">
            <CardHeader>
                Internal Calls
            </CardHeader>
            <CardBody>

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
