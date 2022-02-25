export const getMaskHelper = (countryCode) => {

    switch (countryCode) {
      case "US":
        return '+1 (999) 999-9999';

      case "UK":
        return '+44 9999 999999';

      case "CA":
        return '+1 (999) 999-9999';

      case "MX":
        return '+52 999 999 9999';

      case "AE":
        return '+971 99 999 9999';

      case "DE":
        return '+49 99 99999999';
      case "AU":
        return '+61 9999 999 999';

      default:
        break;
    }

}