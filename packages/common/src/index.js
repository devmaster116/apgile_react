import phoneArray from './phone-masks.json';

export const getMaskHelper = (countryCode) => {

    if(typeof phoneArray[countryCode] != 'undefined' && phoneArray[countryCode]) {
        return phoneArray[countryCode];
    }

    return null;
}
