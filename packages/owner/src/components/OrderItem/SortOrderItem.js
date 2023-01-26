import React, { useState, useEffect } from 'react'
import { Card, CardBody, CardHeader, Button, Modal, ModalBody, ModalFooter, ModalHeader, } from 'reactstrap';
import { CCol, CRow } from '@coreui/react-pro';
import api from "@evenlogics/whf-api";
import Select from 'react-select';
import { connect } from "react-redux";
import { sortableContainer, sortableElement, arrayMove } from 'react-sortable-hoc';
import { toast } from 'react-toastify';


function OrderItemSort(props) {

  const [options, setOptions] = useState([])
  const [selectedOption, setSelectedOption] = useState(null)

  const [dataToSort, setDataToSort] = useState([])
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [dataToDelete, setDataToDelete] = useState({ id: null, index: null })

  useEffect(() => {
    api.request("get", `/${props?.branchId}/locations?limit=1000`)
      .then(({ data }) => {
        setOptions(data.map((opt) => ({ value: opt.id, label: opt.name })))
      })
      .catch((error) => console.log(error));

  }, [props?.branchId])

  useEffect(() => {
    if (selectedOption?.value) {
      api.request("get", `/${props?.branchId}/order-items?limit=1000&location_id=${selectedOption.value}`)
        .then(({ data }) => {
          setDataToSort(data)
        })
        .catch((error) => console.log(error));
    }
  }, [selectedOption, props.branchId])


  const onOptionChange = (e) => setSelectedOption(e)

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
    const data = dataToSort
    api.request("get", `/${props?.branchId}/virtual-buttons`, data)
      .then(({ data }) => {
        toast.success('Sorted Successfully')
      })
      .catch((error) => {
        toast.error('Something went wrong')
        console.log(error)
      });
  }

  const openDeleteModal = (id, index) => {
    setDataToDelete({ id: id, index: index })
    setShowDeleteModal(true)
  }
  const deleteItem = () => {
    const { id, index } = dataToDelete
    if (id && index) {
      api.request("delete", `/${props?.branchId}/order-items/${id}`)
        .then(({ data }) => {
          setDataToSort((prev) => {
            prev.splice(index, 1)
            return [...prev]
          })
          onHideDeleteModal()
          toast.success('Deleted Successfully')
        })
        .catch((error) => {
          toast.error('Something went wrong')
          console.log(error)
        });
    }

  }

  const onHideDeleteModal = () => {
    setShowDeleteModal(false)
    setDataToDelete({ id: null, index: null })
  }

  return (
    <Card className="animated fadeIn">
      <CardHeader>
        <div className='d-flex justify-content-between'>
          Order Item Sort
          <Button color='success' onClick={() => { props.history.push('/order-items/add') }} >Add Order Items</Button>
        </div>
      </CardHeader>
      <CardBody>
        <CRow>
          <CCol md={6}>
            <label>Select Location</label>
            <Select
              className="basic-multi-select"
              placeholder="All..."
              classNamePrefix="select"
              onChange={onOptionChange}
              options={options}
              value={selectedOption}
            // isMulti
            />

          </CCol>
          {
            dataToSort.length > 0 &&

            <CCol md={12}>
              <SortableContainer onSortEnd={onSortEnd} axis="xy" >
                {dataToSort.map((data, index) => (
                  <SortableItem key={`item-${data.id}`} index={index} value={data} >
                    <div className='p-2 d-flex align-items-center sort-inner justify-content-between' style={{ border: '1px solid #cbcbcb', borderRadius: '5px', backgroundColor: '#eef5ff' }}>
                      <div className='ml-1'>  <i className={`fa ${data.icon} mr-2`}></i>{data.title}</div>
                      <Button color='danger' onClick={() => { openDeleteModal(data.id, index) }} ><i className='fa fa-trash'></i></Button>
                    </div>
                  </SortableItem>
                ))}
              </SortableContainer>
              <Button color="primary" className="mt-2" onClick={onSave} >Save Order</Button>
            </CCol>
          }
        </CRow>

        <Modal isOpen={showDeleteModal} >
          <ModalHeader >Delete Item</ModalHeader>
          <ModalBody>Are you sure, you want to delete this?</ModalBody>
          <ModalFooter>
            <Button color="danger" onClick={deleteItem}>Delete</Button>{" "}
            <Button color="secondary" onClick={onHideDeleteModal}>Cancel</Button>
          </ModalFooter>
        </Modal>
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

export default connect(mapStateToProps, null)(OrderItemSort);