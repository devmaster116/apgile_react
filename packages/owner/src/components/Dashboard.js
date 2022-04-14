import React, { useEffect, useCallback, useState } from "react";
import {connect} from "react-redux";
import {changeBranch, setCompany, setReduxData} from "./Redux/BranchActions";
import {getMaskHelper} from "@facepays/common";
import api from "@evenlogics/whf-api";

const Dashboard = (props) => {

    const setReduxData = props.setReduxData;
    const [showQuota, setShowQuota] = useState(false);
    const [callQuota, setCallQuota] = useState(false);
    const setInitialData = useCallback((data) => {
        setReduxData(data);
        window.location.reload();
    }, [setReduxData])

    useEffect(() => {
        if (!props.selectedBranchId) {
            const currentUser = JSON.parse(localStorage.getItem('currentUser'));
            setInitialData({
                companyName: currentUser?.company?.name,
                companyId: currentUser?.company?.id,
                selectedBranchId: currentUser?.branch?.id,
                userRole: currentUser?.roles[0],
                phoneMask: getMaskHelper(currentUser?.branch_address?.country)
            });
        }

        dataCall();

    }, [props.selectedBranchId, setInitialData]);


    const dataCall = () => {
        api.request("get", `/${props.selectedBranchId}/outlet-quota`).then(({success, data}) => {
            if(success) {
                setCallQuota(data.monthly_quota);
                setShowQuota(true);
            }
        })
            .catch((error) => console.log(error));
    }

    return (
        <div>
            <h3>Adroit Dashboard</h3>

            {showQuota &&  <div className="alert alert-success alert-lg">Remaining calls for this month: {callQuota}</div>}

            <div className="text-center">
                <img src="https://service.facepays.ai/assets/images/fp-icon.png" height="30%" alt="Adroit" />
            </div>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        companyName: state.companyName,
        userRole: state.userRole,
        companyId: state.companyId,
        selectedBranchId: state.selectedBranchId,
    }
}


const mapDispatchToProps = dispatch => {
    return {
        changeBranch: (valueObj) => dispatch(changeBranch(valueObj)),
        setCompany: (valueObj) => dispatch(setCompany(valueObj)),
        setReduxData: (valueObj) => dispatch(setReduxData(valueObj))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
