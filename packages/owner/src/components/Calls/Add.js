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
        // api.request("get", `/${props.branchId}/calls/${id}`)
        //     .then(({data}) => {
        //         setTargetUser(data?.users?.map((user) => ({value: user?.id?.toString(), label: user?.username})))
        //     })
        //     .catch((error) => console.log(error));


    }, [id, props.branchId]);


    let fields = {
        user_id: {
            type: "advanceSelect",
            label: "Select Staff",
            target: `${props.branchId}/users`,
            optionLabel: 'first_name',
            optionId: 'id',
            async: true,

            //   multi:true,
            //   name: "target_user",
            col: 3,
            //   required: true,
        },
        action_id: {
            type: "advanceSelect",
            label: "Action Status",
            target: `${props.branchId}/call/status-list`,
            name: "action_id",
            col: 3,
            required: true,
            async: true,
        },


    };

    return (
        <div>
            <Card className="animated fadeIn">
                <Header title="Assigned Call"/>
                <CardBody>
                    <FormGenerator
                        targetEntity={`${props.branchId}/kitchen-call`}
                        fields={fields}
                        name="kitchen-call"
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
    }
}


export default connect(mapStateToProps, null)(Add);
