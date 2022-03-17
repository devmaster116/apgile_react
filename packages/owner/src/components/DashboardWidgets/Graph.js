import React from 'react'
import {
    CCard,
    CCardBody, CCardSubtitle,
    CCardTitle,
    CCol,
} from '@coreui/react-pro';
import {Bar, Pie} from 'react-chartjs-2';
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


const Graph = ({type, title, subtitle, chartData, timeline, staff,multiLine}) => {

    const components = {
        pie: Pie,
        line: LineChart,
        bar: Bar,
    };
    const SpecificStory = components[type];
    const options = {
        responsive: true,
        scales: {
            y: {
                ticks: {
                    stepSize: 1
                }
            }
        },
        plugins: {
            legend: {
                display: false
            },
            title: {
                display: false
            }
        },
    }
    return (
        <CCol lg={4} sm={6}>
            <CCard>
                <CCardBody>
                    <CCardTitle>{title}</CCardTitle>
                    <CCardSubtitle className="mb-2 text-medium-emphasis">
                        {subtitle}
                    </CCardSubtitle>
                    <SpecificStory data={chartData} timeline={timeline} staff={staff} options={options} multiLine={multiLine}/>
                </CCardBody>
            </CCard>
        </CCol>
    );
}

export default Graph
