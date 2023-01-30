import React, { useState, useEffect } from 'react'
import { Card, CardBody, CardHeader, Button } from 'reactstrap';
import { CCol, CRow } from '@coreui/react-pro';
import api from "@evenlogics/whf-api";
import Select from 'react-select';
import { connect } from "react-redux";
import { sortableContainer, sortableElement, arrayMove } from 'react-sortable-hoc';
import { toast } from 'react-toastify';
import { Alert, Spinner } from 'react-bootstrap';

function VirtualButtonSort(props) {


  const {headerTitle,entityEndpoint,getSortedEnpoint,setSortEndpoint}=props


  const [locationOptions, setLocationOptions] = useState([])
  const [vbOptions, setVbOptions] = useState([])
  const [selectedLocation, setSelectedLocation] = useState(null)
  const [selectedVb, setSelectedVb] = useState(null)

  const [dataToSort, setDataToSort] = useState([])

  const [locChangeLoading, setLocChangeLoading] = useState(false)

  const [saveLoading, setSaveLoading] = useState(false)

  useEffect(() => {
    api.request("get", `/${props?.branchId}/locations?limit=1000`)
      .then(({ data }) => {
        setLocationOptions(data.map((opt) => ({ value: opt.id, label: opt.name })))
      })
      .catch((error) => console.log(error));

    api.request("get", `/${props?.branchId}/${entityEndpoint}`)
      .then(({ data }) => {
        setVbOptions(data.map((opt) => ({ value: opt.id, label: opt.title, icon: opt.icon })))
      })
      .catch((error) => console.log(error));

  }, [props?.branchId,entityEndpoint])

  useEffect(() => {
    if (selectedLocation?.value) {
      setLocChangeLoading(true)
      api.request("get", `/${props?.branchId}/${getSortedEnpoint}?limit=1000&location_id=${selectedLocation.value}`)
        .then(({ data }) => {
          setSelectedVb(data.map((opt) => ({ value: opt.id, label: opt.title, icon: opt.icon })))
          setDataToSort(data.map((opt) => ({ value: opt.id, label: opt.title, icon: opt.icon })))
        })
        .catch((error) => console.log(error)).finally(() => setLocChangeLoading(false));
    }
  }, [selectedLocation, props.branchId,getSortedEnpoint])


  const onLocationChange = (e) => { setSelectedLocation(e) }

  const onVbChange = (e) => {
    setSelectedVb(e)
    setDataToSort(e)
  }

  const SortableContainer = sortableContainer(({ children }) => <div className='sort-wrap' style={{
    overflowY: 'scroll',
    display: 'grid',
    gridGap: '20px',
    gridTemplateColumns: 'repeat(auto-fill, minmax(200px , 1fr))',
    margin: '20px 0',
    cursor: 'grab'

  }}  >{children}</div>)

  const SortableItem = sortableElement(({ children }) => children)

  const onSortEnd = ({ oldIndex, newIndex }) => setDataToSort(arrayMove(dataToSort, oldIndex, newIndex))

  const onSave = () => {
    console.log(dataToSort)
    const data = {
      location_id: selectedLocation.value,
      sort: dataToSort.map((d) => d.value)
    }
    setSaveLoading(true)
    api.request("post", `/${props?.branchId}/${setSortEndpoint}`, data)
      .then(({ data }) => {
        toast.success('Sorted Successfully')
      })
      .catch((error) => {
        toast.error('Something went wrong')
        console.log(error)
      }).finally(() => setSaveLoading(false));
  }



  return (
    <Card className="animated fadeIn">
      <CardHeader>{headerTitle}</CardHeader>

      <CardBody>

        <CRow>
          <CCol md={6}>
            <label>Select Location</label>
            <Select className="basic-multi-select" placeholder="All..." classNamePrefix="select" onChange={onLocationChange} options={locationOptions} value={selectedLocation} />
          </CCol>
          <CCol md={6}>
            <label>Add/Remove Item</label>
            <Select className="basic-multi-select" placeholder="All..." classNamePrefix="select"
              onChange={onVbChange} options={vbOptions} value={selectedVb} isMulti
            />

          </CCol>



          {
            dataToSort.length > 0 && !locChangeLoading ?

              <CCol md={12}>

                <SortableContainer onSortEnd={onSortEnd} axis="xy" >
                  {dataToSort.map((data, index) => (
                    <SortableItem key={`item-${data.id}`} index={index} value={data} >
                      <div className='p-2 d-flex align-items-center sort-inner justify-content-between' style={{ border: '1px solid #cbcbcb', borderRadius: '5px', backgroundColor: '#eef5ff' }}>
                        <div className='ml-1'>  <i className={`fa ${data.icon} mr-2`}></i>{data.label}</div>
                      </div>
                    </SortableItem>
                  ))}
                </SortableContainer>
                <Button color="primary" className="mt-2" disabled={saveLoading} onClick={onSave} >
                  Save Order
                  {saveLoading && <Spinner style={{ height: '1rem', width: '1rem' }} animation="border" role="status" className='mx-auto'></Spinner>}
                </Button>
              </CCol>
              :
              <div className='m-2'>
                <Alert>Please change location to sort.
                  {locChangeLoading &&
                    <Spinner animation="border" role="status" className='mx-auto'>
                      <span className="visually-hidden">Loading...</span>
                    </Spinner>}
                </Alert>
              </div>
          }
        </CRow>



      </CardBody>
    </Card>
  )
}

const mapStateToProps = state => {
  return {
    branchId: state.selectedBranchId,
    companyId: state.companyId,
  }
}

export default connect(mapStateToProps, null)(VirtualButtonSort);