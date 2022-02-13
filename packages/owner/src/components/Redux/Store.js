import {createStore} from "redux";
import throttle from 'lodash.throttle';
import BranchReducer from "./BranchReducer";
import {loadState, saveState} from "./localStorage";

const persistedState = loadState();
const store = createStore(BranchReducer, persistedState);

store.subscribe(throttle(() => {
    saveState({
        selectedBranchId : store.getState().selectedBranchId,
        // companyName : action.payload.companyName,
        // companyId : action.payload.companyId,
        // userRole : action.payload.userRole,
    });
}, 1000));

export default store;
