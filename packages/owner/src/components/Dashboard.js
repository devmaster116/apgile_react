import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import {Button} from 'reactstrap';
import {CCol, CRow} from '@coreui/react-pro';
// import {getColor} from "@facepays/common";
import {
    Chart as ChartJS,
    ArcElement,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    PointElement,
    LineElement
} from 'chart.js';
import api from "@evenlogics/whf-api";
import Select from 'react-select';
import {changeBranch, setCompany, setReduxData} from "./Redux/BranchActions";
import Block from "./DashboardWidgets/Block";
import "../style/style.css";
import Graph from "./DashboardWidgets/Graph";
import DatePicker from "react-datepicker";
import TimeRangePicker from '@wojtekmaj/react-timerange-picker';
import {Card, CardBody} from 'reactstrap';
// import BarChart from "./DashboardWidgets/BarChart"


ChartJS.register(CategoryScale, LinearScale, BarElement, Title, ArcElement, Tooltip, Legend, PointElement, LineElement);
const Dashboard = (props) => {

    const [dashbaordData, setDashbaordData] = useState([])
    const [secondChartData, setSecondChartData] = useState([])
    const [labels, setLabels] = useState([])
    const [dataValue, setDataValue] = useState([])
    const [selectedOption, setSelectedOption] = useState({});
    const [locationOptions, setLocationOptions] = useState([]);
    const [itemsOptions, setItemsOptions] = useState([]);
    const [areaOptions, setAreaOptions] = useState([]);
    const [userOptions, setUserOptions] = useState([]);
    const [isRealTime, setRealTime] = useState(true);
    const [timeline, setTimeLine] = useState("hour");
    const [value, setValue] = useState(["09:30", "18:30"]);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [timestamp, setTimestamp] = useState('');
    const [statusOptions, setStatusOptions] = useState([]);
    const [filterUnits, setFilterUnits] = useState([]);

    const [dashboardPayload, setPayload] = useState({
        start: null,
        end: null,
        time: null,
        location: null,
        item: null,
        area: null,
        user: null,
        unit: null,
        status: null,
        team: null,
    });

    const dataCall = () => {
        api.request("post", `/${props.selectedBranchId}/dashboard-stats`, dashboardPayload).then(({data}) => {
            let labelArr = []
            let valueArr = []
            Object.entries(data?.calls).forEach(([key, val], i) => {
                if (key !== "total") {
                    labelArr.push(key.toUpperCase());
                    valueArr.push(val);
                }
            })
            setLabels(labelArr)
            setDataValue(valueArr)
            setDashbaordData(data)
            setSecondChartData(data.charts)
            setLocationOptions(data.filters.locations);
            setAreaOptions(data.filters.areas);
            setItemsOptions(data.filters.items);
            setUserOptions(data.filters.users);
            setRealTime(data.realtime);
            setTimestamp(data.timestamp);
            setStatusOptions(data.statuses);
            setTimeLine(data.unit)
            setFilterUnits(data.units)
        })
            .catch((error) => console.log(error));
    }

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
            dataCall();
        }, 1);

        //If its realtime we need to update stuff regularly
        // if(isRealTime) {
        //     setInterval(function() {
        //         dataCall();
        //     }, 10 * 1000);
        // }


    }, [props.selectedBranchId, dashboardPayload, isRealTime]);


    // useEffect(() => {
        // api.request("get", `/${props.selectedBranchId}/locations`).then(({data}) => {
        //     let optionsArr = data?.map((detail) => ({value: detail?.id, label: detail?.name}))
        //     // optionsArr.unshift({value: "all", label: "All"})
        //     setLocationOptions(optionsArr);
        // }).catch((error) => console.log(error));

        // api.request("get", `/${props.selectedBranchId}/items`).then(({data}) => {
        //     let optionsArr = data?.map((detail) => ({value: detail?.id, label: detail?.name}))
        //     // optionsArr.unshift({value: "all", label: "All"})
        //     setItemsOptions(optionsArr);
        // }).catch((error) => console.log(error));
        //
        // api.request("get", `/${props.selectedBranchId}/areas`).then(({data}) => {
        //     let optionsArr = data?.map((detail) => ({value: detail?.id, label: detail?.name}))
        //     // optionsArr.unshift({value: "all", label: "All"})
        //     setAreaOptions(optionsArr);
        // }).catch((error) => console.log(error));
        //
        //
        // api.request("get", `/${props.selectedBranchId}/role-users/staff`).then(({data}) => {
        //     let optionsArr = data?.map((detail) => ({value: detail?.id, label: detail?.username}))
        //     // optionsArr.unshift({value: "all", label: "All"})
        //     setUserOptions(optionsArr);
        // }).catch((error) => console.log(error));
    // }, [props.selectedBranchId])


    /* eslint-enable */
    const setInitialData = (data) => {
        props.setReduxData(data);
        window.location.reload();
    }
    if (props?.userRole === "staff") {
        props.history.push('/profile')
    }

   


    const onLocationChange = (data, name) => {
        if (name === "location" || name === "staff_status" || name === "activity_status") {
            setPayload({...dashboardPayload, [name]: data.value});
        } else {
            let arr = [];
            arr = data?.map((user) => {
                return user.value;
            });
            setPayload({...dashboardPayload, [name]: arr});
        }


        let selected = locationOptions.map((opt) => {
            if (opt.value === data.value) {
                return opt;
            } else {
                return opt;
            }
        });
        selectedOption[name] = data;
        setSelectedOption(selectedOption);
        console.log(selected,"selected")
    };


    const chartData = {
        labels: labels,
        barPercentage: 1,
        datasets: [
            {
                label: 'Calls',
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


    const timelineChange = (e) => {
        setTimeLine(e.target.value)
        setPayload({
            ...dashboardPayload,
            unit: e.target.value
        })
    }
console.log(chartData,"data")
console.log(secondChartData,"secondChartData")

    const resetHandler = () => {
        // setSelectedOption(0)
        // setTimeLine("today")
        window.location.reload(false);
    }

    const onTimeChange = (data) => {
        setValue(data);

        setPayload({
            ...dashboardPayload,
            time: data
        })
    }


    return (
        <div>
            <CRow>
                <CCol md={6}>
                    <h3>Adroit Dashboards <span className="badge badge-success badge-sm">Created At: {timestamp}</span></h3>
                </CCol>
                <CCol md={6}>
                    <Button
                        size="md"
                        // color="danger"
                        className="btn btn-danger timelineButton mb-2 float-end"
                        onClick={() => resetHandler()}
                    >
                        Reset
                    </Button>
                </CCol>
            </CRow>
            <br />
            <CRow>
                {dashbaordData?.calls &&
                    Object.entries(dashbaordData?.calls).map(([key, val], i) => (
                        <CCol xs={12} sm={6} lg={dashbaordData?.call_attrs[key]?.size ? 2 : 1} key={i}>
                            <Block title={key} value={val} color={dashbaordData?.call_attrs[key].color}/>
                        </CCol>
                    ))}

                <CCol xs={12} sm={6} lg={1}>
                    <Block
                        title="Online Staff"
                        value={dashbaordData?.staff_online}
                        color="success"
                    />
                </CCol>
                <CCol xs={12} sm={6} lg={1}>
                    <Block
                        title="Active Areas"
                        value={dashbaordData?.active_areas}
                        color="warning"
                    />
                </CCol>
            </CRow>
            <CRow>

            </CRow>
            <Card className="animated fadeIn">
                {/*<CardHeader><b>Filter By Entity</b></CardHeader>*/}
                <CardBody>
                    <CRow className="align-items-end">
                        <CCol sm={3}>
                            <label>Select Location</label>
                            <Select
                                name="locations"
                                className="basic-multi-select"
                                placeholder="All..."
                                classNamePrefix="select"
                                onChange={(data) => onLocationChange(data, "location")}
                                options={locationOptions}
                                value={locationOptions[selectedOption['locations']]}
                                // isMulti
                            />
                        </CCol>

                        {dashboardPayload?.location && <CCol sm={3}>
                            <label>Select Area</label>
                            <Select
                                name="areas"
                                className="basic-multi-select"
                                classNamePrefix="select"
                                placeholder="All..."
                                onChange={(data) => onLocationChange(data, "area")}
                                options={areaOptions}
                                value={areaOptions[selectedOption['areas']]}
                                isMulti
                            />
                        </CCol> }
                        {dashboardPayload?.location && <CCol sm={3}>
                            <label>Select Item</label>
                            <Select
                                name="items"
                                className="basic-multi-select"
                                placeholder="All..."
                                classNamePrefix="select"
                                onChange={(data) => onLocationChange(data, "item")}
                                options={itemsOptions}
                                value={itemsOptions[selectedOption['items']]}
                                isMulti
                            />
                        </CCol>}
                        {dashboardPayload?.location && <CCol sm={3}>
                            <label>Select Staff</label>
                            <Select
                                name="users"
                                className="basic-multi-select"
                                placeholder="All..."
                                classNamePrefix="select"
                                onChange={(data) => onLocationChange(data, "user")}
                                options={userOptions}
                                value={userOptions[selectedOption['user']]}
                                isMulti
                            />
                        </CCol> }
                    </CRow>

                </CardBody>
            </Card>
            <Card className="animated fadeIn">
                {/*<CardHeader><b>Filter By Time</b></CardHeader>*/}
                <CardBody>
                    <CRow className="align-items-end">
                        <CCol sm={2}>
                            <label>Select Start Date</label>
                            <DatePicker
                                selected={startDate}
                                onChange={(date) => {
                                    setStartDate(date)
                                    setPayload({
                                        ...dashboardPayload,
                                        start: date
                                    })
                                }
                                }
                                className="date-picker-custom"
                                dateFormat="MM-dd-yyyy"
                            />
                        </CCol>

                        <CCol sm={2}>
                            <label>Select End Date</label>
                            <DatePicker
                                selected={endDate}
                                onChange={(date) => {
                                    setEndDate(date)
                                    setPayload({
                                        ...dashboardPayload,
                                        end: date
                                    })
                                }}

                                className="date-picker-custom"
                                dateFormat="MM-dd-yyyy"
                            />
                        </CCol>
                        <CCol sm={4}>
                            <label>Select Time Range</label> <br/>
                            <TimeRangePicker className="date-picker-custom" clockIcon={null} disableClock={true}
                                             onChange={onTimeChange} value={value}/>
                        </CCol>
                        <CCol sm={4}>
                            <label>Create By</label> <br/>
                            {filterUnits.length > 0 &&
                                Object.entries(filterUnits).map(([key, val], i) => (
                                    <label
                                        className={`btn btn-dark btn-sm timelineButton mr-1 ${
                                            timeline === val ? "active" : ""
                                        }`}
                                    >
                                        <input
                                            type="radio"
                                            name="options"
                                            id={"option" + key}
                                            autoComplete="off"
                                            className="d-none"
                                            value={val}
                                            checked={timeline === val}
                                            onChange={timelineChange}
                                        />
                                        {val.toUpperCase()}
                                    </label>
                                ))}
                        </CCol>
                    </CRow>

                </CardBody>
            </Card>
            <CRow>
                <CCol lg={4} sm={6}>
                <Graph
                    type="bar"
                    title="Call Counts"
                    chartData={dashbaordData?.call_chart}
                    ytitle="# Calls"
                    xtitle="Statuses"
                    lengend={false}
                />
                </CCol>
                <CCol lg={4} sm={6}>
                <Graph
                    type="line"
                    title="Activity"
                    chartData={dashbaordData?.charts?.status}
                    ytitle="# Calls"
                    xtitle={timeline}
                    lengend={false}
                    onFilterChange={onLocationChange}
                    filterData={statusOptions}
                    filterName="activity_status"
                />
                </CCol>
                <CCol lg={4} sm={6}>
                 <Graph
                    type="line"
                    title="Service Performance"
                    chartData={dashbaordData?.charts?.avgs}
                    timeline={timeline}
                    multiLine={true}
                    ytitle="Avg. Minutes Spent"
                    xtitle={timeline}
                    lengend={true}
                />
                </CCol>
                <CCol lg={12}>
                    <Graph
                        type="bar"
                        title="Staff Performance"
                        chartData={dashbaordData?.charts?.team}
                        timeline={timeline}
                        multiLine={true}
                        ytitle="# Calls"
                        xtitle="Team"
                        lengend={false}
                        aspectRatio={5}
                        onFilterChange={onLocationChange}
                        filterData={statusOptions}
                        filterName="staff_status"
                    />
                    {/*<BarChart barData={dashbaordData} onLocationChange={onLocationChange} ytitle="Calls" xtitle="Team Members"/>*/}
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
