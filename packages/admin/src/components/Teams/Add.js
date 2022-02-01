import React, {Component} from 'react';
import {Card, CardBody, CardHeader} from 'reactstrap';
import {FormGenerator} from '@evenlogics/whf-form-generator';
import {withTranslation} from 'react-i18next';

class TeamsAdd extends Component {

    render() {
        const {id} = this.props.match.params;

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
                label: "Branch",
                target: 'branches?limit=1000000',
                // async: true,
                name: 'branch_id',
                required: true,
                col: 4
            },
            // location_id: {
            //     type: 'advanceSelect',
            //     label: "Location",
            //     target: 'locations',
            //     // optionValue: "id",
            //     // optionLabel: "name",
            //     // async: true,
            //     name: 'location_id',
            //     required: true,
            //     col: 4,
            // },
            supervisor_id: {
                type: 'advanceSelect',
                label: "Supervisor",
                target: 'users',
                optionLabel: 'username',
                required: true,
                // async: true,
                name: 'supervisor_id',
                col: 4
            },
            user_id: {
                type: 'advanceSelect',
                label: "Users",
                target: 'users',
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
                        getValues={this.handleValue}
                        fields={fields}
                        targetId={id}
                        name="phrases"
                        repeater={true}
                        initialValues={this.props.location.aboutProps}
                        
                        redirect="owner/teams"
                        handleSameValueFields={['title', 'slug']}
                    />
                </CardBody>
            </Card>
        );
    }
}

export default withTranslation()(TeamsAdd);
