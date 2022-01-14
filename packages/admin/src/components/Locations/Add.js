import React, {Component} from 'react';
import {Card, CardBody, CardHeader} from 'reactstrap';
import {FormGenerator} from '@evenlogics/whf-form-generator';
import {withTranslation} from 'react-i18next';

class LocationsAdd extends Component {

    render() {
        const {id} = this.props.match.params;

        const fields = {
            name: {
                type: 'text',
                label: 'Name',
                required: true,
                name: 'name',
                col: 6
            },
            description: {
                type: 'text',
                label: "Description",
                required: true,
                name: 'description',
                col: 6
            },
            branch_id: {
                type: 'advanceSelect',
                label: "Branch",
                target: 'branches',
                async: true,
                name: 'branch_id',
                col: 6
            },
         
        };

        return (
            <Card className="animated fadeIn">
                <CardHeader>
                   Add New Location
                </CardHeader>
                <CardBody>
                    <FormGenerator
                        targetEntity="locations"
                        getValues={this.handleValue}
                        fields={fields}
                        targetId={id}
                        name="locations"
                        repeater={true}
                        // initialValues={this.props.location.aboutProps}
                        
                        redirect="owner/locations"
                        handleSameValueFields={['title', 'slug']}
                    />
                </CardBody>
            </Card>
        );
    }
}

export default withTranslation()(LocationsAdd);
