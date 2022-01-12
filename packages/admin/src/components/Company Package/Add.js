import React from 'react'
import { FormGenerator } from "@evenlogics/whf-form-generator";
import { Card, CardBody } from "reactstrap";
import { Header } from "@evenlogics/whf-ra-components";


const Add = (props) => {

    const {id} = props.match.params;

    const fields = {
        company_id: {
            type: 'advanceSelect',
            label: "Select Company",
            target: 'companies',
            async: true,
            name: 'company_id',
            // multi:true,
            required: true,
            col: 4
        },
        total_watches: {
            type: 'number',
            label: 'Total Watches',
            required: true,
            name: 'total_watches',
            col: 4
        },
        total_qr_codes: {
            type: 'number',
            label: 'Total QR Codes',
            required: true,
            name: 'total_qr_codes',
            col: 4
        },
        total_staff:{
            type: 'number',
            label: 'Total Staff',
            required: true,
            name: 'total_staff',
            col: 4
        }
      };

    return (
      <div>
        <Card className="animated fadeIn">
          <Header title="Add Company New Package"/>
          <CardBody>
            <FormGenerator
              targetEntity="company-setups"
              // getValues={this.handleValue}
              fields={fields}
              targetId={id}
              name="shifts"
              // repeater={true}
              // initialValues={props.location.aboutProps}
              redirect="company-setup"
              // handleSameValueFields={["title", "slug"]}
            />
          </CardBody>
        </Card>
      </div>
    );
}

export default Add
