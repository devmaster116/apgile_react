import React, {useState} from "react";
import {FormGenerator} from "@evenlogics/whf-form-generator";
import {Card, CardBody} from "reactstrap";
import {Header} from "@evenlogics/whf-ra-components";
import {connect} from "react-redux";

const BulkPrinting = (props) => {
    const {id} = props.match.params;
    const [showPages, setShowPages] = useState(false);

    const showPagesProcess = (data) => {
        if(typeof data.value !== 'undefined' && data.value)
            setShowPages(true);
        else
            setShowPages(false);
    }
    let fields = {
        allpages: {
            type: "switch",
            label: "Print All Items",
            // required: true,
            col: 2,
            callback: (data) => showPagesProcess(data)
        },
        pages: {
            type: "advanceSelect",
            label: "Select Items to Print",
            name: "page_ids",
            target: `${props.branchId}/pages?limit=2000`,
            required: true,
            multi: true,
            // async: true,
            condition: showPages,
            col: 6
        },
    };

    const successSubmit = (response, values) => {
        const redirectUrl = response.data.redirect;
        window.open(redirectUrl);
    }

    return (
        <div>
            <Card className="animated fadeIn">
                <Header title="Bulk QR Code Printing"/>
                <CardBody>
                    <FormGenerator
                        targetEntity={`${props.branchId}/bulk-print-redirect`}
                        // getValues={this.handleValue}
                        fields={fields}
                        targetId={id}
                        name="pages"
                        // repeater={true}
                        // targetSubmit={(values) => submitForm(values)}
                        // initialValues={props.location.aboutProps}
                        successCallback={successSubmit}
                        redirect="qr-codes"
                        initialValues={{allpages: true}}
                        // handleSameValueFields={["name"]}
                    />
                </CardBody>
            </Card>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        branchId: state.selectedBranchId,
    }
}

export default connect(mapStateToProps, null)(BulkPrinting);
