
const initialState = {
  selectedBranchId: 0,
  companyName: "TestCompany"
};

const BranchReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CHANGE_BRANCH":
        console.log(action?.payload,"paylaod");
      return {
          selectedBranchId : action.payload.value,
          companyName : action.payload.label,
      };

    default:
      return state;
  }
};

export default BranchReducer;
