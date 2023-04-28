import React from 'react';
import {Card, CardBody, CardHeader} from 'reactstrap';
import {FormGenerator} from '@evenlogics/whf-form-generator';
import {connect} from "react-redux";

const StyleAdd = (props) => {

        const {id} = props.match.params;
        const extraVals =  {
            branch_id: props.branchId
        };

        const fields = {
            font_color: {
                type: "color",
                label: "Font Color",
                name: "font_color",
                col: 2,
            },
            bg_color: {
                type: "color",
                label: "Background Color",
                name: "bg_color",
                col: 2,
                handleChange:(data)=> console.log(data,"data")
            },
            "Logo & Banner": {
                isDummyField: true,
                type: "h4",
                col: 12,
    
            },
            logo: {
                type: "filePic",
                label: "Logo",
                name: "logo",
                col: 3
            },
            delete_logo: {
           
                type: "switch",
                label: "Delete Logo",
                required: true,
                name:"delete_logo",
                col: 2
            },
            bg_image: {
                type: "filePic",
                label: "Background Image",
                name: "bg_image",
                col: 3
            },
            delete_bg_image:{
           
                type: "switch",
                label: "Delete Background",
                required: true,
                name:"delete_bg_image",
                col: 2
            }

        };

        return (
            <Card className="animated fadeIn">
                <CardHeader>
                    Manage Style
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
                        redirect="mirageRoute"
                        // debug={true}
                        
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
