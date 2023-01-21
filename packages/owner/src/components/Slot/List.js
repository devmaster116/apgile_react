import React, {useEffect, useState} from 'react';
import {Card, CardBody, CardHeader} from 'reactstrap';
import RemoteTable from '@evenlogics/whf-remote-table';
import {connect} from "react-redux";

const SlotList = (props) => {
    const [query, setQuery] = useState(false);
    const [valueOff, setValueOff] = useState(0);

    /* eslint-disable */
    useEffect(() => {
        if (valueOff === 0) {
            setValueOff(1)
        } else {
            setQuery((prev) => !prev)
        }
    }, [props.branchId]);
    /* eslint-enable */


    const filters = {
        target_date: {
            type: "date",
            label: "Reservation Date",
            col: 4
        }
    };

    const columns = [
        {
            hidden: true,
            dataField: "id",
            text: "ID",
            align: "center",
            sort: true,
        },
        {
            dataField: 'name',
            text: 'Name',
            align: 'center',
            sort: true
        },
        {
            isDummyField: true,
            text: "Start Time",
            align: "center",
            sort: true,
            formatter: (cell, row) => {
                if (row?.start_list) {
                    return (
                        <span className="badge badge-dark">
							{row?.start_list}
						</span>
                    )
                }
            },
        },
        {
            isDummyField: true,
            text: "End Time",
            align: "center",
            sort: true,
            formatter: (cell, row) => {
                if (row?.end_list) {
                    return (
                        <span className="badge badge-dark">
							{row?.end_list}
						</span>
                    )
                }
            },
        },

        {
            dataField: 'weekdays_name',
            text: 'Days',
            align: 'center',
            sort: true
        },

    ];

    const defaultSorted = [
        {
            dataField: 'id',
            order: 'desc'
        }
    ];

    return (
        <div className="animated">
            <Card>
                <CardHeader>
                    <strong>All Slots</strong>
                </CardHeader>
                <CardBody>
                    <RemoteTable
                        entity={`${props?.branchId}/slots`}
                        customEntity={`slots`}
                        columns={columns}
                        sort={defaultSorted}
                        hideDetail={true}
                        filters={filters}
                        Query={query}
                        addRoute="/slots/add"
                    />
                </CardBody>
            </Card>
        </div>
    );

}

const mapStateToProps = state => {
    return {
        branchId: state.selectedBranchId,
        companyName: state.companyName,
        companyId: state.companyId,
        userRole: state.userRole
    }
}

export default connect(mapStateToProps, null)(SlotList);

