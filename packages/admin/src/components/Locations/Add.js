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
                name: 'description',
                col: 6
            },
            branch_id: {
                type: 'advanceSelect',
                label: "Branch",
                target: 'branches?limit=1000000',
                async: true,
                required:true,
                optionValue: 'id',
                optionLabel: 'name',
                name: 'branch_id',
                col: 6
            },
            auto: {
                type: "switch",
                label: "Auto Assign Staff",
                name: "auto_assign",
                required: true,
                col: 2,
              },
            message_box: {
                type: "switch",
                label: "Message",
                name: "message_box",
                required: true,
                col: 2,
              },
              customer_required: {
                type: "switch",
                label: "Customer Name",
                required: true,
                name: "customer_required",
                col: 2,
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
