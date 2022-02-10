
const initialState = {
  selectedBranchId: null,
  companyName: "TestCompany",
  companyId:null,
  userRole:null
};

const BranchReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CHANGE_BRANCH":
        console.log(action?.payload,"CHANGE_BRANCH");
      return {
        ...state,
          selectedBranchId : action.payload.value,         
          // companyName : action.payload.companyName,         
          // companyId : action.payload.companyId,         
          // userRole : action.payload.userRole,         
      };
      case "SET_REDUX_DATA" : 
      console.log(action?.payload,"SET_REDUX_DATA");
      return {
        ...state,
          // selectedBranchId : action.payload.value,         
          companyName : action.payload.companyName,         
          companyId : action.payload.companyId,         
          userRole : action.payload.userRole,         
      };

    default:
      return state;
  }
};

export default BranchReducer;
