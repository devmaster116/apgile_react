import React,{ useEffect} from "react";
import { FormGenerator } from "@evenlogics/whf-form-generator";
import { Card, CardBody } from "reactstrap";
import { Header } from "@evenlogics/whf-ra-components";
import {connect} from "react-redux";

const Add = (props) => {

  useEffect(() => {
  }, [props.branchId]);


const {id} = props.match.params;
  let fields = {
    title: {
      type: "text",
      label: "Title",
      required: true,
      name: "title",
      col: 4,
    },
    headline: {
      type: "text",
      label: "Headline",
      required: true,
      name: "headline",
      col: 4,
    },
    link: {
      type: "text",
      label: "Link",
      required: true,
      name: "link",
      col: 4,
    },
    description: {
      type: "text",
      label: "Description",
      // required: true,
      name: "description",
      col: 4,
    },
    category_id: {
      type: "advanceSelect",
      label: "Select Category",
      target: `${props.branchId}/categories`,
      optionLabel: "title",
      name: "category_id",
      async:true,
      col: 4,
      required: true,
    },
    valid_from: {
      type: "date",
      dateFormat:'yyyy/MM/dd',
      label: "Valid From",
      name: "valid_from",
      // required: true,
      col: 4,
    },

    valid_till: {
      type: "date",
      dateFormat:"yyyy/MM/dd",
      label: "Valid Until",
      name: "valid_till",
      // required: true,
      col: 4,
    },
    promotion_image: {
      type: "filePic",
      label: "Promotion Image",
      name: "promotion_image",
      // required: true,
      col: 4,
    },
  };
 const extraVal = id ? {
  _method : "PUT",
   branch_id:props.branchId
  } : {
   branch_id:props.branchId
  };
  return (
    <div>
      <Card className="animated fadeIn">
        <Header title="Add New Promotion" />
        <CardBody>
          <FormGenerator
            targetEntity={`${props.branchId}/promotions`}
            fields={fields}
            targetId={id}
            name="promotions"
            // getInitialValues={this.getInitialValues}
            // debug={false}
            extraVals={extraVal}
            // extraVals={{branch_id:props.branchId}}
            redirect="promotions"
          />
        </CardBody>
      </Card>
    </div>
  );
};

const mapStateToProps = state => {
  return {
       branchId : state.selectedBranchId,
       companyName : state.companyName,
       companyId : state.companyId,
       userRole : state.userRole
    }
}


export default connect(mapStateToProps,null)(Add);