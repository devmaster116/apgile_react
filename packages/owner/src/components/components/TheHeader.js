import React, {useEffect, useState} from "react";
import {useSelector, useDispatch, connect} from "react-redux";
import {changeBranch,setBranches,setPhoneMask} from "../Redux/BranchActions";
import {getMaskHelper} from "@facepays/common";
import Select from 'react-select';
import api from "@evenlogics/whf-api";
import {
    CHeader,
    CHeaderBrand,
    CHeaderNav,
    CHeaderNavItem,
    CHeaderNavLink,
    CSubheader,
    CToggler,
} from "@evenlogics/react";


import {Logout} from "@evenlogics/whf-ra-auth";
import {Logo, LanguageSelector, Breadcrumbs} from "@evenlogics/whf-ra-components";

const TheHeader = (props) => {

    const [options, setOptions] = useState([]);
    const [companyAllBranches, setCompanyAllBranches] = useState([]);
    /* eslint-disable */
    useEffect(() => {
      if (props?.userRole === "supervisor") {
        // window.location.href = '#/calls';
        window.location.replace(`#/calls`)
      }
        let ls = JSON.parse(localStorage.getItem('currentUser'));
        let roled = ls?.roles?.map(role => role)
         props.userRole === "admin" &&  api.request("get", `/branches/${ls?.company?.id}/all`)
            .then(({data}) => {
                console.log(data,"data")
                setCompanyAllBranches(data)
                let optionsArr = data?.map((detail,i) => ({value: detail?.id, label: detail?.name,order:i}))
                setOptions(optionsArr);
                props.setBranches(data);
                if (optionsArr.length > 0) {
                    props.changeBranch(optionsArr[props?.order || 0]);
                }
            }).catch((error) => console.log(error));
    }, [props.order]);


    const dispatch = useDispatch();
    const asideShow = useSelector((state) => state.asideShow);
   /* eslint-enable */
    const darkMode = useSelector((state) => state.darkMode);
    const sidebarShow = useSelector((state) => state.sidebarShow);



    let element_moon = document.querySelector('.fa-moon')
    let element_sun = document.querySelector('.fa-sun')


    if(element_moon && element_sun){
      element_sun.style.display = "none";
      element_moon.style.display = "none";
    }

    const toggleSidebar = () => {

      // Temporary Solution
      let target = document.querySelector('.c-sidebar-fixed');
          if (target.classList.contains('c-sidebar-lg-show')){
            target.classList.remove('c-sidebar-lg-show')
          }else{
            target.classList.add('c-sidebar-lg-show')
          }
        const val = [true, "responsive"].includes(sidebarShow)
            ? false
            : "responsive";
        dispatch({type: "set", sidebarShow: val});
    };

    const toggleSidebarMobile = () => {
      console.log("clicking 2")

        const val = [false, "responsive"].includes(sidebarShow)
            ? true
            : "responsive";
        dispatch({type: "set", sidebarShow: val});
    };

    const onBranchChange = (data) => {
         companyAllBranches && companyAllBranches.map((branches)=>
         branches?.id === data?.value && props.setPhoneMask(getMaskHelper(branches.address.country))
   )

     // let selected =  options.map((opt)=>{
     //        if(opt.value === data.value){
     //            return opt
     //        }else {
     //            return opt
     //        }
     //    })
        props.changeBranch(data);
    }

    return (
      <CHeader withSubheader>
        <CToggler
          inHeader
          className="ml-md-3 d-lg-none"
          onClick={toggleSidebarMobile}
        />
        <CToggler
          inHeader
          className="ml-3 d-md-down-none"
          onClick={toggleSidebar}
        />
        <CHeaderBrand className="mx-auto d-lg-none">
          <Logo type="mobile" />
        </CHeaderBrand>

        <CHeaderNav className="d-md-down-none mr-auto">
          <CHeaderNavItem className="px-3">
           {
               props.userRole === "admin" && <CHeaderNavLink to="/dashboard">
               {props?.companyName}
             </CHeaderNavLink>
           }
          </CHeaderNavItem>
          {console.log(options,"options")}
          {console.log(options[props?.order],"options[props?.order]")}
          {console.log(props?.order,"props?.order")}
       
          {props.userRole === "admin" && options.length > 1 && (
            <Select
              // value={this.state.value}
              // isMulti
              // styles={styles}
              // isClearable={this.state.value.some((v) => !v.isFixed)}
              name="branches"
              className="basic-multi-select"
              classNamePrefix="select"
              onChange={onBranchChange}
              options={options}
              value={options[props?.order]}
            />
          )}
        </CHeaderNav>

        <CHeaderNav className="px-2">
          <LanguageSelector />
          <CToggler
            inHeader
            className="ml-3 d-md-down-none"
            onClick={() => dispatch({ type: "set", darkMode: !darkMode })}
            title="Toggle Light/Dark Mode"
          >
            <i className="fas fa-moon c-d-dark-none" />
            <i className="fas fa-sun c-d-default-none" />
          </CToggler>

          <Logout />
        </CHeaderNav>
        <CSubheader className="px-3 justify-content-between">
          <Breadcrumbs />
        </CSubheader>
      </CHeader>
    );
};


const mapStateToProps = state => {
    return {
        companyName: state.companyName,
        userRole: state.userRole,
        companyId: state.companyId,
        branchId : state.selectedBranchId,
        order : state.branchOrderId,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        changeBranch: (valueObj) => dispatch(changeBranch(valueObj)),
        setBranches: (valueObj) => dispatch(setBranches(valueObj)),
        setPhoneMask: (valueObj) => dispatch(setPhoneMask(valueObj)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TheHeader);
