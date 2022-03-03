import React,{useState,useEffect} from "react";
// import { getMaskHelper } from "../ExtendCompany/getMaskHelper";
import {getMaskHelper, statesOptionList} from "@facepays/common";
import {FormGenerator} from "@evenlogics/whf-form-generator";
import {Card, CardBody} from "reactstrap";
import {Header} from "@evenlogics/whf-ra-components";
import {formPageTitle} from '@facepays/common';
// import BranchAdd from "@evenlogics/whf-ra-entity/dist/Branch/Add";
import api from "@evenlogics/whf-api";


const ExtendBranchAdd = (props) =>  {

    const [maskedValue, setMaskedValue] = useState("+1 (000) 000-0000")
    const [showStates, setShowStates] = useState(false)
    const {id} = props.match.params;

    const companyChangeHandler = (value) => {
        setTimeout(() => {    
            console.log(value,"value")      
            let returnMask = getMaskHelper( id ? value : value?.value)
            setMaskedValue(returnMask);
            (id ? value : value?.value) === 'US' ? setShowStates(true) : setShowStates(false)      
        }, 1);

    }

    useEffect(() => { 
        id && api.request("get", `/branches/${id}`).then(({data}) => {    
             companyChangeHandler(data?.address?.country)
           }).catch((error) => console.log(error));
       
       }, [id])


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
        country: {
            parent: 'address',
            type: "advanceSelect",
            label: "Country",
            optionValue: "code",
            name: 'country',
            target: "countries?limit=1000",
            required: true,
            col: 3,
            callback: (data) => companyChangeHandler(data)
        },
        phone1:{
            type: "masked",
            mask: maskedValue,
            col:3,
            label:"Phone",
            required:true,
            // maxlength:13,
            name:"phone1",
            formatChars: {
                '0': '[0-9]',
                'a': '[A-Za-z]',
                '*': '[A-Za-z0-9]'
              },
              className:"phoneMask"
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
            col:3,
            type:"text",
            required:true,
            label:"City",
        },
        state: {
            parent: "address",
            type: "text",
            label: "State",
            name: "state",
            col: 3,
            condition: !showStates
        },

        state_list: {
            // parent: "user",
            // required:true,
            type: "advanceSelect",
            options: statesOptionList(),
            label: "State",
            name: "state",
            col: 3,
            condition: showStates
        },
        zip_code: {
            parent: 'address',
            type: 'text',
            label: "Zip Code",
            required: true,
            name: 'zip_code',
            col: 3
        },
        // location:{
        //     type:"location",
        //     label: "Location",
        //     placeholder:"Enter Location Address",
        //     required: true,
        //     name: "location",
        //     col: 3,
        // },

        // country: {
        //     hide: true,
        //     hidden: true
        // },
    }

    return (
        <div>
            <Card className="animated fadeIn">
                <Header title={formPageTitle('Branch', id)} />
                <CardBody>
                    <FormGenerator
                        targetEntity="branches"
                        // getValues={this.handleValue}
                        fields={fields}
                        targetId={id}
                        name="branches"
                        // repeater={true}
                        // initialValues={props.location.aboutProps}
                        redirect="entity/branches"
                        // noEdit={true}
                        // match={props.match}
                        // handleSameValueFields={["title", "slug"]}
                        // debug={true}
                    />
                </CardBody>
            </Card>
        </div>
    )

    // return <FormGenerator
    //     targetEntity="branches"
    //     // getValues={this.handleValue}
    //     fields={fields}
    //     targetId={id}
    //     name="Branches"
    //     // repeater={true}
    //     // initialValues={props.location.aboutProps}
    //     redirect="branches"
    //     noEdit={false}
    //     // match={props.match}
    //     // handleSameValueFields={["title", "slug"]}
    //     // debug={true}
    // />
    // return <FormGenerator deleteFields = {deleteFields} extendedFields={fields} noEdit={false} match={props.match} />;

}

export default ExtendBranchAdd;
