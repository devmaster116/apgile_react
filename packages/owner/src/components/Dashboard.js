import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Button } from 'reactstrap';
import {
    CCard,
    CCardBody, CCardSubtitle,
    CCardTitle,
    CCol,
    CRow,
} from '@coreui/react-pro';
import { getColor } from "@facepays/common";
import { Chart as ChartJS, ArcElement, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, 
    PointElement,
    LineElement,
  } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import api from "@evenlogics/whf-api";
import Select from 'react-select';
import { changeBranch, setCompany, setReduxData } from "./Redux/BranchActions";
import Block from "./DashboardWidgets/Block";
import "../style/style.css";
import {LineChart} from "./DashboardWidgets/LineChart";


ChartJS.register(CategoryScale, LinearScale, BarElement, Title, ArcElement, Tooltip, Legend,
    PointElement,
    LineElement
    );


    


const Dashboard = (props) => {

    const [dashbaordData, setDashbaordData] = useState([])
    const [labels, setLabels] = useState([])
    const [dataValue, setDataValue] = useState([])
    const [selectedOption, setSelectedOption] = useState(0);
    const [options, setOptions] = useState([]);
    const [timeline, setTimeLine] = useState("today");

    useEffect(() => {
        if (!props.selectedBranchId) {
            const currentUser = JSON.parse(localStorage.getItem('currentUser'));
            setInitialData({
                companyName: currentUser?.company?.name,
                companyId: currentUser?.company?.id,
                selectedBranchId: currentUser?.branch?.id,
                userRole: currentUser?.roles[0]
            });
        }

        /* eslint-disable */

        setTimeout(() => {
            api.request("get", `/${props.selectedBranchId}/dashboard/${timeline}/all`).then(({ data }) => {
                let labelArr = []
                let valueArr = []
                Object.entries(data?.calls).forEach(([key, val], i) => {
                    labelArr.push(key.toUpperCase());
                    valueArr.push(val);
                })
                setLabels(labelArr)
                setDataValue(valueArr)
                setDashbaordData(data)
            })
                .catch((error) => console.log(error));

            api.request("get", `/${props.selectedBranchId}/locations`).then(({ data }) => {
                let optionsArr = data?.map((detail) => ({ value: detail?.id, label: detail?.name }))
                setOptions(optionsArr);
            }).catch((error) => console.log(error));
        }, 1);

    }, [props.selectedBranchId,timeline]);
    /* eslint-enable */
    const setInitialData = (data) => {
        props.setReduxData(data);
        window.location.reload();
    }

    if (props?.userRole === "staff") {
        props.history.push('/profile')
    }
    const onLocationChange = (data) => {
        let selected = options.map((opt) => {
            if (opt.value === data.value) {
                return opt;
            } else {
                return opt;
            }
        });
        setSelectedOption(selected.value);

        let labelArr = []
        let valueArr = []
        api.request("get", `/${props.selectedBranchId}/dashboard/${timeline}/${data.value}`)
            .then(({ data }) => {
                setDashbaordData(data)
                dashbaordData?.calls && Object.entries(dashbaordData?.calls).forEach(([key, val], i) => {
                    labelArr.push(key.toUpperCase());
                    valueArr.push(val);

                })
            })
            .catch((error) => console.log(error))
        setLabels(labelArr)
        setDataValue(valueArr)

    };

    const chartData = {
        labels: labels,
        datasets: [
            {
                label: '# of Votes',
                data: dataValue,
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


    const timelineChange = (e) =>{
    console.log(e.target.value,"data")
    setTimeLine(e.target.value)
    }

    return (
        <div>
            <h3>Adroit Dashboards</h3>

            <CRow className="align-items-end">
                <CCol sm={4}>
                    <label>Select Location</label>
                    <Select
                        name="locations"
                        className="basic-multi-select"
                        classNamePrefix="select"
                        onChange={onLocationChange}
                        options={options}
                        value={options[selectedOption]}
                    />
                </CCol>
                <CCol sm={2}>
                    <Button
                        size="sm"
                        color="danger"
                        className="custom-button mb-1"
                        onClick={() => setSelectedOption(-1)}
                    >Reset</Button>
                </CCol>

                <CCol sm={6} className="mb-1">
                    <div className="btn-group btn-group-toggle" data-toggle="buttons">
                        <label className={`btn btn-dark timeline-buttons mr-1 ${timeline === "today" ? "active" : ""}`}>
                            <input type="radio" name="options" id="option1" autocomplete="off" value="today" checked={timeline === "today"} onChange={timelineChange} /> Today
                        </label>
                        <label className={`btn btn-dark timeline-buttons mr-2 ${timeline === "yesterday" ? "active" : ""}`}>
                            <input type="radio" name="options" id="option2" value="yesterday" checked={timeline === "yesterday"} autocomplete="off" onChange={timelineChange} /> Yesterday
                        </label>
                        <label className={`btn btn-dark timeline-buttons mr-2 ${timeline === "week" ? "active" : ""}`}>
                            <input type="radio" name="options" id="option3"  value="week" autocomplete="off" onChange={timelineChange} /> This Week
                        </label>
                        <label className={`btn btn-dark timeline-buttons mr-2 ${timeline === "month" ? "active" : ""}`}>
                            <input type="radio" name="options" id="option4" value="month" autocomplete="off" onChange={timelineChange} /> This Month
                        </label>
                        <label className={`btn btn-dark timeline-buttons mr-2 ${timeline === "year" ? "active" : ""}`}>
                            <input type="radio" name="options" id="option5" value="year" autocomplete="off" onChange={timelineChange} /> This Year
                        </label>
                        <label className={`btn btn-dark timeline-buttons ${timeline === "previous-year" ? "active" : ""}`}>
                            <input type="radio" name="options" id="option6" value="previous-year" autocomplete="off" onChange={timelineChange}/> Previous Year
                        </label>
                    </div>
                </CCol>
            </CRow>

            <br />

            <CRow>
                <CCol lg={4}>
                    <CCard>
                        <CCardBody>
                            <CCardTitle>Calls Data</CCardTitle>

                            <CCardSubtitle className="mb-2 text-medium-emphasis">
                                Details of different call statuses
                            </CCardSubtitle>
                            <Pie data={chartData} />
                        </CCardBody>
                    </CCard>
                </CCol>
                <CCol lg={4}>
                    <CCard>
                        <CCardBody>
                            <CCardTitle>Activity Time</CCardTitle>

                            <CCardSubtitle className="mb-2 text-medium-emphasis">
                                Details of different call statuses
                            </CCardSubtitle>
                           {dashbaordData && <LineChart data={dashbaordData}/> }
                        </CCardBody>
                    </CCard>
                </CCol>
                <CCol lg={4}>
                    <CRow>
                        {
                            dashbaordData?.calls && Object.entries(dashbaordData?.calls).map(([key, val], i) => (
                                <CCol xs={12} sm={4} lg={6} key={i}>
                                    <Block title={key} value={val} color={getColor(i)} />
                                </CCol>
                            ))
                        }
                        <CCol xs={12} sm={4} lg={6}>
                            <Block title="Staff Online" value={dashbaordData?.staff_online} color="primary" />
                        </CCol>
                        <CCol xs={12} sm={4} lg={6}>
                            <Block title="Areas Active" value={dashbaordData?.active_areas} color="secondary" font="balck" />
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
