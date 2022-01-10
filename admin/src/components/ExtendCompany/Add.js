import React from "react";

import CompanyAdd from "@evenlogics/whf-ra-entity/dist/Company/Add";

function ExtendCompanyAdd(props) {
    let fields = {
        // lat: {},
        // lng: {},
        phone1: {
            type: 'text',
            label: "Phone",
            required: true,
            validation: 'number',
            name: 'phone1',
            col: 6
          },
    }
    return <CompanyAdd extendedFields={fields} />;

}

export default ExtendCompanyAdd;