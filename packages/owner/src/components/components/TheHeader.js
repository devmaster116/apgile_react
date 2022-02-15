import React, {useEffect, useState} from "react";
import {useSelector, useDispatch, connect} from "react-redux";
import {changeBranch} from "../Redux/BranchActions";
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
    // const [options, setOptions] = useState([]);
    /* eslint-disable */
    useEffect(() => {
        let ls = JSON.parse(localStorage.getItem('currentUser'));
        let roled = ls?.roles?.map(role => role)
         console.log(ls,"ls")
        api.request("get", `/branches/${ls?.company?.id}/all`)
            .then(({data}) => {
                let optionsArr = data?.map((detail) => ({value: detail?.id, label: detail?.name}))
                setOptions(optionsArr);
                // if (optionsArr.length > 0) {
                //     props.changeBranch(optionsArr[0]);
                // }
            }).catch((error) => console.log(error));
    }, []);
    /* eslint-enable */
    const dispatch = useDispatch();
      /* eslint-disable */
    const asideShow = useSelector((state) => state.asideShow);
   /* eslint-enable */  
    const darkMode = useSelector((state) => state.darkMode);
    const sidebarShow = useSelector((state) => state.sidebarShow);


    const toggleSidebar = () => {
        const val = [true, "responsive"].includes(sidebarShow)
            ? false
            : "responsive";
        dispatch({type: "set", sidebarShow: val});
    };

    const toggleSidebarMobile = () => {
        const val = [false, "responsive"].includes(sidebarShow)
            ? true
            : "responsive";
        dispatch({type: "set", sidebarShow: val});
    };

    const onBranchChange = (data) => {
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
                <Logo type="mobile"/>
            </CHeaderBrand>

            <CHeaderNav className="d-md-down-none mr-auto">
                <CHeaderNavItem className="px-3">
                    <CHeaderNavLink to="/dashboard">{props?.companyName}</CHeaderNavLink>
                </CHeaderNavItem>
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
                    // value={options[0]}
                />
            </CHeaderNav>

            <CHeaderNav className="px-2">
                <LanguageSelector/>
                <CToggler
                    inHeader
                    className="ml-3 d-md-down-none"
                    onClick={() => dispatch({type: "set", darkMode: !darkMode})}
                    title="Toggle Light/Dark Mode"
                >
                    <i className="fas fa-moon c-d-dark-none"/>
                    <i className="fas fa-sun c-d-default-none"/>
                </CToggler>

                <Logout/>
            </CHeaderNav>
            <CSubheader className="px-3 justify-content-between">
                <Breadcrumbs/>
            </CSubheader>
        </CHeader>
    );
};


const mapStateToProps = state => {
    return {
        companyName: state.companyName,
        userRole: state.userRole,
        companyId: state.companyId,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        changeBranch: (valueObj) => dispatch(changeBranch(valueObj))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TheHeader);
