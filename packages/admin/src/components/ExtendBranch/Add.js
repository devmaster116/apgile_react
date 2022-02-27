import React,{useState} from "react";
// import { getMaskHelper } from "../ExtendCompany/getMaskHelper";
import { getMaskHelper } from "@facepays/common";
import BranchAdd from "@evenlogics/whf-ra-entity/dist/Branch/Add";

const ExtendBranchAdd = (props) =>  {

    const [maskedValue, setMaskedValue] = useState("+99-99-9999")

    const companyChangeHandler = (value) => {
        console.log(value,"value")
        setTimeout(() => {
            let returnMask = getMaskHelper(value?.value)
               setMaskedValue(returnMask);
        }, 1);

    }
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
            label:"Select Company",

        },
        phone1:{
            type: "masked",
            mask: maskedValue,
            col:3,
            label:"Phone",
            required:true,
            // maxlength:13,
            name:"phone1"
        },
        phone2:{
            type: "masked",
            mask: maskedValue,
            label:"Secondary Phone",
            name:"phone2",
            required:true,
            col:3,

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
        // location:{
        //     type:"location",
        //     label: "Location",
        //     placeholder:"Enter Location Address",
        //     required: true,
        //     name: "location",
        //     col: 3,
        // },

        country: {
            parent: 'address',
            type: "advanceSelect",
            label: "Country",
            optionValue: "code",
            target: "countries?limit=1000",
            required: true,
            col: 3,
            callback: (data) => companyChangeHandler(data)
        },
    }

    let deleteFields =['lat','lng',"addr2"];
    return <BranchAdd deleteFields = {deleteFields} extendedFields={fields} noEdit={false} match={props.match} />;

}

export default ExtendBranchAdd;
