import React from 'react';
import {Card, CardBody, CardHeader} from 'reactstrap';
import {FormGenerator} from '@evenlogics/whf-form-generator';
import {connect} from "react-redux";
import {formPageTitle} from "@facepays/common";

const StyleAdd = (props) => {

        const {id} = props.match.params;
        const extraVals =  {
            branch_id: props.branchId
        };

        const fields = {
            font_color: {
                // parent:"style",
                type: "color",
                defaultValue: "#00000",
                // color: { r: "241", g: "112", b: "19", a: "1" },
                label: "Font Color",
                name: "font_color",
                col: 2,
            },
            bg_color: {
                type: "color",
                defaultValue: "#000000",
                // parent:"style",
                label: "Background Color",
                // required: true,
                name: "bg_color",
                col: 2,
                handleChange:(data)=> console.log(data,"data")
            },
            // other: {
            //   type: "text",
            //   label: "Others",
            //   name: "other",
            //   required: true,
            //   col: 4,
            // },

            logo: {
                type: "filePic",
                label: "Logo",
                name: "logo",
                // required: true,
                col: 3
            },
            bg_image: {
                type: "filePic",
                label: "Background Image",
                name: "bg_image",
                // required: true,
                col: 5
            }

        };

        return (
            <Card className="animated fadeIn">
                <CardHeader>
                    {formPageTitle('Style', id)}
                </CardHeader>
                <CardBody>
                    <FormGenerator
                        targetEntity={`${props.branchId}/style`}
                        // getValues={handleValue}
                        fields={fields}
                        targetId={props.branchId}
                        name={id ? "editForm" : ""}
                        // repeater={true}
                        extraVals={extraVals}
                        redirect="style"
                        debug={true}
                        linearizeData={true}
                        // handleSameValueFields={['title', 'slug']}
                    />
                </CardBody>
            </Card>
        );

}

const mapStateToProps = state => {
    return {
        branchId : state.selectedBranchId,
        companyName : state.companyName,
        companyId : state.companyId,
        userRole : state.userRole
    }
}

export default connect(mapStateToProps,null)(StyleAdd);
