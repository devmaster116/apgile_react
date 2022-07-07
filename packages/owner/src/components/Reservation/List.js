import React, {useEffect, useState} from 'react';
import {Card, CardBody, CardHeader} from 'reactstrap';
import RemoteTable from '@evenlogics/whf-remote-table';
import {connect} from "react-redux";

const ReservationList = (props) => {
    const [query, setQuery] = useState(false);
    const [minDate, setMinDate] = useState('');
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
			dataField: "date_converted",
			text: "Date",
			align: "center",
			sort: true,
		},
		{
			dataField: "time_text",
			text: "Time Range",
			align: "center",
			sort: true,
		}

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
                    <strong>All Reservations</strong>
                </CardHeader>
                <CardBody>
                    <RemoteTable
                        entity={`${props?.branchId}/reservations`}
                        customEntity={`reservations`}
                        columns={columns}
                        sort={defaultSorted}
                        hideDetail={true}
                        filters={filters}
                        Query={query}
                        addRoute="/reservations/add"
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

export default connect(mapStateToProps, null)(ReservationList);

