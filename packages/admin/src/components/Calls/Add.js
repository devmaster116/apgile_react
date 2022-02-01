import React,{useState,useEffect} from "react";
import { FormGenerator } from "@evenlogics/whf-form-generator";
import { Card, CardBody } from "reactstrap";
import { Header } from "@evenlogics/whf-ra-components";
import api from "@evenlogics/whf-api";


const Add = (props) => {
    const { id } = props.match.params;

 const [targetUser, setTargetUser] = useState([]);
 const [action_user, setAction_user] = useState();
useEffect(() => {
    let ls =  JSON.parse(localStorage.getItem('currentUser'));
    setAction_user(ls?.id);
    api.request("get",`/calls/${id}`)
    .then(({data}) => {
        console.log(data,"data")
        setTargetUser(data?.users?.map((user)=>({value:user?.id?.toString(),label:user?.username})))
    })
    .catch((error) => console.log(error));
}, []);



  console.log(id,"id");
  console.log(targetUser,"targetUser");

  let fields = {
    target_user: {
      type: "advanceSelect",
      label: "Select Staff",
      target:'users',
      optionLabel:'username',
      optionId:'id',
    //   multi:true,
    //   name: "target_user",
      col: 3,
    //   required: true,
    },
    action_id: {
      type: "advanceSelect",
      label: "Action Status",
      target: "call-logs/status-list",
      name: "action_id",
      col: 3,
      required: true,
    },


  };

  return (
    <div>
      <Card className="animated fadeIn">
        <Header title="Assigned Call" />
        <CardBody>
          <FormGenerator
            targetEntity="call-logs"
            fields={fields}
            name="call-logs"
            repeater={true}
            redirect="calls"
            extraVals={{
                call_id:id,
                action_by:action_user
            }}
          />
        </CardBody>
      </Card>
    </div>
  );
};

export default Add;
