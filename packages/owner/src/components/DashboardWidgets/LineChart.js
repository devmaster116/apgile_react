import React, {useEffect, useState} from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import {Line} from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);


export const LineChart = (props) => {

    const [Linelabels, setLineLabels] = useState([])
    const [Linedata, setLineData] = useState([])

    const [completedLinelabels, setCompletedLineLabels] = useState([])
    const [completedLinedata, setCompletedLineData] = useState([])
    const [responselabels, setResponseLineLabels] = useState([])
    const [responseLinedata, setResponseLineData] = useState([])

    const [SecondLinedata, setSecondLineData] = useState([])

    useEffect(() => {
        var labels = [];
        var linedata = [];

        var completedLabels = [];
        var completedLinedata = [];

        var responsesLabels = [];
        var responsesLinedata = [];

        var secondLinedata = [];
        if (props?.staff === false || props?.staff === undefined) {
            props?.data?.calls_grouped?.status && Object.entries(props?.data?.calls_grouped.status).forEach(([key, val], i) => {
                labels.push(key);
                linedata.push(val);
            })
        }
        console.log(props?.data,"props?.data")

        props?.multiLine === true && props?.data?.completed && Object.entries(props?.data?.completed).forEach(([key, val], i) => {
          console.log("completed")
            completedLabels.push(key);
            completedLinedata.push(val);
        })

        props?.multiLine === true && props?.data?.responses && Object.entries(props?.data?.responses).forEach(([key, val], i) => {
            console.log("responses")
            responsesLabels.push(key);
            responsesLinedata.push(val);
        })


        props?.staff === true && props?.data?.completed_calls?.status && Object.entries(props?.data?.completed_calls?.status).forEach(([key, val], i) => {
            labels.push(key);
            linedata.push(val);
        })

        props?.staff === true && props?.data?.total_calls?.status && Object.entries(props?.data?.total_calls?.status).forEach(([key, val], i) => {
            // labels.push(key);
            secondLinedata.push(val);
        })
        labels && setLineLabels(labels);
        linedata && setLineData(linedata);
        secondLinedata && setSecondLineData(secondLinedata);

        completedLabels && setCompletedLineLabels(completedLabels);
        completedLinedata && setCompletedLineData(completedLinedata);
        responsesLabels && setResponseLineLabels(responsesLabels);
        responsesLinedata && setResponseLineData(responsesLinedata);

    }, [props.data, props.staff,props.multiLine])


    // const getTitle = (timeline) => {
    //     switch (timeline) {
    //         case "today":
    //             return "Hours";
    //         case "yesterday":
    //             return "Hours";
    //         case "week":
    //             return "Days";
    //         case "month":
    //             return "Weeks";
    //         case "last-month":
    //             return "Weeks";
    //         case "year":
    //             return "Months";
    //         default:
    //             break;
    //     }
    // };
     console.log('leaner data', completedLinedata);
     console.log('leaner data', completedLinelabels);

     const doubleDataSet = [
        {
            label: "Completed",
            data: [...completedLinedata],
            borderColor: '#a3916c',
            backgroundColor: '#f9b115',
        },
        {
            label: "Responses",
            data: [...responseLinedata],
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
        }
    ];

    const dataSet = [
        {
            label: props?.staff === true ? "Completed" : props?.timeline.toUpperCase(),
            data: [...Linedata],
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
        }
    ];
    props?.staff === true && dataSet.push({
        label: "Total",
        data: [...SecondLinedata],
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
    })
    const labels =  props?.multiLine === true ? [...responselabels] : [...Linelabels]  ;

    const data = {
        labels,
        datasets: props.multiLine === true ? doubleDataSet: dataSet
    };

    return (Linelabels) && <Line className='height-graph' data={data} options={props.options}/>;
}
