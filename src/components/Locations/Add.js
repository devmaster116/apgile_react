import React, {Component} from 'react';
import {Card, CardBody, CardHeader} from 'reactstrap';
import {FormGenerator} from '@evenlogics/whf-form-generator';
import {withTranslation} from 'react-i18next';

class LocationsAdd extends Component {

    render() {
        const {id} = this.props.match.params;

        const fields = {
            title: {
                type: 'text',
                label: this.props.t('title'),
                required: true,
                name: 'title',
                col: 6
            },
            parent_id: {
                type: 'advanceSelect',
                label: this.props.t('general-phrases:parent_id'),
                target: 'locations?title=%s',
                optionLabel: 'title',
                async: true,
                name: 'parent_id',
                col: 6
            },
            branch: {
                type: 'advanceSelect',
                label: this.props.t('general-phrases:branche'),
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
                        
                        redirect="owner/locations"
                        handleSameValueFields={['title', 'slug']}
                    />
                </CardBody>
            </Card>
        );
    }
}

export default withTranslation()(LocationsAdd);
