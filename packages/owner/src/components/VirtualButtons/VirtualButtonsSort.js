import React from 'react'
import CustomSort from '../components/CustomSort'
export default function VirtualButtonSort() {
  return (
    
    <CustomSort 
      headerTitle={'Virtual Button Sort'}
      entityEndpoint={'active-virtualButton?limit=1000'}
      getSortedEnpoint={'get-vbtn-sorted'}
      setSortEndpoint={'set-vbtn-sorted'}
    />
  )
}
