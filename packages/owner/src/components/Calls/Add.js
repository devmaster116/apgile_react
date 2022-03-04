import React, {useState, useEffect} from "react";
import {FormGenerator} from "@evenlogics/whf-form-generator";
import {Card, CardBody} from "reactstrap";
import {Header} from "@evenlogics/whf-ra-components";
import {connect} from "react-redux";

const Add = (props) => {
    const {id} = props.match.params;

    // const [targetUser, setTargetUser] = useState([]);
    const [action_user, setAction_user] = useState();
    useEffect(() => {
        console.log(props.location.state,"props.location.state.")
        let ls = JSON.parse(localStorage.getItem('currentUser'));
        setAction_user(ls?.id);
    }, [id, props.branchId, props.location.state]);


    let fields = {
        staff_id: {
            type: "advanceSelect",
            label: "Change Staff",
            target: props?.userRole === "supervisor" ? `${props.branchId}/team-users/${id}` :`${props.branchId}/users`,
            optionLabel: 'full_name',
            optionId: 'id',
            async: true,
            col: 3,
        },

        status_id: {
            type: "advanceSelect",
            label: "Change Status",
            target: `${props.branchId}/call/status-list`,
            col: 3,
            async: true,
        },


    };

    return (
        <div>
            <Card className="animated fadeIn">
                <Header title="Modify Call" />
                <CardBody>
                    <FormGenerator
                        targetEntity={`${props.branchId}/calls`}
                        fields={fields}
                        targetId={id}
                        name="calls"
                        repeater={true}
                        redirect="calls"
                        extraVals={{
                            call_id: id,
                            action_by: action_user
                        }}
                    />
                </CardBody>
            </Card>
        </div>
    );
};


const mapStateToProps = state => {
    return {
        branchId: state.selectedBranchId,
        userRole: state.userRole
    }
}


export default connect(mapStateToProps, null)(Add);
