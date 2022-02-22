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

	// const companiesChangeHandler = (data) => {
	//   setTimeout(() => {
	// 	setTarget(`branches/${data.value}/all`);
	//   }, 0);
	// };

  const changeStatus = (data) => {
    console.log(data,"data")
    api.request("post",`/${props.branchId}/status/${data?.id}`)
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
      dataField: "title",
      text: "Title",
      align: "center",
      sort: true,
    },

    // {
    //   dataField: "user.full_name",
    //   text: "full_name",
    //   align: "center",
    //   sort: true,
    // },
    // {
    //   dataField: "branch.name",
    //   text: "Branch",
    //   align: "center",
    //   sort: true,
    // },
    {
      dataField: "category.title",
      text: "Category",
      align: "center",
      sort: true,
    },
    // {
    //   dataField: "branch.phone1",
    //   text: "Branch Phone",
    //   align: "center",
    //   sort: true,
    // },



    {
      dataField: "description",
      text: "Description",
      align: "center",
      sort: true,
    },

    // {
    //   dataField: "valid_from",
    //   text: "Valid From",
    //   align: "center",
    //   sort: true,
    // },
    // {
    //   dataField: "valid_till",
    //   text: "Valid Till",
    //   align: "center",
    //   sort: true,
    // },

    {
      isDummyField: true,
      align: "center",
      text: "Status",
      sort: true,
      formatter: (cell, row) => {
        return (
          <Button color={row?.status_id ? "success" : "danger"} onClick={()=>changeStatus(row)}>
            {row?.status_id === 0 ? "Active" : "Inactive"}
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
