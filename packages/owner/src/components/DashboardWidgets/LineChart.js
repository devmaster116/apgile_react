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


export const  LineChart = (props) => {

    const [Linelabels, setLineLabels] = useState([])
    const [Linedata, setLineData] = useState([])

    useEffect(() => {
     var labels = [];
     var linedata = [];

     props?.data?.calls_grouped && Object.entries(props?.data?.calls_grouped).forEach(([key, val], i) => {
      labels.push(key);
      linedata.push(val);
     })
     labels && setLineLabels(labels);
     linedata && setLineData(linedata);
      console.log(props?.data,"data")
    }, [props.data])

    // console.log(props?.data,"data")
   
   
    const data =  {
        datasets: [
          {
            label: 'Dataset 1',
            data: Linedata,
            labels: Linelabels,
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
          },
        ],
      };
      const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Chart.js Line Chart',
          },
        },
      };  
 return  (Linelabels && Linedata) && <Line options={options} data={data} />;
}
