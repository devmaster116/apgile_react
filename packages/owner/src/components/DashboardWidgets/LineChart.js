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
    // const [SecondLinedata, setSecondLineData] = useState([])

    useEffect(() => {
     var labels = [];
     var linedata = [];
     var secondLinedata = [];

     props?.data?.total_calls && Object.entries(props?.data?.total_calls).forEach(([key, val], i) => {
      labels.push(key);
      linedata.push(val);
     })

     props?.data?.completed_calls && Object.entries(props?.data?.completed_calls).forEach(([key, val], i) => {
      secondLinedata.push(val);
     })


     labels && setLineLabels(labels);
     linedata && setLineData(linedata);
    //  secondLinedata && setSecondLineData(secondLinedata);
    }, [props.data])

    console.log(props.staff,"data")
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
    const labels = [...Linelabels];
    const data =  {
      labels,
        datasets: [
          {
            label: props?.staff ? "Total" : props?.timeline.toUpperCase(),
            data: [...Linedata],
            // labels: ["today","yesterday"],
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
          },
          // props?.staff && {
          //   label:props?.staff && "Completed",
          //   data: [...SecondLinedata],
          //   // labels: ["today","yesterday"],
          //   borderColor: 'rgb(53, 162, 235)',
          //   backgroundColor: 'rgba(53, 162, 235, 0.5)',
          // },
          
        ],
      };
      const options = {
        responsive: true,
        scales: {x: { title: { display: true, text: getTitle(props.timeline) }},y: { title: { display: true, text: 'Calls' }}}  
      };  
 return  (Linelabels && Linedata) && <Line  data={data} options={options} />;
}
