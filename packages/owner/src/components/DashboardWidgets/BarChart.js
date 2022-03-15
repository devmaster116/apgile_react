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
import { faker } from '@faker-js/faker';
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
    

    useEffect(() => {
        api.request("get", `/${props.selectedBranchId}/teams`).then(({ data }) => {
            console.log(data,"user")
            let optionsArr = data?.map((detail) => ({ value: detail?.id, label: detail?.username }))
            optionsArr.unshift({value:"all",label:"All"})
            setTeamsOptions(optionsArr);
        }).catch((error) => console.log(error));
    }, [props.selectedBranchId])
    


    const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Chart.js Bar Chart',
          },
        },
      };
      
      const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
      
       const data = {
        labels,
        datasets: [
          {
            label: 'Dataset 2',
            data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
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
              value={teamsOptions[selectedOption]}
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
