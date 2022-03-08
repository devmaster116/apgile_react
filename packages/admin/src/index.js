import "bootstrap/dist/css/bootstrap.min.css";
import customNav from "./config/nav";
global.customNavGlobal = customNav;
global.customRoutes = require("./config/routes");
global.customModules = require("./config/modules");
global.customLogin = false;
global.customNavElements = false;

// let ls =  JSON.parse(localStorage.getItem('currentUser'));
// let isAdmin = ls?.roles?.map(role => role === "admin" ? true : false);
// console.log(isAdmin?.includes(true) ,"admin");
// global.customNavElements= isAdmin?.includes(true) && <Button color="danger" onClick={() => logoutAsAdmin()}>Switch To Admin</Button>
require(`@evenlogics/whf-reactadmin`);

require("./styles/style.css")
// const logoutAsAdmin = () => {

//       let oldUser = JSON.parse(localStorage?.getItem('previousUser'));
//     //   localStorage.setItem('previousUser',JSON.stringify(oldUser));
//       localStorage.setItem('currentUser',JSON.stringify(oldUser));
//       window.location.reload("/");
// }