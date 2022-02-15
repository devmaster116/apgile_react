import React, {useState,useEffect} from 'react';
import {Card, CardBody, CardHeader} from 'reactstrap';
import {FormGenerator} from '@evenlogics/whf-form-generator';
import {connect} from "react-redux";

const LocationsAdd = (props) =>  {

    const [query, setQuery] = useState(false);
    useEffect(() => {
      setQuery((prev) => !prev);
    }, [props.branchId]);
    console.log(query,"query")
        const {id} = props.match.params;

        const fields = {
            name: {
                type: 'text',
                label: 'Name',
                required: true,
                name: 'name',
                col: 6
            },
            description: {
                type: 'text',
                label: "Description",
                name: 'description',
                col: 6
            },
            auto: {
                type: "switch",
                label: "Auto Assign Staff",
                name: "auto_assign",
                required: true,
                col: 3,
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
                        name="locations"
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
       branchId : state.selectedBranchId,

      }
}

export default connect(mapStateToProps,null)(LocationsAdd);
