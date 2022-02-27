import phoneArray from './phone-masks.json';
import usStates from './us-states.json';
export const getMaskHelper = (countryCode) => {

    if(typeof phoneArray[countryCode] != 'undefined' && phoneArray[countryCode]) {
        return phoneArray[countryCode];
    }

    return null;
}

export const statesOptionList = () => {
    let options = [];
    for (const key in usStates){
        options.push( {
            value: key,
            label: usStates[key],
        });
    }


    return options;
}
