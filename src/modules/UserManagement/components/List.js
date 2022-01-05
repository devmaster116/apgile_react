import React,{useState} from "react";
import RemoteTable from "@evenlogics/whf-remote-table";
import { Card, CardBody,Button } from "reactstrap";
import { Header } from "@evenlogics/whf-ra-components";
import api from '@evenlogics/whf-api';
import Swal from 'sweetalert2'


const List = () => {

  const [query, setQuery] = useState(false);

  
const defaultSorted = [{ dataField: "id", order: "desc" }];
const columns = [
  {
    dataField: "id",
    text: "ID",
    align: "center",
    sort: true,
  },
  
  {
    dataField: "name",
    text: "name",
    align: "center",
    sort: true,
  },
  {
    dataField: "supervisor.username",
    text: "Supervisor",
    align: "center",
    sort: true,
  },
  {
    dataField: "supervisor.email",
    text: "supervisor email",
    align: "center",
    sort: true,
  },
  {
    dataField: "supervisor.title",
    text: "supervisor title",
    align: "center",
    sort: true,
  },
  {
    dataField: "supervisor.first_name",
    text: "supervisor first name",
    align: "center",
    sort: true,
  },
  {
    dataField: "supervisor.last_name",
    text: "supervisor last name",
    align: "center",
    sort: true,
  },
  {
    dataField: "supervisor.gender",
    text: "supervisor gender",
    align: "center",
    sort: true,
  },
  {
    dataField: "supervisor.phone1",
    text: "supervisor phone",
    align: "center",
    sort: true,
  },
  
  {
    dataField: "branch.name",
    text: "branch name",
    align: "center",
    sort: true,
  },
  {
    dataField: "branch.phone1",
    text: "branch phone",
    align: "center",
    sort: true,
  },
  {
    dataField: "branch.phone2",
    text: "branch phone",
    align: "center",
    sort: true,
  },
  {
    dataField: 'Action',
    isDummyField: true,
    text: "Action",
    align: 'center',
    sort: true,
    formatter: (cell, row) => {
      console.log(row.status_id, "iddddd");
      return (
          <div>
              {row.status_id !== 1 ? <Button onClick={() => getData(row, 'activate')} className='ml-1 mb-1' variant='success'>Unban</Button> : <Button onClick={() => getData(row, 'ban')} className='ml-1' variant='danger'>Ban</Button>}
          </div>
      )
  },
}
];



  const getData = (data,type,status) => {
    let paylaod = status
    api.request('put',`/staff/account/${data.id}`,paylaod)
        .then((response) => {
            Swal.fire(`User Sucessfully ${type.toUpperCase()}`, "", "success");
            setQuery(!query);
        }).catch(() => {
            Swal.fire("Something Went Wrong", "", "error");
        })
  }

  return (
    <div>
      <div>
        <Card className="animated fadeIn">
          <Header title="All Staffs" />
          <CardBody>
            <RemoteTable
              entity="staffs"
              customEntity="staffs"
              columns={columns}
              sort={defaultSorted}
              hideEdit={false}
              hideDetail={false}
              hideDelete={false}
            //   customButton={{
            //     name: "Download PDF",
            //     color: "warning",
            //     callback: downloadPdf,
            //   }}
            //   Query={query}
            //   query={queryParams}
            />
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default List;
