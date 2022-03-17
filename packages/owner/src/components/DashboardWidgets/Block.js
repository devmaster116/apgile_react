import React from 'react'
import {
    CCardBody, CCard
} from '@coreui/react-pro';

const Block = (props) => {
  return (
    <div>
        <CCard className={"mb-4 text-capitalize bg-" + props.color}>
            <CCardBody className="text-center text-white p-2">
                <div className="text-medium-emphasis small text-uppercase fw-semibold">{props.title}</div>
                <div className="fs-6 fw-semibold py-1">{props.value}</div>
            </CCardBody>
        </CCard>
    </div>
  )
}

export default Block
