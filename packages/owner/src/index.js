import "bootstrap/dist/css/bootstrap.min.css";
import "./style/style.css";
import globals from './globals';
import TheLayout from "./components/components/TheLayout";
global.customLayout = TheLayout;
require(`@evenlogics/whf-reactadmin`);
