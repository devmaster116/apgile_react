import React from "react";

import CompanyAdd from "@evenlogics/whf-ra-entity/dist/Company/Add";

function ExtendCompanyAdd(props) {
    let fields = {
        // lat: {},
        // lng: {},
    }
    return <CompanyAdd extendedFields={fields} />;

}

export default ExtendCompanyAdd;