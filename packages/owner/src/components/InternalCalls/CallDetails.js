import React from 'react';

const  Plan = (props) => {
 return <>
  <li className="shadow p-2 my-2 col-sm-9">{props.value}</li>
  <button className="btn btn-danger my-2 col-sm-2 offset-1" onClick={() => { props.sendData(props.id) }}>Delete</button>

  {/* {
   arr.map((value, i) => {
    return (<React.Fragment key={i}>
     <li className="shadow p-2 my-2 col-sm-9">{value}</li>
     <button className="btn btn-danger my-2 col-sm-2 offset-1" onClick={() => { props.sendData(i) }}>X</button>
    </React.Fragment>)
   })
  } */}

 </>
}

export default Plan;