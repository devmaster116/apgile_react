export const changeBranch = (data) => {
    console.log(data,"data");
    return {
        type : "CHANGE_BRANCH",
        payload:data
    }

}

export const setReduxData = (data) => {
    console.log(data,"setReduxData");
    return {
        type : "SET_REDUX_DATA",
        payload:data,
    }

}