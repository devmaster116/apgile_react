import React,{useState,useEffect} from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import {Card, CardBody,CardHeader } from 'reactstrap';
import { connect } from "react-redux";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);


const BarChart = (props) => {

    const [Linelabels, setLineLabels] = useState([])
    const [Linedata, setLineData] = useState([])

    useEffect(() => {
      var labels = [];
      var linedata = [];

        props?.barData?.calls_grouped?.team && Object.entries(props?.barData?.calls_grouped.team).forEach(([key, val], i) => {
          labels.push(key);
          linedata.push(val);
         })
         labels && setLineLabels(labels);
         linedata && setLineData(linedata);

    }, [props.selectedBranchId,props.barData])


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
            position: 'top',
          },
          title: {
            display: true,
            text: 'Teams Bar Chart',
          },
        },
      };

      const labels = [...Linelabels];

       const data = {
        labels,
        datasets: [
          {
            label: "Staff",
            barThickness: 40,
            barPercentage: 0.5,
            data: [...Linedata],
            backgroundColor: '#fb6565',
          },
        ],
      }



  return (
    <Card className="animated fadeIn xl-12 lg-12 md-12 sm-12 xs-12">
    <CardHeader>
        <b>Staff Record</b>
    </CardHeader>
    <CardBody>
        <Bar options={options} data={data} />
    </CardBody>
    </Card>
  )

}



const mapStateToProps = state => {
    return {
        selectedBranchId: state.selectedBranchId,
    }
}
export default connect(mapStateToProps, null)(BarChart);
