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
import Select from 'react-select';
import api from "@evenlogics/whf-api";
import { connect } from "react-redux";
import {CCol,CRow} from '@coreui/react-pro';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);


const BarChart = (props) => {

    const [selectedOption, setSelectedOption] = useState(0);
    const [teamsOptions, setTeamsOptions] = useState([]);
    const [Linelabels, setLineLabels] = useState([])
    const [Linedata, setLineData] = useState([])

    useEffect(() => {
      var labels = [];
      var linedata = [];
        api.request("get", `/${props.selectedBranchId}/teams`).then(({ data }) => {
            let optionsArr = data?.map((detail) => ({ value: detail?.id, label: detail?.name }))
            // optionsArr.unshift({value:"all",label:"All"})
            setTeamsOptions(optionsArr);
        }).catch((error) => console.log(error));

        props?.barData?.calls_grouped?.team && Object.entries(props?.barData?.calls_grouped.team).forEach(([key, val], i) => {
          labels.push(key);
          linedata.push(val);
         })
         labels && setLineLabels(labels);
         linedata && setLineData(linedata);

    }, [props.selectedBranchId,props.barData])
    


    const options = {
        responsive: true,
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

      const onTeamChange = (data) => {
        let selected = teamsOptions.map((opt) => {
            if (opt.value === data.value) {
                return opt;
            } else {
                return opt;
            }
        });
        setSelectedOption(selected.value);
        props.onLocationChange(data,'team')
    };
      
  return (
    <Card className="animated fadeIn xl-12 lg-12 md-12 sm-12 xs-12">
    <CardHeader>
        <b>Members Record</b> 
    </CardHeader>
    <CardBody>
  
    <CRow>
        <CCol sm={4}>
        <label>Select Team</label>
        <Select
              name="areas"
              className="basic-multi-select"
              classNamePrefix="select"
              onChange={onTeamChange}
              options={teamsOptions}
              // value={teamsOptions[selectedOption]}
            />
        </CCol>
    </CRow>
           
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
