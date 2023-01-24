import React, { useState, useEffect } from 'react'
import { Card, CardBody, CardHeader,Button } from 'reactstrap';
import { CCol, CRow } from '@coreui/react-pro';
import api from "@evenlogics/whf-api";
import Select from 'react-select';
import { connect } from "react-redux";
import { sortableContainer, sortableElement, arrayMove } from 'react-sortable-hoc';



function OrderItemSort(props) {

  const [options, setOptions] = useState([])
  const [selectedOption, setSelectedOption] = useState(null)

  const [dataToSort, setDataToSort] = useState([])

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
    cursor:'grab'

  }}  >{children}</div>)

  const SortableItem = sortableElement(({ children }) => children)

  const onSortEnd = ({ oldIndex, newIndex }) => setDataToSort(arrayMove(dataToSort, oldIndex, newIndex))
  
  const onSave=()=>{
    const data=dataToSort
    api.request("get", `/${props?.branchId}/virtual-buttons`,data)
    .then(({ data }) => {
     
    })
    .catch((error) => console.log(error));
  }

  return (
    <Card className="animated fadeIn">
      <CardHeader title={`Virtual Button Sort`} />
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
            dataToSort.length>0 &&

            <CCol md={12}>
              <SortableContainer onSortEnd={onSortEnd} axis="xy" >
                {dataToSort.map((data, index) => (
                  <SortableItem key={`item-${data.id}`} index={index} value={data} >
                    <div className='p-2 d-flex align-items-center sort-inner' style={{
                      border: '1px solid #cbcbcb',
                      borderRadius: '5px',
                      backgroundColor: '#eef5ff'
                    }}>
                      <div className='ml-1'>  <i className={`fa ${data.icon}`}></i>{data.title}</div>
                    </div>
                  </SortableItem>
                ))}
              </SortableContainer>
              <Button color="primary" className="mt-2" onClick={onSave} >Save Order</Button>
            </CCol>
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

export default connect(mapStateToProps, null)(OrderItemSort);