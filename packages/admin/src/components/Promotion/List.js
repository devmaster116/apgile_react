import React,{useState} from "react";
import RemoteTable from "@evenlogics/whf-remote-table";
import { Card, CardBody,Button } from "reactstrap";
import { Header } from "@evenlogics/whf-ra-components";
import api from "@evenlogics/whf-api";


const List = () => {

  const [target, setTarget] = useState("branches");
  const [query, setQuery] = useState(false);

	const companiesChangeHandler = (data) => {
	  setTimeout(() => {
		setTarget(`branches/${data.value}/all`);
	  }, 0);
	};

  const changeStatus = (data) => {
    console.log(data,"data")
    api.request("get",`/status/${data?.id}`)
    .then((data) => {
        console.log(data)
        setQuery(!query)
    })
    .catch((error) => console.log(error));
  }

  const filters = {
    company_id: {
      type: "advanceSelect",
      label: "Company",
      target: 'companies?limit=1000',
      name: "company_id",
      optionValue: 'id',
      optionLabel: 'name',
      required: true,
      col: 12 + ' col-xl-3 mt-2',
      callback: (data) => companiesChangeHandler(data)
    },
    branch_id: {
      type: "advanceSelect",
      label: "Branch",
      target: target,
      async: true,
      name: "branch_id",
      optionValue: 'id',
      optionLabel: 'name',
      required: true,
      col: 12 + ' col-xl-3 mt-2',
      }
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
    {
      dataField: "category.title",
      text: "Category",
      align: "center",
      sort: true,
    },
    {
      dataField: "branch.name",
      text: "Branch",
      align: "center",
      sort: true,
    },
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
    {
      dataField: "description",
      text: "Description",
      align: "center",
      sort: true,
    },
    {
      dataField: "valid_from",
      text: "Valid From",
      align: "center",
      sort: true,
    },
    {
      dataField: "valid_till",
      text: "Valid Till",
      align: "center",
      sort: true,
    },
    
   
  ];
  return (
    <div>
      <div>
        <Card className="animated fadeIn">
          <Header title="All Promotions" />
          <CardBody>
            <RemoteTable
              entity="promotions"
              customEntity="promotions"
              columns={columns}
              sort={defaultSorted}
              hideEdit={false}
              hideDetail={true}
              hideDelete={false}
              addRoute="/promotions/add"
              filters={filters}
              showAdvanceFilters={true}
              Query={query}
            />
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default List;
