import "bootstrap/dist/css/bootstrap.min.css";
import globals from './globals';
import TheLayout from "./components/components/TheLayout";
global.customLayout = TheLayout;
console.log(globals,"globals");
require(`@evenlogics/whf-reactadmin`);
