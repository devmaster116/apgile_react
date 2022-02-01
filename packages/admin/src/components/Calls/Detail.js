
import React,{useEffect} from "react";
import { Card, CardBody } from "reactstrap";
// import Accordion from "react-bootstrap/Accordion";
// import CustomAccordion from "../CustomAccordion";
import { Header } from "@evenlogics/whf-ra-components";
import api from "@evenlogics/whf-api";

const Detail = (props) => {

	// const [callDetail, setCallDetail] = useState([]);

	useEffect(() => {
		api.request("get",`/call-logs/detail/${props.match.params.id}`)
        .then(({data}) => {
			console.log(data,"data")
			// setCallDetail(data)
        })
        .catch((error) => console.log(error));

	}, [props.match.params.id])


  return (
    <Card className="animated fadeIn">
      <Header title="Call Details" />
      <CardBody>
       

        {/* <Accordion defaultActiveKey="1">
        <CustomAccordion tabId="1" title="General Detail" data={callDetail}/>
        <CustomAccordion tabId="2" title="Branch Detail" data={callDetail?.location?.branch} />
        <CustomAccordion tabId="3" title="Location Detail" data={callDetail?.location}/>
        </Accordion> */}
        {/* <CustomAccordion tabId="4" title="Location Detail"/> */}

        {/* <p>Hello</p> */}
      </CardBody>
    </Card>
  );
};

export default Detail;
