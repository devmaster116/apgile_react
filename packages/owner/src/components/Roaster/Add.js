import React, {useState, useEffect} from "react";
import {FormGenerator} from "@evenlogics/whf-form-generator";
import {Card, CardBody} from "reactstrap";
import {Header} from "@evenlogics/whf-ra-components";
import {connect} from "react-redux";

const Add = (props) => {

    // const [query, setQuery] = useState(false);
    // useEffect(() => {
    //   setQuery((prev) => !prev);
    // }, [props.branchId]);


    const {id} = props.match.params;
    let fields = {
        week_day: {
            type: 'advanceSelect',
            label: "Week Day",
            target: `${props.branchId}/week-day-list`,
            // async: true,
            name: 'week_day',
            multi:true,
            required: true,
            col: 4
        },
        shift_id: {
            type: 'advanceSelect',
            label: "Shifts",
            target: `${props.branchId}/shifts`,
            // async: true,
            name: 'shift_id',
            required: true,
            col: 4
        },

    };

    return (
        <div>
            <Card className="animated fadeIn">
                <Header title="Add New Roaster"/>
                <CardBody>
                    <FormGenerator
                        targetEntity={`${props.branchId}/rosters`}
                        fields={fields}
                        targetId={id}
                        name="rosters"
                        extraVals={{branch_id: props.branchId}}
                        redirect="roasters"
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
