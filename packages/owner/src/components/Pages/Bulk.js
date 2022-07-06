import React from "react";
import {FormGenerator} from "@evenlogics/whf-form-generator";
import {Card, CardBody} from "reactstrap";
import {Header} from "@evenlogics/whf-ra-components";
import {formPageTitle} from "@facepays/common";
import {connect} from "react-redux";

const BulkPrinting = (props) => {
    const {id} = props.match.params;

    let fields = {
        pages: {
            type: "advanceSelect",
            label: "Select Items to Print",
            name: "page_ids",
            target: `${props.branchId}/pages?limit=2000`,
            required: true,
            multi: true,
            // async: true,
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
