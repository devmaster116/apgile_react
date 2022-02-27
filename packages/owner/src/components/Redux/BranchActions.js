export const changeBranch = (data) => {
    return {
        type : "CHANGE_BRANCH",
        payload: data
    }
}

export const setCompany = (data) => {
    return {
        type : "SET_COMPANY",
        payload: data
    }
}

export const setReduxData = (data) => {
    return {
        type : "SET_REDUX_DATA",
        payload: data,
    }

}
