import React, { useState,useEffect } from 'react';
import {Card, CardBody, CardHeader} from 'reactstrap';
import {FormGenerator} from '@evenlogics/whf-form-generator';

const TeamsAdd = (props) => {
    
    const [companyID, setCompanyID] = useState(null)
    const [company, setCompany] = useState(null)
    useEffect(() => {
      let ls =  JSON.parse(localStorage.getItem('currentUser'));
      setCompanyID(ls?.company?.id);
      setCompany(ls?.company);
   },[companyID])
    
        const {id} = props.match.params;

        const fields = {
            name: {
                type: 'text',
                label: 'Name',
                required: true,
                name: 'name',
                col: 4
            },
            branch_id: {
                type: 'advanceSelect',
                label: `${company?.name} Branch`,
                target: `branches?company_id=${companyID}?limit=1000`,
                // async: true,
                name: 'branch_id',
                required: true,
                col: 4
            },
            location_id: {
                type: 'advanceSelect',
                label: "Location",
                target: `locations?company_id=${companyID}?limit=1000`,
                // optionValue: "id",
                // optionLabel: "name",
                // async: true,
                name: 'location_id',
                required: true,
                col: 4,
            },
            supervisor_id: {
                type: 'advanceSelect',
                label: "Supervisor",
                target: `users?company_id=${companyID}?limit=1000`,
                optionLabel: 'username',
                required: true,
                // async: true,
                name: 'supervisor_id',
                col: 4
            },
            user_id: {
                type: 'advanceSelect',
                label: "Users",
                target: `users?company_id=${companyID}?limit=1000`,
                optionLabel: 'username',
                required: true,
                // async: true,
                multi:true,
                name: 'user_id',
                col: 4
            },

        };

        return (
            <Card className="animated fadeIn">
                <CardHeader>
                    Add New Team
                </CardHeader>
                <CardBody>
                    <FormGenerator
                        targetEntity="teams"
                        // getValues={handleValue}
                        fields={fields}
                        targetId={id}
                        name="phrases"
                        repeater={true}
                        initialValues={props.location.aboutProps}
                        redirect="teams"
                        handleSameValueFields={['title', 'slug']}
                    />
                </CardBody>
            </Card>
        );
    
}

export default TeamsAdd;
