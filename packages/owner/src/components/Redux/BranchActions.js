export const changeBranch = (data) => {
    console.log(data,"data");
    return {
        type : "CHANGE_BRANCH",
        payload:data
    }

}