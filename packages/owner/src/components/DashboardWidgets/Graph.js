import React from 'react'
import {
    CCard,
    CCardBody, CCardSubtitle,
    CCardTitle,
    CCol,
} from '@coreui/react-pro';
import {Bar, Line, Pie} from 'react-chartjs-2';
import {
    Chart as ChartJS, ArcElement, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend,
    PointElement,
    LineElement,
} from 'chart.js';
import {LineChart} from './LineChart';
import "../../style/style.css";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, ArcElement, Tooltip, Legend,
    PointElement,
    LineElement
);


const Graph = ({type, title, xtitle, ytitle, subtitle, chartData, lengend, aspectRatio = 2}) => {

    const components = {
        pie: Pie,
        line: Line,
        bar: Bar,
    };

    const SpecificStory = components[type];
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
                    text: ytitle
                }
            },

            x: {
                title: {
                    display: true,
                    text: xtitle
                }
            }
        },
        plugins: {
            label: {
                display: false
            },
            legend: {
                display: lengend
            }
        },
    }

    if(typeof chartData === 'undefined' || (typeof chartData !== 'undefined' && !chartData)) {
        return [];
    }

    let finalData = {};
    if(typeof chartData.datasets !== 'undefined') {
        finalData = chartData;
    } else {
        finalData = {
            labels: chartData.labels,
            barPercentage: 1,
            datasets: [
                {
                    data: chartData.data,
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
    }

    return (
            <CCard>
                <CCardBody>
                    <CCardTitle>{title}</CCardTitle>
                    <CCardSubtitle className="mb-2 text-medium-emphasis">
                        {subtitle}
                    </CCardSubtitle>
                    {/*<Line className='height-graph' data={data} options={props.options}/>*/}
                    {/*<Bar className='height-graph' data={finalData} options={options}/>*/}
                    {/*<SpecificStory data={chartData} timeline={timeline} staff={staff} options={options} multiLine={multiLine}/>*/}
                    <SpecificStory data={finalData} options={options} />
                </CCardBody>
            </CCard>
    );
}

export default Graph
