import React from 'react';
import {Card, CardBody, CardHeader} from 'reactstrap';
import {FormGenerator} from '@evenlogics/whf-form-generator';
import {connect} from "react-redux";

const TeamsAdd = (props) => {

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
           
            supervisor_id: {
                type: 'advanceSelect',
                label: "Supervisor",
                target: `${props.branchId}/role-users/supervisor`,
                optionLabel: 'full_name',
                required: true,
                // async: true,
                name: 'supervisor_id',
                col: 4
            },
            user_id: {
                type: 'advanceSelect',
                label: "Team Members",
                // target: `${props.branchId}/users`,
                target: `${props.branchId}/role-users/staff`,
                optionLabel: 'full_name',
                optionValue: "id",
                key:'full_name',

                // optionId: 'id',
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
                        targetEntity={`${props.branchId}/teams`}
                        // getValues={handleValue}
                        fields={fields}
                        targetId={id}
                        name="teams"
                        // repeater={true}
                        extraVals={extraVals}
                        redirect="teams"
                        // handleSameValueFields={['title', 'slug']}
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
