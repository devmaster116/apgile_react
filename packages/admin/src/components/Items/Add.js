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
            required: true,
            name: "description",
            col: 6,
          },
          area: {
            type: "dynamicFields",
            condition: true,
            label: "Area",
            name: "area",
            col: 4,
            schema: {
              areas: {
                type: "advanceSelect",
                label: "Select Area",
                target: "areas",
                // optionValue: "id",
                // optionLabel: "role_id",
                name: "location",
                col: 4,
                required: true,
              },
              item_type: {
                type: "advanceSelect",
                label: "Select Item",
                target: "items",
                // optionValue: "id",
                // optionLabel: "role_id",
                name: "item_type",
                col: 4,
              },
              quantity: {
                type: "number",
                label: "Quantity",
                name: "quantity",
                required: true,
                col: 4,
              },
            },
          },
          parent_id: {
            type: "advanceSelect",
            label: "Location",
            target: "locations",
            // optionLabel: 'title',
            async: true,
            required: true,
            name: "parent_id",
            col: 12,
          },
          
        };

        return (
            <Card className="animated fadeIn">
                <CardHeader>
                   Add New Item
                </CardHeader>
                <CardBody>
                    <FormGenerator
                        targetEntity="locations"
                        getValues={this.handleValue}
                        fields={fields}
                        targetId={id}
                        name="locations"
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

export default withTranslation()(ItemAdd);
