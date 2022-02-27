
export const jsonToOptionList = (data) => {
    let options = [];
    for (const key in data){
        options.push( {
            value: key,
            label: data[key],
        });
    }


    return options;
}
