import React, { useState,useEffect } from 'react';
import {Card, CardBody, CardHeader} from 'reactstrap';
import {FormGenerator} from '@evenlogics/whf-form-generator';
import {connect} from "react-redux";

const TeamsAdd = (props) => {

    const [companyID, setCompanyID] = useState(null)
    const [company, setCompany] = useState(null)
    const [query, setQuery] = useState(false)

    useEffect(() => {
      let ls =  JSON.parse(localStorage.getItem('currentUser'));
      setCompanyID(ls?.company?.id);
      setCompany(ls?.company);
      setQuery((prev) => !prev);
   },[companyID, props.branchId]);

    console.log(props.branchId, 'branch');
        const {id} = props.match.params;
        const extraVals =  {
            branch_id: props.branchId
        };

        const fields = {
            name: {
                type: 'text',
                label: 'Name',
                required: true,
                name: 'name',
                col: 4
            },
            // branch_id: {
            //     type: 'advanceSelect',
            //     label: `${company?.name} Branch`,
            //     target: `branches?company_id=${companyID}?limit=1000`,
            //     // async: true,
            //     name: 'branch_id',
            //     required: true,
            //     col: 4
            // },
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
            }

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
                        extraVals={extraVals}
                        redirect="teams"
                        handleSameValueFields={['title', 'slug']}
                    />
                </CardBody>
            </Card>
        );

}

const mapStateToProps = state => {
    return {
        branchId : state.selectedBranchId,
        companyName : state.companyName,
        companyId : state.companyId,
        userRole : state.userRole
    }
}

export default connect(mapStateToProps,null)(TeamsAdd);
