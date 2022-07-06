import React, {useEffect, useState} from 'react';
import {Card, CardBody, CardHeader, Button} from 'reactstrap';
import RemoteTable from '@evenlogics/whf-remote-table';
import {connect} from "react-redux";
import api from "@evenlogics/whf-api";

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
        start_date: {
            type: "date",
            label: "Select From",
            col: 4,
            getValue: (data) => {
                setTimeout(() => {
                    setMinDate(data?.value)
                }, 0)
            }
        },
        end_date: {
            type: "date",
            label: "Select To",
            col: 4,
            placeholderText: minDate ? "" : "Please select the start date",
            disabled: minDate ? false : true,
            minDate: minDate,
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

