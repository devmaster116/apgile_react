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


export const setBranches = (data) => {
    return {
        type : "SET_BRANCHES",
        payload: data,
    }

}
export const setPhoneMask = (data) => {
    return {
        type : "SET_PHONE_MASK",
        payload: data,
    }

}
