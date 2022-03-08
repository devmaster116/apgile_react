import React, { useEffect,useState } from 'react';
import { Card, CardBody, CardHeader,Button } from 'reactstrap';
import RemoteTable from '@evenlogics/whf-remote-table';
import {connect} from "react-redux";
import api from "@evenlogics/whf-api";
import { toast } from 'react-toastify';


const KithcenCallList  = (props) => {
	const [query, setQuery] = useState(false);
	useEffect(() => {
		setQuery((prev)=>!prev)
	}, [props.branchId]);

	const deleteUser = (id) => {
		console.log(id,"id")
		api.request("delete", `/${props?.branchId}/kitchen-call/${id}`)
		.then((data) => {
		  console.log(data.message,"message")
		  toast.success(data.message)
		  setQuery(!query)
		  },3000)
		  .catch((error) =>{
			 toast.error(`Error ! ${error.response.data.message}`)
		  }
			)
		}

		const columns = [
      // {
      // 	dataField: 'id',
      // 	text: 'ID',
      // 	align: 'center',
      // 	sort: true
      // },

      {
        isDummyField: true,
        text: "Time Call Created",
        align: "center",
        sort: true,
        formatter: (cell, row) => {
          if (row?.created_at) {
            return <span className="badge badge-dark">{row?.created_at}</span>;
          }
        },
      },
    
      {
        dataField: "call.staff_name",
        text: "Staff Member",
        align: "center",
        sort: true,
      },
      {
        dataField: "location_name",
        text: "Location",
        align: "center",
        sort: true,
      },
      {
        dataField: "action",
        text: "Status",
        align: "center",
        sort: true,
      },
      {
        dataField: "",
        text: "Received At",
        align: "center",
        sort: true,
      },

      {
        isDummyField: true,
        align: "center",
        text: "Action",
        sort: true,
        formatter: (cell, row) => {
          console.log(row, "row");
          return (
            <div className="button-tables">
              <Button
                size="sm"
                color="danger"
                className="mx-auto"
                onClick={() => {
                  deleteUser(row?.id);
                }}
              >
                Delete
              </Button>

              {row?.call?.status_id !== 8 && (
                <Button
                  size="sm"
                  className="mx-auto text-white"
                  color="warning"
                  onClick={() => reverseCall(row.id)}
                >
                  Reverse Call
                </Button>
              )}
            </div>
          );
        },
      },
    ];

	

		if (props.extendedFields) {
			props.extendedFields.forEach(field => columns.push(field))
		}

		const defaultSorted = [
			{
				dataField: 'location_name',
				order: 'desc'
			}
		];
		const reverseCall = (id) => {
			console.log(id,"data")
			api.request("patch",`/${props?.branchId}/kitchen-call/${id}`).then(() => { setQuery(!query)}).catch((error) => console.log(error));
		  }
		return (
			<div className="animated">
				<Card>
					<CardHeader>
						<strong>Kitchen Calls List</strong>
					</CardHeader>
					<CardBody>
						<RemoteTable
							entity={props.userRole === "supervisor" ? `${props?.branchId}/supervisor-kitchen-calls` : `${props?.branchId}/kitchen-call`}
							customEntity={`kitchen-call`}
							columns={columns}
							sort={defaultSorted}
							hideDetail={true}
							hideEdit={true}
							// addRoute="/kitchen-call/add"
							{...props.remoteTableFields}
							Query={query}
							hideActionCol={true}
							// customButton={{
							// 	name: "Reverse Call",
							// 	color: "warning",
							// 	classes:"text-white",
							// 	callback: (data) => {reverseCall(data)}

							//   }}
							// customEditLink = {`locations/:id/edit`}
						/>
					</CardBody>
				</Card>
			</div>
		);

}

const mapStateToProps = state => {
    return {
        branchId : state.selectedBranchId,
       companyName : state.companyName,
       companyId : state.companyId,
       userRole : state.userRole
      }
}

export default connect(mapStateToProps,null)(KithcenCallList);

