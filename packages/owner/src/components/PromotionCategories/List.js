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
    api.request("put",`/${props.branchId}/category/status/${data?.id}`,payload)
    .then((data) => {
        console.log(data)
        setQuery(!query)
    })
    .catch((error) => console.log(error));
  }

  const filters = {
   call_status:{
       type: "advanceSelect",
       label: "Select Status",
       target: `${props.branchId}/call/status-list`,
       optionLabel: 'name',
       optionId: 'id',
       async: true,
       col: 12 + ' col-sm-3  ',
   },
  
}
  const defaultSorted = [{ dataField: "title", order: "desc" }];
  const columns = [
    // {
    //   dataField: "id",
    //   text: "ID",
    //   align: "center",
    //   sort: true,
    // },
    {
      dataField: "name",
      text: "Name",
      align: "center",
      sort: true,
    },
    {
      dataField: "title",
      text: "Title",
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
          <Button color={row?.status === 1 ? "success" : "danger"} onClick={()=>changeStatus(row)}>
            {row?.status === 1 ? "Active" : "Inactive"}
          </Button>
        );
      },
    },


  ];
  return (
    <div>
      <div>
        <Card className="animated fadeIn">
          <Header title="All Categories" />
          <CardBody>
            <RemoteTable
              entity={`${props?.branchId}/categories`}
              customEntity={`categories`}
              columns={columns}
              sort={defaultSorted}
              hideEdit={false}
              hideDetail={true}
              hideDelete={false}
							{...props.remoteTableFields}
              addRoute="/categories/add"
              Query={query}
              filters={filters}
              showAdvancedFilters={true}

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
    }
}


export default connect(mapStateToProps,null)(List);
