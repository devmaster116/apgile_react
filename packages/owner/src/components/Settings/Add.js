import React  from 'react';
import {Card, CardBody, CardHeader} from 'reactstrap';
import {FormGenerator} from '@evenlogics/whf-form-generator';
import {connect} from "react-redux";


const Add = (props) => {

        const id = props.branchId;

        const fields = {
          wait_time: {
            type: "text",
            label: "Wait Time",
            required: true,
            name: "wait_time",
            col: 3,
          },
          escalation_hop: {
            type: "text",
            label: "Escalation Hop",
            // required: true,
            name: "escalation_hop",
            col: 3,
          },
          cycle: {
            type: "number",
            label: "Cycle",
            required: true,
            name: "cycle",
            col: 3,
          },
          throttle_wait: {
            type: "number",
            label: "Throttle Wait",
            required: true,
            name: "throttle_wait",
            col: 3,
          },

          "Social Media Links": {
            isDummyField: true,
            type: "h4",
            col: 12,
          },
          facebook:{
            type: "text",
            label: "Facebook",
            // required: true,
            name: "facebook",
            col: 6,
          },
          instagram:{
            type: "text",
            label: "Instagram",
            // required: true,
            name: "instagram",
            col: 6,
          },
          linkedin : {
            type: "text",
            label: "Linkedin",
            // required: true,
            name: "linkedin",
            col: 6,
          },
          youtube : {
            type: "text",
            label: "Youtube",
            // required: true,
            name: "youtube",
            col: 6,
          },
          reddit: {
            type: "text",
            label: "Reddit",
            // required: true,
            name: "reddit",
            col: 6,
          },
          pinterest : {
            type: "text",
            label: "Pinterest",
            // required: true,
            name: "pinterest",
            col: 6,
          },
          twitter: {
            type: "text",
            label: "Twitter",
            // required: true,
            name: "twitter",
            col: 6,
          }

        };

        return (
            <Card className="animated fadeIn xl-12 lg-12 md-12 sm-12 xs-12">
                <CardHeader>
                   Add New Setting
                </CardHeader>
                <CardBody>
                    <FormGenerator
                        targetEntity={`${props.branchId}/setting`}
                        // getValues={this.handleValue}
                        fields={fields}
                        targetId={id}
                        name="setting"
                        // repeater={true}
                        // initialValues={props.location.aboutProps}
                        extraVals={{branch_id: props.branchId}}
                        redirect="setting/add"
                        // handleSameValueFields={['title', 'slug']}
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
