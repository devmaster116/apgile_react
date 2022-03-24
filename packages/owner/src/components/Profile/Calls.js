import React from "react";
import {Card, CardBody, CardHeader} from "reactstrap";
import RemoteTable from "@evenlogics/whf-remote-table";
import {connect} from "react-redux";


const List = (props) => {
 


    const columns = [
        {dataField: "id",hidden:true, text: "ID", align: "center"},
        {
            dataField: "call.cus_name",
            text: "Customer Name",
            align: "center",
            sort: true,
          
        },
        // {
        //     dataField: "calls.page.name",
        //     text: "Area",
        //     align: "center",
        //     sort: true,
        // },
        {
            dataField: "call.location.name",
            text: "Location",
            align: "center",
            sort: true,
        },
        {
            dataField: "call.message",
            text: "Message",
            align: "center",
            sort: true,
        },
       

        // {
        //     isDummyField: true,
        //     text: "Completed At",
        //     align: "center",
        //     sort: true,
        //     formatter: (cell, row) => {
        //         if(row?.completed_at){
        //             var now = new Date(row?.completed_at);
        //             now.setSeconds(0, 0);
        //             var stamp = now
        //               .toISOString()
        //               .replace(/T/, " ")
        //               .replace(/:00.000Z/, "");
        //             console.log(stamp)
        //             return (
        //                     <span className="badge badge-dark">
        //                          {stamp}
        //                     </span>
                            
        //             )
        //         }
               
        //     },
        // },
    
        {
            dataField: "call.status",
            text: "Status",
            align: "center",
            sort: true,
        },
      
    ];

    const defaultSorted = [
        {
            dataField: "id",
            order: "asc",
        },
    ];

    return (
        <div className="animated">
            <Card>
                <CardHeader>
                    <strong>Call List</strong>
                </CardHeader>
                <CardBody>
                    <RemoteTable
                        entity={`${props.branchId}/user-calls`}
                        customEntity={`${props.branchId}/user-calls`}
                        columns={columns}
                        sort={defaultSorted}
                        hideEdit={true}
                        hideDetail={false}
                        hideActionCol={ true }
                        // customButton={{
                        //     name: "Assigned Call",
                        //     color: "warning",
                        //     classes:"text-white",
                        //     callback: (data) => props?.history?.push({
                        //         pathname: `/calls/${data?.id}/assigned`,
                        //         state: data?.location.id
                        //     })
                        //   }}
                        // Query={query}

                    />
                </CardBody>
            </Card>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        branchId: state.selectedBranchId,
        companyName: state.companyName,
        companyId: state.companyId,
        userRole: state.userRole
    }
}

export default connect(mapStateToProps, null)(List);
