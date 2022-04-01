import React, { useEffect, useCallback } from "react";
import {connect} from "react-redux";
import {changeBranch, setCompany, setReduxData} from "./Redux/BranchActions";
import {getMaskHelper} from "@facepays/common";

const Dashboard = (props) => {

    const setReduxData = props.setReduxData;
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

    }, [props.selectedBranchId, setInitialData]);

    return (
        <div>
            <h3>Adroit Dashboard</h3>

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
