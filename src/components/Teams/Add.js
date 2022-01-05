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
                label: this.props.t('name'),
                required: true,
                name: 'name',
                col: 6
            },
            supervisor_id: {
                type: 'advanceSelect',
                label: this.props.t('general-phrases:supervisor_id'),
                target: 'users?title=%s',
                optionLabel: 'username',
                async: true,
                name: 'supervisor_id',
                col: 6
            },
            branch: {
                type: 'advanceSelect',
                label: this.props.t('general-phrases:branch'),
                target: 'branches?title=%s',
                async: true,
                name: 'branch',
                col: 6
            }
        };

        return (
            <Card className="animated fadeIn">
                <CardHeader>
                    {this.props.t('add-new')} {this.props.t('base:phrase')}
                </CardHeader>
                <CardBody>
                    <FormGenerator
                        targetEntity="terms"
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
