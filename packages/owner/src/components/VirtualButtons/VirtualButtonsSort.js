import React, { useState, useEffect } from 'react'
import { Card, CardBody, CardHeader } from 'reactstrap';
import { CCol, CRow } from '@coreui/react-pro';
import api from "@evenlogics/whf-api";
import Select from 'react-select';
import { connect } from "react-redux";
import { sortableContainer, sortableElement, arrayMove, sortableHandle } from 'react-sortable-hoc';



function VirtualButtonSort(props) {

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
      api.request("get", `/${props?.branchId}/virtual-buttons?limit=1000`)
        .then(({ data }) => {
          setDataToSort(data)
        })
        .catch((error) => console.log(error));
    }


  }, [selectedOption, props.branchId])


  const onOptionChange = (e) => {
    setSelectedOption(e)
    console.log(e)
  }


  const SortableContainer = sortableContainer(({ children }) => <div style={{ height: '33vw', overflowY: 'scroll' }}  >{children}</div>)

  const SortableItem = sortableElement(({ children }) => children)

  const onSortEnd = ({ oldIndex, newIndex }) => {
    setDataToSort(arrayMove(dataToSort, oldIndex, newIndex))
  };
  const DragHandle = sortableHandle(() => <i className='fa fa-bars ' style={{cursor:'grab'}}></i>);
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
          <CCol md={12}>
            <SortableContainer onSortEnd={onSortEnd} useDragHandle axis='xy' >
              {dataToSort.map((data, index) => (
                <SortableItem key={`item-${data.id}`} index={index} value={data} >
                  <div className='p-2 d-flex align-items-center'>
                  <DragHandle />
                    <div className='ml-1'>  <i className={`fa ${data.icon}`}></i>{data.title}</div>
                  </div>
                </SortableItem>
              ))}
            </SortableContainer>
          </CCol>
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