import React,{useEffect} from 'react';


const MirageRoute = (props) => {

  useEffect(() => {
    props.history.goBack()
  }, [props.history])

  return (
    <div>mirageRoute</div>
  )
}

export default MirageRoute

