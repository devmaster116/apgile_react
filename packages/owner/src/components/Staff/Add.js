import React, {Component} from 'react';
import {Card, CardBody, CardHeader} from 'reactstrap';
import {FormGenerator} from '@evenlogics/whf-form-generator';
import {withTranslation} from 'react-i18next';

class ItemAdd extends Component {

    render() {
        const {id} = this.props.match.params;

        const fields = {
          name: {
            type: "text",
            label: "Name",
            required: true,
            name: "name",
            col: 6,
          },
          description: {
            type: "text",
            label: "Description",
            // required: true,
            name: "description",
            col: 6,
          },
          qty: {
            type: "number",
            label: "Quantity",
            required: true,
            name: "qty",
            col: 6,
          },
          location_id: {
            type: "advanceSelect",
            label: "Location",
            target: "locations?limit=1000",
            // optionLabel: 'title',
            async: true,
            required: true,
            name: "location_id",
            col: 6,
          },
          
        };

        return (
            <Card className="animated fadeIn xl-12 lg-12 md-12 sm-12 xs-12">
                <CardHeader>
                   Add New Staff
                </CardHeader>
                <CardBody>
                    <FormGenerator
                        targetEntity="items"
                        getValues={this.handleValue}
                        fields={fields}
                        targetId={id}
                        name="items"
                        repeater={true}
                        initialValues={this.props.location.aboutProps}
                        
                        redirect="/items"
                        handleSameValueFields={['title', 'slug']}
                    />
                </CardBody>
            </Card>
        );
    }
}

export default withTranslation()(ItemAdd);
