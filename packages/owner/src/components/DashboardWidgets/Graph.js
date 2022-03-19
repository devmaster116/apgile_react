import React from 'react'
import {
    CCard,
    CCardBody, CCardSubtitle,
    CCardTitle,
    CCol, CRow,
} from '@coreui/react-pro';
import 'chartjs-adapter-moment';
import {Bar, Line, Pie} from 'react-chartjs-2';
import zoomPlugin from 'chartjs-plugin-zoom';
import {
    Chart as ChartJS, ArcElement, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, TimeScale,
    PointElement,
    LineElement
} from 'chart.js';
// import {LineChart} from './LineChart';
import "../../style/style.css";
import Select from "react-select";

ChartJS.register(
    CategoryScale, LinearScale, BarElement, Title, ArcElement, Tooltip, Legend,
    PointElement,
    LineElement,
    TimeScale,
    zoomPlugin
);


const Graph = ({
                   type,
                   title,
                   xtitle,
                   ytitle,
                   subtitle,
                   chartData,
                   timeX,
                   lengend,
                   timeline,
                   aspectRatio = 2,
                   filterData = false,
                   onFilterChange,
                   filterName,
                   startDate,
                   endDate
               }) => {

    const components = {
        pie: Pie,
        line: Line,
        bar: Bar,
    };

    const SpecificStory = components[type];

    let xAxes = {
        title: {
            display: true,
            text: xtitle.toUpperCase(),
        }
    };

    if (timeX) {
        xAxes.type = "time";
        xAxes.position = 'left'
        xAxes.ticks = {source: 'labels', autoSkip: false}
        xAxes.time = {
            unit: timeline
        };

        // xAxes.min = startDate;
        // xAxes.max = endDate;
    }

    const customStyles = {
        container: (provided, state) => ({
            ...provided,
            minWidth: '200px'
        }),
    }


    const options = {
        responsive: true,
        aspectRatio: aspectRatio,
        scales: {
            y: {
                ticks: {
                    stepSize: 1
                },
                title: {
                    display: true,
                    text: ytitle.toUpperCase()
                },
                min: 0
            },

            x: xAxes
        },
        plugins: {
            label: {
                display: false
            },
            legend: {
                display: chartData ? lengend : false
            },
            zoom: {
                pan: {
                    enabled: true,
                    'mode': 'xy'
                },
                zoom: {
                    wheel: {
                        enabled: true,
                        modifierKey: 'ctrl'
                    },
                    pinch: {
                        enabled: true
                    },
                    mode: 'x',
                }
            },
        },
    }

    if (typeof chartData === 'undefined') {
        return [];
    }

    let finalData = {};
    if (typeof chartData.datasets !== 'undefined') {
        finalData = chartData;
    } else {
        finalData = {
            labels: chartData.labels,
            barPercentage: 1,
            datasets: [
                {
                    data: chartData.data,
                    backgroundColor: chartData.colors?.background ? chartData.colors.background : [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)',
                    ],
                    borderColor: chartData.colors?.border ? chartData.colors.border : [
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
    }

    return (
        <CCard>
            <CCardBody>
                {filterData &&
                    <CRow>
                        <CCol lg={8}>
                            <CCardTitle>
                                {title}
                            </CCardTitle>
                        </CCol>
                        <CCol lg={4}>
                            <div style={{maxWidth: '200px'}} className="float-right">
                                <Select
                                    styles={customStyles}
                                    name={filterName}
                                    className="basic-multi-select"
                                    placeholder="All..."
                                    classNamePrefix="select"
                                    onChange={(data) => onFilterChange(data, filterName)}
                                    options={filterData}
                                    // isMulti
                                />
                            </div>
                        </CCol>
                    </CRow>
                }

                {!filterData && <CCardTitle className="text-left">
                    {title}
                </CCardTitle>}
                {subtitle && <CCardSubtitle className="mb-2 text-medium-emphasis">
                    {subtitle}
                </CCardSubtitle>}

                {/*<Line className='height-graph' data={data} options={props.options}/>*/}
                {/*<Bar className='height-graph' data={finalData} options={options}/>*/}
                {/*<SpecificStory data={chartData} timeline={timeline} staff={staff} options={options} multiLine={multiLine}/>*/}
                <SpecificStory data={finalData} options={options} />
            </CCardBody>
        </CCard>
    );
}

export default Graph
