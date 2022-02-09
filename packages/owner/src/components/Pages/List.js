import React, { useState, useEffect } from "react";
import RemoteTable from "@evenlogics/whf-remote-table";
import { Card, CardBody, Button } from "reactstrap";
import { Header } from "@evenlogics/whf-ra-components";
import { Modal, Spinner } from "react-bootstrap/";
import api from "@evenlogics/whf-api";
import {connect} from "react-redux";

const VendorsList = (props) => {

  const [show, setShow] = useState(false);
  const [pages, setPages] = useState(false);
  const [Loader, setLoader] = useState(false);
  // const [branchTarget, setBranchTarget] = useState('branches?limit=1000');
  // const [itemTypeTarget, setItemTypeTarget] = useState('items?limit=1000');
  const [ID, setID] = useState(0);
  const [companyID, setCompanyID] = useState(null)
  const [branchID, setBranchID] = useState(null)
	const [userRole, setUserRole] = useState(null)
  const [query, setQuery] = useState(false)


  useEffect(() => {
    let bool = true;
    if (ID !== 0) {
       setLoader(bool)
        api.request("get", `/pages/${ID}`)
          .then(({ data }) => {
            setPages(data)
            setShow(true);
            setTimeout(() => {
              setLoader(false)
            }, 3000);
          })
          .catch((error) => console.log(error));
    }
  }, [ID])

  useEffect(() => {
    let ls =  JSON.parse(localStorage.getItem('currentUser'));
    let roled = ls?.roles?.map(role => setUserRole(role));
    setUserRole(roled)
    console.log(roled);
    setBranchID(ls?.branch?.id); 
    setCompanyID(ls?.branch?.company_id);
    setQuery(!query);
    console.log(companyID,"companyID");
 },[props?.BranchID]);


// const filters = {
//   company_id: {
//     type: 'advanceSelect',
//     optionValue: 'id',
//     optionLabel: 'name',
//     label: "Company",
//     target: 'companies?limit=1000',
//     async: true,
//     name: "company_id",
//     callback:(data,col)=>{
//       setTimeout(() => {
//       console.log(col,"data")
//       setBranchTarget(`branches?limit=1000&company_id=${col?.value}`)
//     }, 0)}
//     // required: true,

//   },
//   branch_id: {
//     type: "advanceSelect",
//     label: "Branch",
//     target: branchTarget,
//     callback:(data,col)=>{setItemTypeTarget(`items?limit=1000?item_type_id=${col?.value}`)},
//     async: true,
//     name: "branch_id",
//     // required: true,

//   },
//   item_type: {
//     type: "advanceSelect",
//     label: "Item",
//     target: itemTypeTarget,
//     async: true,
//     name: "item_type",
//     // required: true,

//   },
// }


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
      text: "Name",
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
      dataField: "total_calls",
      text: "Total Calls",
      align: "center",
      sort: true,
    },
    {
      dataField: "location.name",
      text: "Location",
      align: "center",
      sort: true,
    },

    {
      dataField: "location.branch.name",
      text: "Branch Name",
      align: "center",
      sort: true,
    },
    {
      dataField: "last_used",
      text: "Last Call",
      align: "center",
      sort: true,
    },


    
    {
      isDummyField: true,
      align: "center",
      text: "QR Code",
      sort: true,
      formatter: (cell, row) => {
        return (
        <Button color="primary" onClick={() => {
         setID(row?.id)
          }}
          >
            View QR Code
          </Button>
        );
      },
    },

  
  ];

  const downloadPdf = () => {
    // console.log(pages?.qr_code?.url,"ll");
    var link = document.createElement('a');
    link.href = pages?.qr_code?.url?.url;
    link.download = 'file.pdf';
    link.dispatchEvent(new MouseEvent('click'));
  }


  return (
    <div>
      <div>
        <Card className="animated fadeIn">
          <Header title="All QR Codes" />
          <CardBody>
            <RemoteTable
              entity={userRole?.includes("supervisor") ? `pages?branch_id=${branchID}` : props?.BranchID !== null ? `pages?branch_id=${props?.BranchID}`:`pages`}
              customEntity={userRole?.includes("supervisor") ? `pages?branch_id=${branchID}` : props?.BranchID !== null ? `pages?branch_id=${props?.BranchID}`:`pages`}
              columns={columns}
              sort={defaultSorted}
              hideEdit={true}
              hideDetail={true}
              disableDelete={userRole?.includes("supervisor") ? true : false}
              // addRoute="/pages/page/add"

                customButton={{
                  name: "Download PDF",
                  color: "warning",
                  callback: downloadPdf,
                }}
                // filters={ userRole?.includes("supervisor") ? null : filters}
                showAdvanceFilters = {true}
                Query={query}
              //   query={queryParams}
            />

            <Modal
              style={{ textAlign: "center" }}
              show={show}
              onHide={() => setShow(false)}
              aria-labelledby="contained-modal-title-vcenter"
              centered
            >
              {Loader ? (
                <Spinner animation="border" role="status" className="mx-auto">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              ) : (
                <>
                  <img
                    className="mx-auto"
                    width={400}
                    height={360}
                    alt="background"
                    src={pages?.qr_code?.url}
                  ></img>
                  <p><b>{pages?.description}</b></p>
                </>
              )}
            </Modal>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
     BranchID : state.selectedBranchId
    }
}


export default connect(mapStateToProps,null)(VendorsList);
