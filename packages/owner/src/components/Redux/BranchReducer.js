
const initialState = {
  selectedBranchId: null,
  companyName: "TestCompany",
  companyId:null,
  userRole:null,
  phoneMask:null,
  branches:[],
};

const BranchReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CHANGE_BRANCH":
      return {
        ...state,
          selectedBranchId : action.payload.value
      };
    case "SET_COMPANY":
      return {
        ...state,
        companyName : action.payload.name,
        companyId : action.payload.id,
      };
      case "SET_BRANCHES":
        return {
          ...state,
          branches : action.payload,
        };

      case "SET_REDUX_DATA" :
      return {
        ...state,
          selectedBranchId : action.payload.selectedBranchId,
          companyName : action.payload.companyName,
          companyId : action.payload.companyId,
          userRole : action.payload.userRole,
          phoneMask : action.payload.phoneMask,
      };
      case "SET_PHONE_MASK" :
        console.log(action.payload,"payload")
        return {
          ...state,
            phoneMask : action.payload,
        };

    default:
      return state;
  }
};

export default BranchReducer;
