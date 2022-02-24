import React,{ useEffect,useState } from "react";
import RemoteTable from "@evenlogics/whf-remote-table";
import { Card, CardBody,Button } from "reactstrap";
import { Header } from "@evenlogics/whf-ra-components";
import {connect} from "react-redux";
import api from "@evenlogics/whf-api";


const List = (props) => {

  const [query, setQuery] = useState(false);
  useEffect(() => {
    setQuery((prev)=>!prev);
  }, [props.branchId]);

  const changeStatus = (data) => {
    console.log(data?.status,"data")
    let payload = {
      status:!data?.status
    }
    api.request("put",`/${props.branchId}/promotion/status/${data?.id}`,payload)
    .then((data) => {
        console.log(data)
        setQuery(!query)
    })
    .catch((error) => console.log(error));
  }

  const defaultSorted = [{ dataField: "id", order: "desc" }];
  const columns = [
    {
      dataField: "id",
      text: "ID",
      align: "center",
      sort: true,
    },
    {
      isDummyField: true,
      align: "center",
      text: "Promotion Banner",
      sort: true,
      formatter: (cell, row) => {
          console.log(row,"row")
        return (
          <img
          width="60"
          height="60"
          style={{borderRadius:"50%",objectFit:"contain"}}
            src={row?.promotion_image?.url}
            alt="logo"
          />
        );
      },
    },
    {
      dataField: "title",
      text: "Title",
      align: "center",
      sort: true,
    },
    
    {
      dataField: "category_sub_title",
      text: "Category",
      align: "center",
      sort: true,
    },
    {
      align: "center",
      text: "Status",
      sort: true,
      formatter: (cell, row) => {
        console.log(row?.status,"status")
        return (
          <Button color={row?.status === 1 ? "danger" : "success"} onClick={()=>changeStatus(row)}>
            {row?.status === 1 ? "Inactive" : "Active"}
          </Button>
        );
      },
    },


  ];
  return (
    <div>
      <div>
        <Card className="animated fadeIn">
          <Header title="All Sections" />
          <CardBody>
            <RemoteTable
              entity={`${props?.branchId}/promotions`}
              customEntity="promotions"
              columns={columns}
              sort={defaultSorted}
              hideEdit={false}
              hideDetail={true}
              hideDelete={false}
              addRoute="/promotions/add"
              Query={query}

            />
          </CardBody>
        </Card>
      </div>
    </div>
  );
};


const mapStateToProps = state => {
  return {
       branchId : state.selectedBranchId,
       companyName : state.companyName,
       companyId : state.companyId,
       userRole : state.userRole
    }
}


export default connect(mapStateToProps,null)(List);
