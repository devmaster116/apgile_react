import React, {useEffect} from 'react';
import {Card, CardBody, CardHeader} from 'reactstrap';
import {FormGenerator} from '@evenlogics/whf-form-generator';
import {connect} from "react-redux";

const LocationsAdd = (props) => {

    // const [query, setQuery] = useState(false);
    useEffect(() => {
        // setQuery((prev) => !prev);
    }, [props.branchId]);
    const {id} = props.match.params;

    const fields = {
        name: {
            type: "text",
            label: "Name",
            required: true,
            name: "name",
            col: 4,
        },
        description: {
            type: "text",
            label: "Description",
            name: "description",
            col: 4,
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
            col: 4,
        },
        auto: {
            type: "switch",
            label: "Auto Assign Staff",
            name: "auto_assign",
            required: true,
            col: 3,
        },

        message_box: {
            type: "switch",
            label: "Message",
            name: "message_box",
            required: true,
            col: 2,
        },
        customer_required: {
            type: "switch",
            label: "Customer Required",
            required: true,
            name: "customer_required",
            col: 2,
        },
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
                Add New Location
            </CardHeader>
            <CardBody>
                <FormGenerator
                    targetEntity={`${props.branchId}/locations`}
                    // getValues={handleValue}
                    fields={fields}
                    targetId={id}
                    // name="locations"
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
