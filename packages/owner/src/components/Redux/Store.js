import {createStore} from "redux";
import BranchReducer from "./BranchReducer";

const store = createStore(BranchReducer);


export default store;