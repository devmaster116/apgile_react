
import React,{useState,useEffect} from "react";
import { Card,CardBody,Row,Col} from "reactstrap";
import { Header } from "@evenlogics/whf-ra-components";
import Switch from "react-switch";
import api from "@evenlogics/whf-api";
import { Spinner } from "react-bootstrap/";
import Swal from "sweetalert2";
import {connect} from "react-redux";

const Detail = (props) => {


	const [switchState, setSwitchState] = useState(false);
	const [userData, setUserData] = useState([]);
  const [Loader, setLoader] = useState(false);


	useEffect(() => {
    setLoader(true);
    let ls =  JSON.parse(localStorage.getItem('currentUser'));
    console.log(ls,"ls object");
    api.request("get",`/${props.branchId}/user-profile/${ls?.id}`).then(({data}) => {
      console.log(data?.user,"worked");
      setUserData(data?.user)
      setSwitchState(data?.user?.is_online)
     
    setLoader(false);
    })
    .catch((error) => console.log(error));
  }, [switchState,props.branchId]);

  const handleChange = (value) => {
    console.log(value,"value");
   setSwitchState(!switchState)
   let status = value === true ? 1 : 0;
   let payload = {
    status,
   }
   api.request("post",`/set-online-status`,payload)
       .then(() => {
         console.log("worked");
         Swal.fire(
          'Status Changed Successfully!',
        )
       })
       .catch((error) => console.log(error));
  }

  return (
    <Card className="animated fadeIn">
      <Header title="User Details" />
      <CardBody>
        {
          Loader ? (
            <div className="text-center">
               <Spinner animation="border" role="status" className="mx-auto"  />
           
            </div>
           
          ): (
            <Row>
          {Object.keys(userData)?.map((userKey, index) => {
            if (Array.isArray(userData[userKey]) === false) {
              return (
                <React.Fragment key={index}>
                  <Col xl="3" lg="3" md="3" sm="6" className="mt-3">
                    <b>{userKey}</b>
                  </Col>
                  <Col xl="3" lg="3" md="3" sm="6" className="mt-3">
                    {userData[userKey]}
                  </Col>

                  <br />
                  <br />
                  <br />
                </React.Fragment>
              );
            } else {
              return userData[userKey].map((role, index) => (
                <React.Fragment key={index}>
                  <Col xl="3" lg="3" md="3" sm="6" className="mt-3">
                    <b>{userKey}</b>
                  </Col>
                  <Col xl="3" lg="3" md="3" sm="6" className="mt-3">
                    {role?.name}
                  </Col>

                  <br />
                  <br />
                  <br />
                </React.Fragment>
              ));
            }
          })}
          <Col xl="3" lg="3" md="3" sm="6" className="mt-3">
            <b>Available</b>
          </Col>
          <Col xl="3" lg="3" md="3" sm="6" className="mt-3">
            <Switch
              onChange={handleChange}
              checked={switchState}
            />
          </Col>
        </Row>
          )
        } 
      </CardBody>
    </Card>
  );
};


const mapStateToProps = state => {
  return {
      branchId : state.selectedBranchId,
      userRole : state.userRole
    }
}

export default connect(mapStateToProps,null)(Detail);