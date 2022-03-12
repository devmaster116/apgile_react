import React,{useEffect,useState} from 'react';
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
import { Line } from 'react-chartjs-2';
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
    const [SecondLinedata, setSecondLineData] = useState([])

    useEffect(() => {
     var labels = [];
     var linedata = [];
     var secondLinedata = [];
   if(props?.staff === false ||  props?.staff === undefined){
    props?.data?.calls_grouped && Object.entries(props?.data?.calls_grouped).forEach(([key, val], i) => {
      labels.push(key);
      linedata.push(val);
     })
   }  

     props?.staff === true && props?.data?.completed_calls && Object.entries(props?.data?.completed_calls).forEach(([key, val], i) => {
      labels.push(key);
      linedata.push(val);
     })

     props?.staff === true && props?.data?.total_calls && Object.entries(props?.data?.total_calls).forEach(([key, val], i) => {
      // labels.push(key);
      secondLinedata.push(val);
     })
     labels && setLineLabels(labels);
     linedata && setLineData(linedata);
     secondLinedata && setSecondLineData(secondLinedata);
    }, [props.data,props.staff])

   const getTitle = (timeline) => {
     switch (timeline) {
       case "today":
         return "Hours";
       case "yesterday":
         return "Hours";
       case "week":
         return "Days";
       case "month":
         return "Weeks";
       case "last-month":
         return "Weeks";
       case "year":
         return "Months";
       default:
         break;
     }
   };
  //  const doubleDataSet = [];



   const dataSet = [ 
     {
        label: props?.staff === true ? "Completed" : props?.timeline.toUpperCase(),
        data: [...Linedata],
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
    }
    ];
    props?.staff === true && dataSet.push({
      label:"Total",
      data: [...SecondLinedata],
      borderColor:  'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    })
    const labels = [...Linelabels];
    const data =  {
      labels,
        datasets:dataSet
      };
      const options = {
        responsive: true,
        scales: {x: { title: { display: true, text: getTitle(props.timeline) }},y: { title: { display: true, text: 'Calls' }}}  
      };  
 return  (Linelabels) && <Line className='height-graph' data={data} options={options} />;
}
