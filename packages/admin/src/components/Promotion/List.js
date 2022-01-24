import React from "react";
import RemoteTable from "@evenlogics/whf-remote-table";
import { Card, CardBody } from "reactstrap";
import { Header } from "@evenlogics/whf-ra-components";





const VendorsList = () => {

  // const [target, setTarget] = useState("branches");

	// const companiesChangeHandler = (data) => {
	//   console.log(data, "lll");
	//   setTimeout(() => {
	// 	setTarget(`branches/${data.value}/all`);
	//   }, 0);
	// };

  const filters = {
    // company_id: {
    //   type: "advanceSelect",
    //   label: "Company",
    //   target: 'companies?limit=1000',
    // //   async: true,
    //   name: "company_id",
    //   optionValue: 'id',
    //   optionLabel: 'name',
    //   required: true,
    //   col: 12 + ' col-xl-3 mt-2',
    //   callback: (data) => companiesChangeHandler(data)
    // },
    branch_id: {
      type: "advanceSelect",
      label: "Branch",
      target: 'branches',
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
      dataField: "username",
      text: "username",
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
      dataField: "branch.phone1",
      text: "Branch Phone",
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
      dataField: "description",
      text: "Description",
      align: "center",
      sort: true,
    },
    {
      dataField: "valid_from",
      text: "valid_from",
      align: "center",
      sort: true,
    },
    {
      dataField: "valid_till",
      text: "valid_till",
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
              hideDetail={false}
              hideDelete={false}
              addRoute="/promotions/add"
              filters={filters}
              showAdvanceFilters={true}
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

export default VendorsList;
