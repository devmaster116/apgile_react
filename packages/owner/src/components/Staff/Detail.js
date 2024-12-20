import React from 'react';
import {Card, CardBody, CardHeader} from 'reactstrap';
import {connect} from "react-redux";
import "../../style/style.css";
import Analytics from "../Analytics";

const Detail = (props) => {

    let {id} = props.match.params;

    return (
        <div>
            <Card className="animated fadeIn xl-12 lg-12 md-12 sm-12 xs-12">
                <CardHeader>
                    <b>User Performance</b>
                    {/*<Button size="sm" color="primary" className="float-right" onClick={()=>props.history.goBack()}>*/}
                    {/*  Go Back*/}
                    {/*</Button>*/}
                </CardHeader>
                <CardBody>
                    <Analytics user={id}/>
                </CardBody>
            </Card>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        branchId: state.selectedBranchId,
    }
}


export default connect(mapStateToProps, null)(Detail);

