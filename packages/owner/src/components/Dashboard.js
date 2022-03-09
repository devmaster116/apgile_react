import React, {useEffect} from "react";
import {connect} from "react-redux";
import {
    CCard,
    CCardBody,
    CCardGroup,
    CCardHeader, CCardLink, CCardSubtitle, CCardText, CCardTitle,
    CCol,
    CLink,
    CRow, CWidgetStatsA,
    CWidgetStatsB,
    CWidgetStatsC,
    CWidgetStatsE,
    CWidgetStatsF,
} from '@coreui/react-pro';

import { Chart as ChartJS, ArcElement, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';

import {changeBranch, setCompany, setReduxData} from "./Redux/BranchActions";
// import Profile from "./Profile/Detail";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, ArcElement, Tooltip, Legend);

export const chartData = {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [
        {
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
        },
    ],
};

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
        }

    });

    const setInitialData = (data) => {
        props.setReduxData(data);
        window.location.reload();
    }

    if(props?.userRole === "staff") {
        props.history.push('/profile')
    }

    return (
        <div>
            <h3>Adroit Dashboards</h3>

            <CRow>
                <CCol lg={4}>
                    <CCard>

                        <CCardBody>

                            <CCardTitle>Calls Data</CCardTitle>

                            <CCardSubtitle className="mb-2 text-medium-emphasis">Details of different call statuses</CCardSubtitle>
                            <Pie data={chartData} />

                        </CCardBody>

                    </CCard>

                </CCol>
                <CCol lg={4}>
                    <CCard>

                        <CCardBody>

                            <CCardTitle>Activity Time</CCardTitle>

                            <CCardSubtitle className="mb-2 text-medium-emphasis">Details of different call statuses</CCardSubtitle>
                            {/*<Bar options={options} data={data} />*/}

                        </CCardBody>

                    </CCard>

                </CCol>
                <CCol lg={4}>
                    <CRow>
                        <CCol xs={12} sm={4} lg={6}>
                            <CWidgetStatsB
                                className="mb-4"
                                color="info"
                                textColor="white"
                                inverse
                                value="59"
                                title="Total Calls"
                            />
                        </CCol>
                        <CCol xs={12} sm={4} lg={6}>
                            <CWidgetStatsB
                                className="mb-4"
                                color="warning"
                                textColor="white"
                                inverse
                                value="12"
                                title="Pending"
                            />
                        </CCol>
                        <CCol xs={12} sm={4} lg={6}>
                            <CWidgetStatsB
                                className="mb-4"
                                color="success"
                                textColor="white"
                                inverse
                                value="50"
                                title="Completed"
                            />
                        </CCol>

                        <CCol xs={12} sm={4} lg={6}>
                            <CWidgetStatsB
                                className="mb-4"
                                color="danger"
                                textColor="white"
                                inverse
                                value="4"
                                title="Cancelled"
                            />
                        </CCol>
                        <CCol xs={12} sm={4} lg={6}>
                            <CWidgetStatsB
                                className="mb-4"
                                color="primary"
                                textColor="white"
                                inverse
                                value="25"
                                title="Staff Online"
                            />
                        </CCol>
                        <CCol xs={12} sm={4} lg={6}>
                            <CWidgetStatsB
                                className="mb-4"
                                color="secondary"
                                inverse
                                value="12.124"
                                title="Areas Active"
                            />
                        </CCol>
                    </CRow>
                </CCol>

            </CRow>
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
