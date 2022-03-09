import React from 'react'
import {
    CWidgetStatsB,
} from '@coreui/react-pro';

const Block = (props) => {
  return (
    <div>
            <CWidgetStatsB
                  className="mb-4 text-capitalize"
                  color={props.color}
                  textColor= {props?.font || "white" }
                  inverse
                  value={props.value}
                  title={props.title}
                />
    </div>
  )
}

export default Block