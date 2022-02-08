import TheLayout from "./components/components/TheLayout";
import "bootstrap/dist/css/bootstrap.min.css";
import customNav from "./config/nav";
global.customNavGlobal = customNav;
global.customRoutes = require("./config/routes");
global.customModules = require("./config/modules");
global.customLogin = false;
global.customNavElements = false;
global.customLayout = TheLayout;

require(`@evenlogics/whf-reactadmin`);
