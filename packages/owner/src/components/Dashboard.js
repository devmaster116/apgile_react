import React, { useEffect, useCallback, useState } from "react";
import {connect} from "react-redux";
import {changeBranch, setCompany, setReduxData} from "./Redux/BranchActions";
import {CCol, CRow} from '@coreui/react-pro';
import {getMaskHelper} from "@facepays/common";
import api from "@evenlogics/whf-api";
import Block from "./DashboardWidgets/Block";

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

        api.request("get", `/${props.selectedBranchId}/outlet-quota`).then(({success, data}) => {
            if(success) {
                setCallQuota(data.monthly_quota);
                setShowQuota(true);
            }
        })
            .catch((error) => console.log(error));

    }, [props.selectedBranchId, setInitialData]);

    return (
        <div>
            <h3>Apgile Dashboard</h3>

            <div>
                <CRow>
                    <CCol md={3}>
                        {showQuota &&  <Block
                            title="Quota Left"
                            value={callQuota}
                            color={callQuota > 100 ? 'success' : 'danger'}
                        />}
                    </CCol>
                </CRow>
            </div>


            {/*<div className="text-center">*/}
            {/*    <img src="https://service.facepays.ai/assets/images/fp-icon.png" height="30%" alt="Apgile" />*/}
            {/*</div>*/}
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
