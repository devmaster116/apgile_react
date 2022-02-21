import React, {useState, useEffect} from "react";
import RemoteTable from "@evenlogics/whf-remote-table";
import {Card, CardBody, Button, ButtonGroup} from "reactstrap";
import {Header} from "@evenlogics/whf-ra-components";
import {Modal, Spinner} from "react-bootstrap/";
import api from "@evenlogics/whf-api";
import {connect} from "react-redux";
// import {ButtonGroup} from "react-bootstrap";

const List = (props) => {

    const [show, setShow] = useState(false);
    const [pages, setPages] = useState(false);
    const [Loader, setLoader] = useState(false);
    const [ID, setID] = useState(0);
    const [query, setQuery] = useState(false)


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


    useEffect(() => {
        setQuery((prev) => !prev)
    }, [props.branchId]);


    const defaultSorted = [{dataField: "id", order: "desc"}];
    const columns = [
        {
            dataField: "id",
            text: "ID",
            align: "center",
            sort: true,
        },

        {
            dataField: "name",
            text: "Name",
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
            dataField: "total_calls",
            text: "Total Calls",
            align: "center",
            sort: true,
        },
        {
            dataField: "last_used",
            text: "Last Call",
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
                    <ButtonGroup size="sm">
                        <Button
                            color="primary"
                            onClick={() => {
                                setID(row?.id);
                            }}
                        >
                            View QR Code
                        </Button>
                        <Button color="secondary" onClick={() => openPage(row)}>
                            View Page
                        </Button>
                        <Button color="warning" onClick={() => downloadPdf(row)}>
                            Download QR Code
                        </Button>
                    </ButtonGroup>
                );
            },
        },


    ];

    const downloadPdf = (item) => {
        window.open(item.download_url);
    }

    const openPage = (item) => {
        window.open(item.front_url);
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
                            entity={`${props?.branchId}/pages`}
                            customEntity={`${props?.branchId}/pages`}
                            columns={columns}
                            sort={defaultSorted}
                            hideEdit={true}
                            hideDetail={true}
                            disableDelete={props?.userRole === "supervisor" ? true : false}


                            // customButton={{
                            //   name: "Download PDF",
                            //   color: "warning",
                            //   callback: downloadPdf,
                            // }}
                            // filters={ userRole?.includes("supervisor") ? null : filters}
                            showAdvanceFilters={true}
                            Query={query}
                            // query={calculateParams()}

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
                                    <p><b>{pages?.description}</b></p>
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
