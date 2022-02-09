
const initialState = {
  selectedBranchId: null,
  companyName: "TestCompany"
};

const BranchReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CHANGE_BRANCH":
        console.log(action?.payload,"paylaod");
      return {
        ...state,
          selectedBranchId : action.payload.value,         
      };

    default:
      return state;
  }
};

export default BranchReducer;
