import React, { useState,useEffect } from 'react'
import './App.css';
// import '../../../node_modules/'
import Plan from './Plan';
import api from "@evenlogics/whf-api";
import {connect} from "react-redux";


const Todo = (props) =>  {

  const [items, setItems] = useState([]);
  const [text, setText] = useState("");


  useEffect(() => {
    api.request("get",`/${props.branchId}/call-places`).then(({data}) => {
        // let labelArr = []
        // let valueArr = []
        // Object.entries(data?.calls).forEach(([key, val], i) => {
        //     if(key !== "total"){
        //         labelArr.push(key.toUpperCase());
        //         valueArr.push(val);
        //     }
        // })
        console.log(data,"data")
      })
      .catch((error) => console.log(error));
  }, [props.branchId])
  


  const handleChange = e => {
    setText(e.target.value)
  }
 const handleAdd = e => {
    if (text !== "") {
      const item = [...items,text];
      setItems(item);
      setText("");
    }
  }
  const handleDelete = id => {
    const Olditems = [...items]
    const item = Olditems.filter((element, i) => {
      return i !== id
    })
    setItems(item)
  }
 
    return (
      <div className="container-fluid my-5">
        <div className="row">
          <div className="col-sm-6 mx-auto text-white shadow-lg p-3">
            <h2 className="text-center"> Today's Calls </h2>
            <div className="container-fluid">
              <div className="row">
                <div className="col-9">
                  <input type="text" className="form-control" placeholder="Add Call Here" value={text} onChange={handleChange} />
                </div>
                <div className="col-2">
                  <button className="btn btn-warning px-5 font-weight-bold" onClick={handleAdd}>Add</button>
                </div>
              </div>
              <div className="conatiner">
                <ul className="list-unstyled row m-5">
                  {
                    items.map((value, i) => {
                      return <Plan key={i} id={i} value={value} sendData={handleDelete} />
                    })
                  }
                </ul>
                {/* <ul className="list-unstyled row m-5">
                  <Plan p={this.state.items} sendData={this.handleDelete} />
                </ul> */}
              </div>
            </div>

          </div>
        </div>
      </div>
    )
}

const mapStateToProps = state => {
    return {
        branchId: state.selectedBranchId,
    }
}


export default connect(mapStateToProps, null)(Todo);