import React, {useState, useEffect} from "react";
import RemoteTable from "@evenlogics/whf-remote-table";
import {Card, CardBody, Button} from "reactstrap";
import {Header} from "@evenlogics/whf-ra-components";
import {Modal, Spinner} from "react-bootstrap/";
import EasyEdit from 'react-easy-edit';
import api from "@evenlogics/whf-api";
import "../../style/style.css";
import {connect} from "react-redux";
import Swal from "sweetalert2";

// import {ButtonGroup} from "react-bootstrap";

const List = (props) => {

    const [show, setShow] = useState(false);
    const [pages, setPages] = useState(false);
    const [Loader, setLoader] = useState(false);
    const [ID, setID] = useState(0);
    const [query, setQuery] = useState(false)
    const [valueOff, setValueOff] = useState(0);


    useEffect(() => {
        let bool = true;
        if (ID !== 0) {
            setLoader(bool)
            api.request("get", `/${props?.branchId}/pages/${ID}`)
                .then(({data}) => {
                    setPages(data)
                    setShow(true);
                    setTimeout(() => {
                        setLoader(false)
                    }, 3000);
                })
                .catch((error) => console.log(error));
        }
    }, [ID, props.branchId])


    /* eslint-disable */

        useEffect(() => {
            if(valueOff === 0){
                setValueOff(1)
            }else{
                setQuery((prev) => !prev)
            }
        }, [props.branchId]);

    /* eslint-enable */

const save = (value,data) => {
    console.log(data,"data")
    console.log(value,"data")
    let payload = {
        name : value
    }
    api.request("put", `/${props?.branchId}/page/${data.id}`,payload)
    .then(() => {
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Successfully saved',
            showConfirmButton: false,
            timer: 1500
          })
        setQuery((prev) => !prev)
    }).catch((error) => console.log(error));
}


const cancel = () => {
    console.log("cancelled")
}
const filters = {
    location_id: {
        type: "advanceSelect",
        label: "Select Location",
        target: props?.userRole === "supervisor" ? `${props?.branchId}/supervisor-locations` : `${props?.branchId}/locations`,
        async: true,
        col: 4,
    },

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
            isDummyField: true,
            align: "center",
            text: "Item",
            sort: true,
            formatter: (cell, row) => (
                // <div className="bg-info">
             props.userRole === "admin" ? <EasyEdit
                type="text"
                value={row?.name}
                onSave={(value)=>save(value,row)}
                onCancel={cancel}
                saveButtonStyle="btn btn-success h-10 w-15 ml-1"
                saveButtonLabel="Save"
                cancelButtonLabel="Cancel"
                cancelButtonStyle="btn h-10 w-15 ml-1"
                attributes={{ name: "awesome-input", id: 1}}
                instructions="Edit the name"
              /> : <p>{row?.name}</p>
            //   </div>
            )
        },
        {
            dataField: "location.name",
            text: "Location",
            align: "center",
            sort: true,
        },
        {
            isDummyField: true,
            align: "center",
            text: "QR Code",
            sort: true,
            formatter: (cell, row) => {
                return (
                    <div className="button-tables">
                        <Button
                        size="sm"
                            color="primary"
                            onClick={() => {
                                setID(row?.id);
                                setShow(true);
                            }}
                        >
                            View QR Code
                        </Button>
                        <Button
                        size="sm"
                        className="mx-auto"

                        color="secondary" onClick={() => openPage(row)}>
                            View Page
                        </Button>
                     {
                         props?.userRole !== "supervisor" && <Button
                         size="sm"
                         color="warning"
                         className="text-white"

                         onClick={() => downloadPdf(row)}>
                             Download QR Code
                         </Button>
                     }
                    </div>
                );
            },
        },


    ];

    const downloadPdf = (item) => {
        console.log(item,"item")
        console.log(item.download_url,"item.download_url")
        window.open(item.download_url);
    }

    const openPage = (item) => {
        // const id=JSON.parse(localStorage.getItem('currentUser')).id||''
        // window.open(`${process.env.REACT_APP_PWA_URL}?q=${item.uuid}&owner=${id}`);
        window.open(item.pwa_page_url);
    }

    // const calculateParams = () => {
    //   let params ;
    //   if(props?.branchId === null){
    //      params = {
    //     company_id:props?.companyId
    //     }
    //   }else{
    //     params = {
    //     company_id:props?.companyId,
    //     branch_id:props?.branchId
    //     }
    //   }
    //   return params;
    //   }


    return (
        <div>
            <div>
                <Card className="animated fadeIn">
                    <Header title="All QR Codes"/>
                    <CardBody>
                        <RemoteTable
                            // entity={props?.userRole === "supervisor" ? `pages?branch_id=${props?.branchId}` : props?.branchId !== null ? `pages?branch_id=${props?.branchId}`:`pages`}
                            // customEntity={props?.userRole === "supervisor" ? `pages?branch_id=${props?.branchId}` : props?.branchId !== null ? `pages?branch_id=${props?.branchId}`:`pages`}
                            entity={props?.userRole === "supervisor" ? `${props?.branchId}/supervisor-pages` : `${props?.branchId}/pages`}
                            customEntity={`${props?.branchId}/pages`}
                            columns={columns}
                            sort={defaultSorted}
                            hideEdit={true}
                            hideDetail={true}
                            disableDelete={props?.userRole === "supervisor" ? true : false}
                            hideActionCol = {props?.userRole === "supervisor" ? true : false}

                            // customButton={{
                            //   name: "Download PDF",
                            //   color: "warning",
                            //   callback: downloadPdf,
                            // }}
                            // filters={ userRole?.includes("supervisor") ? null : filters}
                            showAdvanceFilters={true}
                            Query={query}
                            // query={calculateParams()}
                            filters={filters}
                            showAdvancedFilters={true}
                            // query={
							// 	{
							// 		sort : "id|desc"
							// 	}
							// }
                        />

                        <Modal
                            style={{textAlign: "center"}}
                            show={show}
                            onHide={() => setShow(false)}
                            aria-labelledby="contained-modal-title-vcenter"
                            centered
                        >
                            {Loader ? (
                                <Spinner animation="border" role="status" className="mx-auto">
                                    <span className="visually-hidden">Loading...</span>
                                </Spinner>
                            ) : (
                                <>
                                    <img
                                        className="mx-auto"
                                        width={400}
                                        height={360}
                                        alt="background"
                                        src={"data:image/png;base64," + pages?.qr_code}
                                    ></img>
                                    <p><b>{pages?.name}</b></p>
                                </>
                            )}
                        </Modal>
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
