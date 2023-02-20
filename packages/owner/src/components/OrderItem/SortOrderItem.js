import React from 'react'
import { connect } from "react-redux";

import CustomSort from '../components/CustomSort';


function OrderItemSort(props) {

  return (
    <CustomSort

      headerTitle={'Order Item Sort'}
      entityEndpoint={'active-orderItem'}
      getSortedEnpoint={'get-order-orderItem'}
      setSortEndpoint={'set-order-orderItem'}
    />
  )
}

const mapStateToProps = state => {
  return {
    branchId: state.selectedBranchId,
    companyId: state.companyId,
  }
}

export default connect(mapStateToProps, null)(OrderItemSort);