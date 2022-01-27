import React from "react";
import RemoteTable from "@evenlogics/whf-remote-table";
import { Card, CardBody } from "reactstrap";
import { Header } from "@evenlogics/whf-ra-components";
import api from "@evenlogics/whf-api";


const defaultSorted = [{ dataField: "id", order: "asc" }];
const columns = [
  {
    dataField: "id",
    text: "ID",
    align: "center",
    sort: true,
  },
//   {
//     dataField: "address",
//     text: "Address",
//     align: "center",
//     sort: true,
//   },
  
  {
    dataField: "name",
    text: "Name",
    align: "center",
    sort: true,
  },
  {
    dataField: "phone1",
    text: "Phone",
    align: "center",
    sort: true,
  },
  {
    dataField: "phone2",
    text: "Secondary Number",
    align: "center",
    sort: true,
  },

  
 
];


const List = (props) => {
  const companyLogin = (data) => {
    console.log(data, "lll");
    const payload = {
      username: "ownerjWV",
    };
    api
      .request("post", "/auto-login", payload)
      .then(({data}) => (
        // let oldUser = JSON.parse(localStorage?.getItem('currentUser'));
        // localStorage.setItem('previousUser',JSON.stringify(oldUser));
        // localStorage.setItem('currentUser',JSON.stringify({...data,authToken:data?.api_token.toString()}));
        // window.location.reload("/");
        window.open('#/validateAsOwner/kjfgdgfuilkjhfgdf','_blank',)
        // window.open(`/dummy&name=n`);
        // <Link to="/dummy" />
      //   props.history.push({
      //     pathname: '/dummy',
      //     search: "?" + new URLSearchParams({auth_tokken: "abcdefghijk"}).toString(),
      //     // target:'_blank'
      // })
      ))
      .catch((error) => console.log(error));
  };
  
  return (
    <div>
      <div>
        <Card className="animated fadeIn">
          <Header title="All Companies" />

          <CardBody>
            <RemoteTable
              entity="companies"
              customEntity="companies"
              columns={columns}
              sort={defaultSorted}
              hideEdit={false}
              hideDetail={false}
              hideDelete={false}
              addRoute="/admin/company/add"

              customButton={{
                name: "Login As Owner",
                color: "warning",
                callback: (data) => companyLogin(data),
              }}
              // Query={query}
              // query={queryParams}
            />
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default List;
