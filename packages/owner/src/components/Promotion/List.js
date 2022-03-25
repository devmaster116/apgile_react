import React, {useEffect, useState} from "react";
import RemoteTable from "@evenlogics/whf-remote-table";
import {Card, CardBody, Button} from "reactstrap";
import {Header} from "@evenlogics/whf-ra-components";
import {connect} from "react-redux";
import api from "@evenlogics/whf-api";


const List = (props) => {

    const [query, setQuery] = useState(false);
    const [minDate, setMinDate] = useState('');
    const [valueOff, setValueOff] = useState(0);

    /* eslint-disable */
        useEffect(() => {
            if(valueOff === 0){
                setValueOff(1)
            }else{
                setQuery((prev) => !prev)
            }
        }, [props.branchId]);
    /* eslint-enable */

    const changeStatus = (data) => {
        console.log(data?.status, "data")
        let payload = {
            status: !data?.status
        }
        api.request("put", `/${props.branchId}/promotion/status/${data?.id}`, payload)
            .then((data) => {
                console.log(data)
                setQuery(!query)
            })
            .catch((error) => console.log(error));
    }


    const filters = {
        category_id: {
            type: "advanceSelect",
            label: "Select Category",
            target: `${props?.branchId}/categories`,
            async: true,
            col: 3,
        },

        status: {
            type: "advanceSelect",
            label: "Select Status",
            //  target: `${props.branchId}/call/status-list`,
            options: [
                {label: "Active", value: "1"},
                {label: "Inactive", value: "0"},
            ],
            col: 3,
        },
        start_date: {
            type: "date",
            label: "Select From",
            col: 3,
            getValue: (data) => {
                setTimeout(() => {
                    setMinDate(data?.value)
                }, 0)
            }
        },
        end_date: {
            type: "date",
            label: "Select To",
            col: 3,
            placeholderText: minDate ? "" : "Please select the start date",
            disabled: minDate ? false : true,
            minDate: minDate,
        }

    }
    const defaultSorted = [{dataField: "id", order: "desc"}];
    const columns = [
        {
            hidden:true,
            dataField: "id",
            text: "ID",
            align: "center",
            sort: true,
        },
        {
            dataField: "created_at",
            text: "Created At",
            align: "center",
            sort: true,
        },
        {
            dataField: "valid_from",
            text: "Start Date",
            align: "center",
            sort: true,
        },
        {
            dataField: "valid_till",
            text: "End Date",
            align: "center",
            sort: true,
        },
        {
            dataField: "weekdays_name",
            text: "Days",
            align: "center",
            sort: true,
        },
        {
            dataField: "time_text",
            text: "Time Range",
            align: "center",
            sort: true,
        },
        {
            isDummyField: true,
            align: "center",
            text: "Promotion Banner",
            sort: true,
            formatter: (cell, row) => {
                console.log(row, "row")
                return (
                    <img
                        width="60"
                        height="60"
                        style={{borderRadius: "50%", objectFit: "cover"}}
                        src={row?.promotion_image?.url}
                        alt="logo"
                    />
                );
            },
        },

        {
            dataField: "title",
            text: "Title",
            align: "center",
            sort: true,
        },

        {
            dataField: "category_name",
            text: "Category",
            align: "center",
            sort: true,
        },
        {
            align: "center",
            text: "Status",
            sort: true,
            formatter: (cell, row) => {
                console.log(row?.status, "status")
                return (
                    <Button color={row?.status === 1 ? "success" : "danger"} onClick={() => changeStatus(row)}>
                        {row?.status === 1 ? "Active" : "Inactive"}
                    </Button>
                );
            },
        },


    ];
    return (
        <div>
            <div>
                <Card className="animated fadeIn">
                    <Header title="All Promotions"/>
                    <CardBody>
                        <RemoteTable
                            entity={`${props?.branchId}/promotions`}
                            customEntity="promotions"
                            columns={columns}
                            sort={defaultSorted}
                            hideEdit={false}
                            hideDetail={true}
                            hideDelete={false}
                            addRoute="/promotions/add"
                            Query={query}
                            filters={filters}
                            showAdvancedFitlers={true}
                            // query={
							// 	{
							// 		sort : "id|desc"
							// 	}
							// }

                        />
                    </CardBody>
                </Card>
            </div>
        </div>
    );
};


const mapStateToProps = state => {
    return {
        branchId: state.selectedBranchId,
        companyName: state.companyName,
        companyId: state.companyId,
        userRole: state.userRole
    }
}


export default connect(mapStateToProps, null)(List);
