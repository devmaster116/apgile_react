
const initialState = {
  selectedBranchId: null,
  companyName: "TestCompany",
  companyId:null,
  userRole:null,
  phoneMask:null
};

const BranchReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CHANGE_BRANCH":
        console.log(action?.payload,"CHANGE_BRANCH");
      return {
        ...state,
          selectedBranchId : action.payload.value
      };
    case "SET_COMPANY":
      console.log(action?.payload,"SET_COMPANY");
      return {
        ...state,
        companyName : action.payload.name,
        companyId : action.payload.id,
      };
      case "SET_REDUX_DATA" :
      console.log(action?.payload,"SET_REDUX_DATA");
      return {
        ...state,
          selectedBranchId : action.payload.selectedBranchId,
          companyName : action.payload.companyName,
          companyId : action.payload.companyId,
          userRole : action.payload.userRole,
          phoneMask : action.payload.phoneMask,
      };

    default:
      return state;
  }
};

export default BranchReducer;
