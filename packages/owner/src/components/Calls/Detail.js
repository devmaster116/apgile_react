
// import React,{useEffect,useState} from "react";
// import { Card, CardBody } from "reactstrap";
// import Accordion from "react-bootstrap/Accordion";
// import CustomAccordion from "../CustomAccordion";
// import { Header } from "@evenlogics/whf-ra-components";
// import api from "@evenlogics/whf-api";

// const Detail = (props) => {

// 	const [callDetail, setCallDetail] = useState([]);

// 	useEffect(() => {
// 		api.request("get",`/calls/${props.match.params.id}`)
//         .then(({data}) => {
// 			console.log(data,"data")
// 			setCallDetail(data)
//         })
//         .catch((error) => console.log(error));

// 	}, [props.match.params.id])


//   return (
//     <Card className="animated fadeIn">
//       <Header title="Call Details"/>
//       <CardBody>
//         <Accordion defaultActiveKey="1">
//         <CustomAccordion tabId="1" title="General Detail" data={callDetail}/>
//         <CustomAccordion tabId="2" title="Branch Detail" data={callDetail?.location?.branch} />
//         <CustomAccordion tabId="3" title="Location Detail" data={callDetail?.location}/>
//         {/* <CustomAccordion tabId="4" title="Location Detail"/> */}
//         </Accordion>
//       </CardBody>
//     </Card>
//   );
// };

// export default Detail;



import React from "react";
import { Card, CardHeader,CardBody } from "reactstrap";
import RemoteTable from "@evenlogics/whf-remote-table";
import {connect} from "react-redux";

const Detail = (props) => {
  const columns = [
    // { dataField: "id", text: "ID", align: "center", sort: true },
    {
      dataField: "call_id",
      text: "Call ID",
      align: "center",
      sort: true,
    },
    {
      dataField: "action_title",
      text: "Action Status",
      align: "center",
      sort: true,
    },
   
    {
      dataField: "created_at",
      text: "Created On",
      align: "center",
      sort: true,
    },
    {
      dataField: "target_user_name",
      text: "Assigned To",
      align: "center",
      sort: true,
    },
    {
      dataField: "action_by_name",
      text: "Action By",
      align: "center",
      sort: true,
    },

  
  ];

  const defaultSorted = [
    {
      dataField: "call_id",
      order: "asc",
    },
  ];


  return (
    <div className="animated">
      <Card>
        <CardHeader>
          <strong>Call Detail</strong>
        </CardHeader>
        <CardBody>
          <RemoteTable
            entity={`${props.branchId}/call-logs/detail/${props.match.params.id}`}
            customEntity={`${props.branchId}/call-logs/detail/${props.match.params.id}`}
            columns={columns}
            sort={defaultSorted}
            hideActionCol={true}
          />
        </CardBody>
      </Card>
    </div>
  );
};


const mapStateToProps = state => {
  return {
      branchId: state.selectedBranchId,
  }
}

export default connect(mapStateToProps, null)(Detail);
