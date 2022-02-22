import React  from 'react';
import {Card, CardBody, CardHeader} from 'reactstrap';
import {FormGenerator} from '@evenlogics/whf-form-generator';
import {connect} from "react-redux";


const Add = (props) => {

        const {id} = props.match.params;

        const fields = {
          user_id: {
            type: "advanceSelect",
            label: "Select User",
            target: `${props.branchId}/users`,
            optionLabel: 'first_name',
            optionId: 'id',
            async: true,
            col: 4,
        },
         ...(!id  && {os: {
            type: "text",
            label: "Operating System",
            required: true,
            name: "os",
            col: 4,
          }}),

          ...(!id  && {device: {
            type: "text",
            label: "Device Name",
            // required: true,
            name: "device",
            col: 4,
          }}),

        };

        return (
            <Card className="animated fadeIn xl-12 lg-12 md-12 sm-12 xs-12">
                <CardHeader>
                   Add New Watch
                </CardHeader>
                <CardBody>
                    <FormGenerator
                        targetEntity={`${props.branchId}/watches`}
                        // getValues={this.handleValue}
                        fields={fields}
                        targetId={id}
                        name="watches"
                        // repeater={true}
                        // initialValues={props.location.aboutProps}
                        extraVals={{branch_id: props.branchId}}
                        redirect="watches"
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
