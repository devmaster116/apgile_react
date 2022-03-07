
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
  const [Loader, setLoader] = useState(true);


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
   api.request("post",`/${props?.branchId}/set-online-status`,payload)
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
        {Loader ? (
          <div className="text-center">
            <Spinner animation="border" role="status" className="mx-auto" />
          </div>
        ) : (
          <Row>
            {Object.keys(userData)?.map((userKey, index) => {
              if (Array.isArray(userData[userKey]) === false) {
                return (
                  userKey !== "is_online" &&
                  userKey !== "title" &&
                  userKey !== "title_name" &&
                  userKey !== "full_name" &&
                  userKey !== "gender_id" &&
                  userData[userKey] !== "" && (
                    <React.Fragment key={index}>
                      {typeof userData[userKey] !== "number" &&
                        userData[userKey] !== null && (
                          <Col md="3" sm="6" xs="12" className="mb-4 text-capitalize">
                            <b>
                              {userKey.replace(/\d+/g, "").replace("_", " ")}
                            </b>
                          </Col>
                        )}
                      {typeof userData[userKey] !== "number" &&
                        userData[userKey] !== null && (
                          <Col
                            sm="6"
                            md="3"
                            xs="12"
                            className="mb-4"
                            
                          >
                            {userData[userKey]}
                          </Col>
                        )}
                    </React.Fragment>
                  )
                );
              } else {
                return userData[userKey].map((role, index) => (
                  <React.Fragment key={index}>
                    <Col  md="3" sm="6" xs="12" className="text-capitalize">
                      <b>{userKey.replace(/\d+/g, "").replace("_", " ")}</b>
                    </Col>
                    <Col md="3" sm="6" xs="12" className="text-capitalize">
                      {role?.name}
                    </Col>
                  </React.Fragment>
                ));
              }
            })}
            <Col md="3" xs="12" sm="6" className="mt-1 text-capitalize">
              <b>Available</b>
            </Col>
            <Col md="3" xs="12" sm="6" className="mt-1 text-capitalize">
              <Switch onChange={handleChange} checked={switchState} />
            </Col>
          </Row>
        )}
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