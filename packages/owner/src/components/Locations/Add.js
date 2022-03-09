import React, {useEffect, useState} from 'react';
import {Card, CardBody, CardHeader} from 'reactstrap';
import {FormGenerator} from '@evenlogics/whf-form-generator';
import {connect} from "react-redux";
import {formPageTitle} from "@facepays/common";

const LocationsAdd = (props) => {

    const [showTeam, setShowTeam] = useState(false);
    useEffect(() => {
        // setQuery((prev) => !prev);
    }, [props.branchId]);
    const {id} = props.match.params;

    const manageTeamField = data => {
        if(typeof data.value !== 'undefined' && data.value)
            setShowTeam(false);
        else
            setShowTeam(true);
    };

    const fields = {
        name: {
            type: "text",
            label: "Name",
            required: true,
            name: "name",
            col: 3,
        },
        supervisor_id: {
            type: 'advanceSelect',
            label: "Select Supervisor",
            target: `${props.branchId}/role-users/supervisor`,
            optionLabel: 'full_name',
            required: true,
            // async: true,
            name: 'supervisor_id',
            col: 3,
            condition: !showTeam
        },
        // description: {
        //     type: "text",
        //     label: "Description",
        //     name: "description",
        //     col: 3,
        // },
        message_box: {
            type: "switch",
            label: "Include Message",
            name: "message_box",
            // required: true,
            col: 2,
        },
        customer_required: {
            type: "switch",
            label: "Include Customer Name",
            // required: true,
            name: "customer_required",
            col: 2,
        },
        auto: {
            type: "switch",
            label: "Auto Assign Staff",
            name: "auto_assign",
            // required: true,
            col: 2,
            callback: (data) => manageTeamField(data)
        },
        team: {
            type: "advanceSelect",
            label: "Team",
            target: `${props.branchId}/teams?limit=1000`,
            // optionLabel: 'title',
            multi: true,
            async: true,
            // required: true,
            name: "team",
            col: 3,
            condition: showTeam
        },
        // shifts: {
        //     type: "advanceSelect",
        //     label: "Shifts",
        //     target: `${props.branchId}/shifts?limit=1000`,
        //     // optionLabel: 'title',
        //     multi: true,
        //     async: true,
        //     // required: true,
        //     col: 4,
        // },


        // branch_id: {
        //     type: 'advanceSelect',
        //     label: "Branch",
        //     target: 'branches',
        //     async: true,
        //     required:true,
        //     name: 'branch_id',
        //     col: 6
        // },
    };

    return (
        <Card className="animated fadeIn">
            <CardHeader>
                {formPageTitle('Location', id)}
            </CardHeader>
            <CardBody>
                <FormGenerator
                    targetEntity={`${props.branchId}/locations`}
                    // getValues={handleValue}
                    fields={fields}
                    targetId={id}
                    name={id ? "editForm" : ""}
                    // repeater={true}
                    // initialValues={props.location.aboutProps}
                    extraVals={{branch_id: props.branchId}}
                    redirect="locations"
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

export default connect(mapStateToProps, null)(LocationsAdd);
