import React from "react";
import {useSelector, useDispatch} from "react-redux";
import {
    CHeader,
    CHeaderBrand,
    CHeaderNav,
    CHeaderNavItem,
    CHeaderNavLink,
    CSubheader,
    CToggler,
    CDropdown,
    CDropdownToggle,
    CDropdownMenu,
    CDropdownItem
} from "@evenlogics/react";

import {Logout} from "@evenlogics/whf-ra-auth";
import {Logo, LanguageSelector, Breadcrumbs} from "@evenlogics/whf-ra-components";

const TheHeader = () => {
    const dispatch = useDispatch();
    const asideShow = useSelector((state) => state.asideShow);
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
                    <CHeaderNavLink to="/dashboard">Company Name</CHeaderNavLink>
                </CHeaderNavItem>
                <CDropdown variant="nav-item">
                    <CDropdownToggle color="secondary">Current Branch</CDropdownToggle>
                    <CDropdownMenu>
                        <CDropdownItem href="#">Branch # 1</CDropdownItem>
                        <CDropdownItem href="#">Branch # 2</CDropdownItem>
                    </CDropdownMenu>
                </CDropdown>
            </CHeaderNav>

            <CHeaderNav className="px-3">
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

export default TheHeader;
