import React, {useEffect} from "react";
import api from "@evenlogics/whf-api";
import {Watch} from "react-loader-spinner";
import {connect} from "react-redux";
import {changeBranch, setCompany, setReduxData} from "./Redux/BranchActions";
import {getMaskHelper} from "@facepays/common";

const ValidateAsOwner = (props) => {


      /* eslint-disable */
    useEffect(() => {
        // setLoader(true);
        const payload = {
            token: props?.match?.params?.token?.split("&")[0],
        };
        let bearerToken = props?.match?.params?.token?.split("&")?.[1]?.split("|")?.[1];
        api.request("post", "/auto-login", payload, bearerToken)
            .then(({data}) => {
                localStorage.setItem("currentUser", JSON.stringify({...data, authToken: data?.api_token}));

                setInitialData({
                    companyName: data?.company?.name,
                    companyId: data?.company?.id,
                    selectedBranchId: data?.branch?.id,
                    userRole: data?.roles[0],
                    phoneMask: getMaskHelper(data?.branch_address?.country)
                });

                // window.location.replace("https://js.gotomy.dev/call-btn-j/owner/#/dashboard")
                window.location.replace(`#/dashboard`)
                window.location.reload()
            })
            .catch((error) => console.log(error));
    }, [props.match.params.token]);
 /* eslint-enable */
    const setInitialData = (data) => {
        props.setReduxData(data);
    }

    return (
        <>
            <div style={{textAlign: "center", width: "100%"}}>
                <Watch
                    class="text-center m-auto"
                    heigth="100"
                    width="100"
                    color="grey"
                    ariaLabel="loading"
                />
            </div>
        </>
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
        changeBranch: (valueObj) => dispatch(changeBranch(valueObj)),
        setCompany: (valueObj) => dispatch(setCompany(valueObj)),
        setReduxData: (valueObj) => dispatch(setReduxData(valueObj))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ValidateAsOwner);
