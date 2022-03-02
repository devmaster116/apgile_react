import React, { useState, useEffect } from "react";
import { Card, CardBody, Row, Col } from "reactstrap";
import { Header } from "@evenlogics/whf-ra-components";
import api from "@evenlogics/whf-api";
import { Spinner } from "react-bootstrap/";

const Detail = (props) => {
  let { id } = props?.match?.params;

  const [userData, setUserData] = useState([]);
  const [Loader, setLoader] = useState(false);

  useEffect(() => {
    setLoader(true);
    api
      .request("get", `/users/${id}`)
      .then(({ data }) => {
        console.log(data, "data");
        setUserData(data);
        setLoader(false);
      })
      .catch((error) => console.log(error));
  }, [id]);

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
            {Object.keys(userData)?.map(
              (userKey, index) => {
                if (Array.isArray(userData[userKey]) === false){
                 return <React.Fragment key={index}>
                { typeof userData[userKey] !== 'number' && userData[userKey] !== null && userKey !== 'gender_id' && userData[userKey] !== "" && userKey !== "is_online"  && userKey !== "title" && userKey !== "title_name" && <Col
                      xl="2"
                      lg="2" 
                      md="2"
                      sm="2"
                      className="mt-3 text-capitalize"
                    >
                      <b>{userKey?.replace(/\d+/g, "").replace("_", " ")}</b>
                    </Col>
                }
                {
                    typeof userData[userKey] !== 'number' && userData[userKey] !== null && userKey !== 'gender_id' && userData[userKey] !== "" && userKey !== "is_online"  && userKey !== "title" && userKey !== "title_name" && <>  <Col xl="2" lg="2" md="2" sm="2" className="mt-3">
                    {userData[userKey]}
                  </Col>
                 
                  </>
                }
                    
                  </React.Fragment>
                } else {
                    return userData[userKey].map((role, index) => (
                      <React.Fragment key={index}>
                        <Col xl="2" lg="2" md="2" sm="2" className="mt-3 text-capitalize">
                          <b>{userKey?.replace(/\d+/g, "").replace("_", " ")}</b>
                        </Col>
                        <Col xl="2" lg="2" md="2" sm="2" className="mt-3">
                          {role?.name}
                        </Col>
              
                        
                      </React.Fragment>
                    ))
                  }
              }
            )}
          </Row>
        )}
      </CardBody>
    </Card>
  );
};


export default Detail;
