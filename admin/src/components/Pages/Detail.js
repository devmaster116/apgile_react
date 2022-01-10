import React,{useState,useEffect} from 'react'
import {Modal,Spinner} from "react-bootstrap/";
import api from "@evenlogics/whf-api";

const Detail = (props) => {
  const [show, setShow] = useState(true);
  const [pages, setPages] = useState(false);
  const [Loader, setLoader] = useState(false);

  useEffect(() => {
    setLoader(true);
    api.request("get",`/pages/${props.match.params.id}`)
    .then(({data}) => {
        console.log(data,"data")
        setPages(data)
        setLoader(false)
    })
    .catch((error) => console.log(error));

}, [props.match.params.id])

     console.log(pages?.qr_code?.url,"kkkk")

    return (
      <div>
        <Modal
          style={{ textAlign: "center" }}
          show={show}
          onHide={() => setShow(false)}
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          {Loader ? (
            <Spinner animation="border" role="status" className='mx-auto'>
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          ) : (
            <img
              className="mx-auto"
              width={400}
              height={360}
              alt="background"
              src={pages?.qr_code?.url}
            ></img>
          )}
        </Modal>
      </div>
    );
}

export default Detail
