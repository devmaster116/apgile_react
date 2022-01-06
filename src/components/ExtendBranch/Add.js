import React from "react";

import BranchAdd from "@evenlogics/whf-ra-entity/dist/Branch/Add";

const ExtendBranchAdd = (props) =>  {
    let fields = {
        lat: {},
        lng: {}  
    }
    return <BranchAdd extendedFields={fields} />;

}

export default ExtendBranchAdd;