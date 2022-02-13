import {createStore} from "redux";
import throttle from 'lodash.throttle';
import BranchReducer from "./BranchReducer";
import {loadState, saveState} from "./localStorage";

const persistedState = loadState();
const store = createStore(BranchReducer, persistedState);

store.subscribe(throttle(() => {
    saveState({
        selectedBranchId : store.getState().selectedBranchId,
        companyName : store.getState().companyName,
        companyId : store.getState().companyId,
        userRole : store.getState().userRole,
    });
}, 1000));

export default store;
