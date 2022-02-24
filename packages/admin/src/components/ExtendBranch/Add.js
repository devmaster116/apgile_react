import React from "react";

import BranchAdd from "@evenlogics/whf-ra-entity/dist/Branch/Add";

const ExtendBranchAdd = (props) =>  {
    // let id = props.match.params;
    let fields = {
        name: {
            col:3,
            type:"text",
            label:"Name",
            required:true,
        },
        company_id:{
            type:"advanceSelect",
            target:'companies?limit=1000',
            required:true,
            name:"company_id",
            col:3,
            label:"Select Company"
        },
        phone1:{
            col:3,
            type:"text",
            label:"Phone",
            required:true,
            maxlength:13,
            name:"phone1"
        },
        phone2:{
            col:3,
            type:"text",
            label:"Secondary Phone",
            name:"phone2",
            maxlength:13,
        },
        addr1:{
            parent: 'address',
            col:3,
            type:"text",
            required:true,
            label:"Address",
        },
        city:{
            parent: 'address',
            col:2,
            type:"text",
            required:true,
            label:"City",
        },
        state:{
            parent: 'address',
            col:2,
            type:"text",
            required:true,
            label:"State",
        },
        zip_code: {
            parent: 'address',
            type: 'text',
            label: "Zip Code",
            required: true,
            name: 'zip_code',
            col: 2
        },
        country: {
            parent: 'address',
            type: "advanceSelect",
            label: "Country",
            optionValue: "code",
            target: "countries?limit=1000",
            required: true,
            col: 3,
        },
    }

    let deleteFields =['lat','lng',"addr2"];
    return <BranchAdd deleteFields = {deleteFields} extendedFields={fields} noEdit={false} match={props.match} />;

}

export default ExtendBranchAdd;
