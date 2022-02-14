import React,{useState,useEffect} from "react";
import { FormGenerator } from "@evenlogics/whf-form-generator";
import { Card, CardBody } from "reactstrap";
import { Header } from "@evenlogics/whf-ra-components";
import api from "@evenlogics/whf-api";
import {connect} from "react-redux";


const Add = (props) => {

  // const [targetPoint, setTargetID] = useState(`items/19/pages`);
  const { id } = props.match.params;
  const [options, setOptions] = useState([]);


  useEffect(() => {
    console.log("working render");
  }, [options]);
  


  const handleTarget = (row,col)=> {
    
     console.log(col?.value,'kkk');
     api.request("get",`/items/${col?.value}/pages`)
        .then(({data}) => {
            console.log(data,"item data")
           let optionsArr =  data?.map((detail)=>(
                {value:detail?.id,label:detail?.name}
            ))
            setOptions(optionsArr)
        })
        .catch((error) => console.log(error));
 
   
  } 

  console.log(options,"options");
  let fields = {
    name: {
      type: "text",
      label: "Name",
      required: true,
      name: "name",
      col: 4,
    },

    description: {
      type: "text",
      label: "Description",
      // required: true,
      name: "description",
      col: 4,
    },

    // branch_id: {
    //   type: "advanceSelect",
    //   label: "Select Branch",
    //   target:`owner/${props.companyId}/all`,
    //   name: "branch_id",
    //   col: 4,
    //   required: true,
    // },
    user_id: {
      type: 'advanceSelect',
      label: "Users",
      target: 'users',
      optionLabel: 'username',
      required: true,
      // async: true,
      multi:true,
      name: 'user_id',
      col: 4
  },
    area: {
      type: "dynamicFields",
      condition: true,
      label: "Area",
      name: "area",
      col: 4,
      schema: {
        // item_id: {
        //   type: "advanceSelect",
        //   label: "Select Item Type",
        //   required:true,
        //   target: "items",
        //   name: "item_id",
        //   col: 6,
        //   optionValue: 'id',
        //   optionLabel: 'name',
        //   async:true,
        //   callback : (row,col) => handleTarget(row,col)
        // },
        page_id: {
          type: "advanceSelect",
          label: "Item#",
          name: "page_id",
          // target:targetPoint,
          required: true,
          // key:'target',
          // optionValue: 'id',
          // optionLabel: 'name',
          options: options,
          col: 6,
          // async:true
        },
    
      },
    },
    message_box: {
      type: "switch",
      label: "Message",
      name: "message_box",
      required: true,
      col: 2,
    },
    customer_required: {
      type: "switch",
      label: "Customer Required",
      required: true,
      name: "customer_required",
      col: 2,
    },
  };

  return (
    <div>
      <Card className="animated fadeIn">
        <Header title="Add New Area"/>
        <CardBody>
          <FormGenerator
            targetEntity="areas"
            // getValues={this.handleValue}
            fields={fields}
            targetId={id}
            name="areas"
            repeater={true}
            // initialValues={props.location.aboutProps}
            redirect="/area"
            // handleSameValueFields={["name"]}
          />
        </CardBody>
      </Card>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    branchId : state.selectedBranchId,
    companyId : state.companyId,

    }
}


export default connect(mapStateToProps,null)(Add);