import React  from 'react';
import {Card, CardBody, CardHeader} from 'reactstrap';
import {FormGenerator} from '@evenlogics/whf-form-generator';
import {connect} from "react-redux";


const Add = (props) => {

    const id = props.branchId;
     console.log(id,"id")
        const fields = {
          wait_time: {
            type: "text",
            label: "Wait Time",
            required: true,
            name: "wait_time",
            col: 6,
          },
          escalation_hop: {
            type: "text",
            label: "Escalation Hop",
            // required: true,
            name: "escalation_hop",
            col: 6,
          },
          cycle: {
            type: "number",
            label: "Cycle",
            required: true,
            name: "cycle",
            col: 6,
          },
          throttle_wait: {
            type: "number",
            label: "Throttle Wait",
            required: true,
            name: "throttle_wait",
            col: 6,
          },
        
          
        };

        return (
            <Card className="animated fadeIn xl-12 lg-12 md-12 sm-12 xs-12">
                <CardHeader>
                   Add New Setting
                </CardHeader>
                <CardBody>
                    <FormGenerator
                        targetEntity={`${props.branchId}/branch-settings`}
                        // getValues={this.handleValue}
                        fields={fields}
                        targetId={id}
                        name="items"
                        repeater={true}
                        initialValues={props.location.aboutProps}
                        extraVals={{branch_id: props.branchId}}
                        redirect="setting"
                        handleSameValueFields={['title', 'slug']}
                    />
                </CardBody>
            </Card>
        );
    
}

const mapStateToProps = state => {
	return {
		branchId : state.selectedBranchId,
	  }
  }


export default connect(mapStateToProps,null)(Add);