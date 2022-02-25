export const getMastHelper = (countryCode) => {

    switch (countryCode) {
      case "US":
        return "(999) 999-9999";

      case "UK":
        return "999 9999 9999";

      case "CA":
        return "(999) 999-9999";

      case "MX":
        return "99 99 9999 9999";

      case "AE":
        return "999 99 999 9999";

      case "DE":
        return "999 99999999";
      case "AU":
        return "(99) 9999 9999";

      default:
        break;
    }

}