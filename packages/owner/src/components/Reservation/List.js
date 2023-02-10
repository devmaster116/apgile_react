import {CCol, CFormInput, CFormLabel, CRow} from '@coreui/react-pro';
import {Card, CardBody, CardHeader, Button,Spinner} from 'reactstrap';
import {FormGenerator} from '@evenlogics/whf-form-generator';
import {Modal,ModalHeader,ModalBody} from "react-bootstrap/";
import RemoteTable from '@evenlogics/whf-remote-table';
import React, {useEffect, useState} from 'react';
import api from "@evenlogics/whf-api";
import {connect} from "react-redux";
import { useRef } from 'react';
const ReservationList = (props) => {


    const [showExportModal, setShowExportModal] = useState(false)
    const [showImportModal, setShowImportModal] = useState(false)
    const [encId, setEncId] = useState('')
    const [encIdLoading,setEncIdLoading]=useState(false)

    const [query, setQuery] = useState(false);
    const [valueOff, setValueOff] = useState(0);
    const startDate=useRef('')
    const endDate=useRef('')

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

    const importFields={
        file: {
            type: 'file',
            label: 'CSV File ',
            required: true,
            col: 12,
        },
    }
    const exportCsv=()=>{
       
        const params = new URLSearchParams({
            ...(startDate.current.value && { start_date: startDate.current.value }),
            ...(endDate.current.value && { end_date: endDate.current.value }),
            branch_id: encId
        }).toString()
        console.log(params)
        window.open(`${process.env.REACT_APP_SERVER_URL}/reservation-export?${params}`,'_blank')
        setShowExportModal(false) 
    }

    const openExportModal=()=>{
        setEncIdLoading(true)
        api.request('post',`/${props.branchId}/encrypt-string`).then((res) => {
            setEncId(res.encrypted_string)
            setEncIdLoading(false)
        }).catch((err) => {
            
        });
        setShowExportModal(true)
    }
    return (
        <div className="animated">
            <Card>
                <CardHeader>
                    <div className='d-flex justify-content-between'>
                        <strong>All Reservations</strong>
                        <div>
                            <Button onClick={openExportModal} color='info'>Export Reservation</Button>{'   '}
                            <Button onClick={()=>setShowImportModal(true)} color='warning' >Import Reservation</Button>
                        </div>
                    </div>
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

            <Modal style={{ textAlign: "center" }} show={showExportModal} onHide={() => setShowExportModal(false)} aria-labelledby="contained-modal-title-vcenter" centered>
                <ModalHeader >Export CSV</ModalHeader>
                <ModalBody>
                    {
                        encIdLoading ?
                        <Spinner animation="border" role="status" className='mx-auto'>
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>
                        :
                        <CRow>
                        <CCol lg={4} md={4} sm={12}>
                            <CFormLabel>Start Date</CFormLabel>
                            <CFormInput type='date' ref={startDate}/>
                        </CCol>
                        <CCol lg={4} md={4} sm={12}>
                        <CFormLabel>End Date</CFormLabel>
                            <CFormInput type='date' ref={endDate}/>
                        </CCol>
                        <CCol lg={4} md={4} sm={12}>
                            <Button className='mt-4' onClick={exportCsv} >Export CSV</Button>
                        </CCol>

                    </CRow>
                    }
                </ModalBody>
            </Modal>

            <Modal style={{ textAlign: "center" }} show={showImportModal} onHide={() => setShowImportModal(false)} aria-labelledby="contained-modal-title-vcenter" centered>
                <ModalHeader >Import CSV</ModalHeader>
                <ModalBody>
                    <FormGenerator
                        targetEntity={`${props.branchId}/reservation-import`}
                        fields={importFields}
                        redirect="reservations"
                    />
                </ModalBody>
            </Modal>
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

