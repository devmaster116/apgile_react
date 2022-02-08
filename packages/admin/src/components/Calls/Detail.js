
import React from "react";
import { Card, CardHeader,CardBody } from "reactstrap";
import RemoteTable from "@evenlogics/whf-remote-table";




const Detail = (props) => {

  const columns = [
    { dataField: "id", text: "ID", align: "center", sort: true },
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
      dataField: "id",
      order: "asc",
    },
  ];


	// const [callDetail, setCallDetail] = useState([]);

	// useEffect(() => {
  //   api
  //     .request("get", `/call-logs/detail/${props.match.params.id}`)
  //     .then(({ data }) => {
  //       console.log(data, "data");
  //       setCallDetail(data);
  //     })
  //     .catch((error) => console.log(error));
  // }, [props.match.params.id]);


  return (
    // <Card className="animated fadeIn">
    //   <Header title="Call Details" />
    //   <CardBody>
    //     <Row>
    //       {callDetail?.map((call) => (
    //         <>
    //           <Col xl="3">
    //             <b>Call ID</b>
    //           </Col>
    //           <Col xl="3">{call?.call_id}</Col>

    //           <Col xl="3">
    //             <b>Action</b>
    //           </Col>
    //           <Col xl="3">{call?.action_title}</Col>

    //           <Col xl="3">
    //             <b>Call Created</b>
    //           </Col>
    //           <Col xl="3">{call?.created_at}</Col>

    //           <Col xl="3">
    //             <b>Assigned To</b>
    //           </Col>
    //           <Col xl="3">{call?.target_user_name}</Col>
    //           <br />
    //           <br />
    //           <br />
    //         </>
    //       ))}
    //     </Row>
    //   </CardBody>
    // </Card>
    <div className="animated">
      <Card>
        <CardHeader>
          <strong>Call Detail</strong>
        </CardHeader>
        <CardBody>
          <RemoteTable
            entity={`call-logs/detail/${props.match.params.id}`}
            customEntity={`call-logs/detail/${props.match.params.id}`}
            columns={columns}
            sort={defaultSorted}
            hideActionCol={true}
            // hideDetail={true}
            // filters={filters}
            // showAdvanceFilters = {true}
            // addRoute="/call/add"
            //   {props.remoteTableFields}
            // customButton={{
            //   name: "Assigned Call",
            //   color: "warning",
            //   callback: (data) => props?.history?.push(`/calls/${data?.id}/assigned`),
            // }}
          />
        </CardBody>
      </Card>
    </div>
  );
};

export default Detail;
