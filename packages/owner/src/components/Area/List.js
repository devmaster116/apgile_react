import React, {useEffect, useState} from "react";
import RemoteTable from "@evenlogics/whf-remote-table";
import {Card, CardBody, Button} from "reactstrap";
import {Header} from "@evenlogics/whf-ra-components";
import {connect} from "react-redux";
import api from "@evenlogics/whf-api";
import {toast} from 'react-toastify';

const List = (props) => {


    const [query, setQuery] = useState(false);
    const [minDate, setMinDate] = useState('');
    const [pages,setPages] = useState(`${props?.branchId}/pages`)
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
        let payload = {
            status: !data?.status
        }
        api.request("put", `/${props.branchId}/areas/status/${data?.id}`, payload)
            .then((data) => {
                console.log(data)
                setQuery(!query)
            }).catch(err => {
                toast.error(err?.response?.data.message)
               
            });
    }


    const handleChangeLocation = (data) => {
        setTimeout(() => {
            setPages(`${props?.branchId}/location/${data?.value}/pages`)
        }, 1);
    }
    const defaultSorted = [{dataField: "id", order: "desc"}];


    const filters = {

        location_id: {
            type: "advanceSelect",
            label: "Select Location",
            target: `${props?.branchId}/locations`,
            async: true,
            col: 4,
            callback: (data) => handleChangeLocation(data)

        },

        // team_id: {
        //     type: "advanceSelect",
        //     label: "Select Team",
        //     target: `${props?.branchId}/teams`,
        //     async: true,
        //     col: 12 + ' col-sm-3  ',
        // },

        // user_id: {
        //     type: "advanceSelect",
        //     label: "Select Staff Member",
        //     target: `${props?.branchId}/role-users/staff`,
        //     optionLabel: "username",
        //     async: true,
        //     col: 12 + ' col-sm-3  ',
        // },


        page_id: {
            type: "advanceSelect",
            label: "Select Item",
            target: pages,
            async: true,
            col: 4,
        },
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

    }
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
            dataField: "name",
            text: "Area Name",
            align: "center",
            sort: true,
        },

        {
            dataField: "location.name",
            text: "Location",
            align: "center",
            sort: true,
        },

        {
            dataField: "description",
            text: "Area Description",
            align: "center",
            sort: true,
        },
        {
            align: "center",
            text: "Status",
            sort: true,
            formatter: (cell, row) => {
                return (
                    <Button color={row?.status === true ? "success" : "danger"} onClick={() => changeStatus(row)}>
                        {row?.status === true ? "Active" : "Inactive"}
                    </Button>
                );
            },
        },

    ];


    return (
        <div>
            <div>
                <Card className="animated fadeIn">
                    <Header title="All Areas"/>
                    <CardBody>
                        {
                            props?.branchId && <RemoteTable

                            // entity={props?.branchId !== null ? `areas?branch_id=${props?.branchId}`:`areas`}
                            // customEntity={props?.branchId !== null ? `areas?branch_id=${props?.branchId}`:`areas`}
                            entity={`${props?.branchId}/areas`}
                            customEntity={`areas`}
                            columns={columns}
                            sort={defaultSorted}
                            hideEdit={false}
                            hideDetail={true}
                            hideDelete={false}
                            addRoute="/areas/add"
                            Query={query}
                            filters={filters}
                            showAdvancedFilters={true}
                            // query={calculateParams()}
                            // query={
							// 	{
							// 		sort : "id|desc"
							// 	}
							// }
                        />
                        }
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
