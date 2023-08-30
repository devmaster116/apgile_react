import React, { useState, useEffect } from 'react'
import { sortableContainer, sortableElement, arrayMove } from 'react-sortable-hoc';
import { Card, CardBody, CardHeader, Button } from 'reactstrap';
import { toast } from 'react-toastify';
import { Alert, Spinner } from 'react-bootstrap';
import { CCol, CRow } from '@coreui/react-pro';
import { connect } from "react-redux";
import api from "@evenlogics/whf-api";


 function CategorySort(props) {
    const [dataToSort, setDataToSort] = useState([])
    const [saveLoading, setSaveLoading] = useState(false)

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


    useEffect(() => { 
          api.request("get", `/${props?.branchId}/category/list-sort`)
            .then(({ data }) => {
              setDataToSort(data.map((opt) => ({ value: opt.id, label: opt.title, icon: opt.icon })))
            })
            .catch((error) => console.log(error));
 
      }, [props?.branchId])

    const onSave = () => {
        const data = {
            sorted_items: dataToSort.map((d) => d.value)
        }
        setSaveLoading(true)
        api.request("post", `/${props?.branchId}/category/sort`, data)
            .then(({ data }) => {
                toast.success('Sorted Successfully')
            })
            .catch((error) => {
                toast.error('Something went wrong')
                console.log(error)
            }).finally(() => setSaveLoading(false));
    }

    return (
        <div>
            <Card className="animated fadeIn">
                <CardHeader>Sort Categories</CardHeader>
                <CardBody>
                    <CRow>
                        {
                            dataToSort.length > 0 ?
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
                                </CCol> :
                                <div className='m-2'>
                                    <Alert>No Data</Alert>
                                </div>
                        }
                    </CRow>
                </CardBody>
            </Card>
        </div>
    )
}
const mapStateToProps = state => {
    return {
      branchId: state.selectedBranchId,
      companyId: state.companyId,
    }
  }

  export default connect(mapStateToProps, null)(CategorySort);