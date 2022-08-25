import React, {useState, useEffect} from 'react';
import {Card, CardBody, CardHeader} from 'reactstrap';
import {FormGenerator} from '@evenlogics/whf-form-generator';
import {connect} from "react-redux";
import {formPageTitle} from "@facepays/common";


const ButtonAdd = (props) => {

    const [query, setQuery] = useState(false);
    // const [openQrCode, setsw] = useState(false);
    useEffect(() => {
        setQuery((prev) => !prev)
    }, [props.branchId]);
    console.log(query, "query")
    const {id} = props.match.params;

    const fields = {
        page_id: {
            type: "advanceSelect",
            label: "Select Item Type",
            target: `${props.branchId}/pages`,
            col: 3,
        },
        status: {
            type: "switch",
            label: "Status",
            required: true,
            col: 3
        },
        message: {
            type: "textarea",
            label: "Message",
            col: 12
        }
    };


    return (
        <Card className="animated fadeIn xl-12 lg-12 md-12 sm-12 xs-12">
            <CardHeader>
                {formPageTitle('Button', id)}
            </CardHeader>
            <CardBody>
                <FormGenerator
                    targetEntity={`${props.branchId}/buttons`}
                    // getValues={handleValue}
                    fields={fields}
                    targetId={id}
                    name={id ? "editForm" : ""}
                    // repeater={true}
                    // initialValues={initialValues}
                    redirect="buttons"
                    // debug={true}
                    // handleSameValueFields={['title', 'slug']}
                />
            </CardBody>
        </Card>
    );
}
const mapStateToProps = state => {
    return {
        branchId: state.selectedBranchId,
    }
}


export default connect(mapStateToProps, null)(ButtonAdd);