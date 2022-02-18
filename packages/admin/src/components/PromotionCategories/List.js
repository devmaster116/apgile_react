import React,{useState} from "react";
import RemoteTable from "@evenlogics/whf-remote-table";
import { Card, CardBody } from "reactstrap";
import { Header } from "@evenlogics/whf-ra-components";


const List = () => {

  const [target, setTarget] = useState("branches");

	const companiesChangeHandler = (data) => {
	  setTimeout(() => {
		setTarget(`branches/${data.value}/all`);
	  }, 0);
	};

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
      dataField: "sub_title",
      text: "Sub Title",
      align: "center",
      sort: true,
    },
    
    {
      dataField: "branch.name",
      text: "Branch",
      align: "center",
      sort: true,
    },
  

    
   
  ];
  return (
    <div>
      <div>
        <Card className="animated fadeIn">
          <Header title="All Categories" />
          <CardBody>
            <RemoteTable
              entity="categories"
              customEntity="categories"
              columns={columns}
              sort={defaultSorted}
              hideEdit={false}
              hideDetail={true}
              hideDelete={false}
              addRoute="/categories/add"
              // Query={query}
              filters={filters}
              showAdvanceFilters={true}

            />
          </CardBody>
        </Card>
      </div>
    </div>
  );
};




export default List;