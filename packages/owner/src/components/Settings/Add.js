import React, { useState,useEffect }  from 'react';
import {Card, CardBody, CardHeader} from 'reactstrap';
import {FormGenerator} from '@evenlogics/whf-form-generator';

const Add = (props) => {

  const [companyID, setCompanyID] = useState(null)
	useEffect(() => {
	  let ls =  JSON.parse(localStorage.getItem('currentUser'));
	  setCompanyID(ls?.company?.id);
   },[companyID]);

   console.log(companyID,"llll");
    
        const {id} = props.match.params;

        

        const fields = {

          branch_id :{
              type: "advanceSelect",
              label: "Branch",
              target: `branches/${companyID}/all?limit=1000`,
              // optionLabel: 'title',
              async: true,
              required: true,
              name: "branch_id",
              col: 6,
          },
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
                        targetEntity="branch-settings"
                        // getValues={this.handleValue}
                        fields={fields}
                        targetId={id}
                        name="items"
                        repeater={true}
                        initialValues={props.location.aboutProps}
                        
                        redirect="setting"
                        handleSameValueFields={['title', 'slug']}
                    />
                </CardBody>
            </Card>
        );
    
}

export default Add;
