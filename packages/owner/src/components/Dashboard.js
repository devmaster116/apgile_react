import React, {useEffect} from "react";
import {connect} from "react-redux";
import {changeBranch, setCompany, setReduxData} from "./Redux/BranchActions";


const Dashboard = (props) => {

    useEffect(() => {
        if(!props.selectedBranchId) {
            const currentUser = JSON.parse(localStorage.getItem('currentUser'));
            setInitialData({
                companyName: currentUser?.company?.name,
                companyId: currentUser?.company?.id,
                selectedBranchId: currentUser?.branch?.id,
                userRole: currentUser?.roles[0]
            });

            // window.location.replace("https://js.gotomy.dev/call-btn-j/owner/#/dashboard")
            // window.location.replace(`#/dashboard`)
            window.location.reload();
        }

    });

    const setInitialData = (data) => {
        props.setReduxData(data);
    }

    return (
        <div>
            <h3>White Falcon Dashboards</h3>
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
