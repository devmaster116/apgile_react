import phoneArray from './phone-masks.json';
import usStates from './us-states.json';
import timezones from './timezones.json';
import colorArray from "./widgets-color.json";

import {jsonToOptionList} from "./helpers";

export const getMaskHelper = (countryCode) => {
    if(typeof phoneArray[countryCode] != 'undefined' && phoneArray[countryCode]) {
        return phoneArray[countryCode];
    }

    return null;
}


export const getColor = (colorCode) => {
    if(typeof colorArray[colorCode] != 'undefined' && colorArray[colorCode]) {
        return colorArray[colorCode];
    }
    return null;
}




export const statesOptionList = () => {
    return jsonToOptionList(usStates);
}

export const timezonesOptions = () => {
    return jsonToOptionList(timezones);
}

export const formPageTitle = (entity, id) => {

    if(id) {
        return 'Edit ' + entity;
    }

    return 'Add ' + entity;
}


export const fullAddressFormat = (address) => {
    let fullAddress = address.addr1 + ' ' + address.city;

    if(address.state) {
        fullAddress += ', ' + address.state;
    }
    fullAddress += ' ' + address.country;

    return fullAddress;
}
