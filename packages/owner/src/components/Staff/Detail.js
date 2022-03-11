import React, { useEffect,useState } from 'react';
import {Card, CardBody, CardHeader, Button} from 'reactstrap';
import { connect } from "react-redux";
import Block from "../DashboardWidgets/Block";
import {CCol,CRow} from "@coreui/react-pro";
import api from "@evenlogics/whf-api";
import { getColor } from "@facepays/common";
import Graph from '../DashboardWidgets/Graph';
import "../../style/style.css";

const Detail = (props) => {

  const [userStats, setUserStats] = useState([])
  const [timeline, setTimeLine] = useState("today");
  const [labels, setLabels] = useState([])
  const [dataValue, setDataValue] = useState([])

	useEffect(() => {
	    api.request("get",`/${props.branchId}/user-stats/${timeline}/all`).then(({data}) => {
			let labelArr = []
			let valueArr = []
			Object.entries(data?.calls).forEach(([key, val], i) => {
				if(key !== "total"){
					labelArr.push(key.toUpperCase());
					valueArr.push(val);
				}
			})
			setLabels(labelArr)
			setDataValue(valueArr)
			setUserStats(data)
		  })
		  .catch((error) => console.log(error));
	}, [props.branchId,timeline])
	

	
       const timelineChange = (e) => {
         setTimeLine(e.target.value);
       };
       const resetHandler = () => {
         setTimeLine("today");
       };

       const timelineArray = [
         "today",
         "yesterday",
         "week",
         "month",
         "last-month",
         "year",
       ];

		const chartData = {
			labels: labels,
			datasets: [
				{
					label: '# of Votes',
					data: dataValue,
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


  return (
   <div>
      <Card className="animated fadeIn xl-12 lg-12 md-12 sm-12 xs-12">
        <CardHeader>
          <b>Details</b>
          <Button size="sm" color="primary" className="float-right">
            Go Back
          </Button>
        </CardHeader>
        <CardBody>
		<CRow className="align-items-end">
                <CCol sm={4}>
                    {/* <label>Select Location</label> */}
                    {/* <Select
                        name="locations"
                        className="basic-multi-select"
                        classNamePrefix="select"
                        onChange={onLocationChange}
                        options={options}
                        value={options[selectedOption]}
                    /> */}
                </CCol>

                <CCol sm={8} className="mb-3 text-right">
                    <div className="btn-group btn-group-toggle" data-toggle="buttons">

                        {
                            timelineArray?.map((time,i)=>(
                            <label className={`btn btn-dark timeline-buttons text-capitalize mr-1 ${timeline === time ? "active" : ""}`}>
                            <input type="radio" name="options" id={`option${i}`} autocomplete="off" value={time} checked={timeline === time} onChange={timelineChange} /> {time}
                           </label>
                            ))
                        }
                        
                        <Button
                        size="sm"
                        color="danger"
                        className="mb-1 ml-1 reset-button timeline-buttons"
                        onClick={() => resetHandler()}
                        >Reset
                        </Button>
                    </div>
                </CCol>
            </CRow>

          <CRow>
            {userStats?.calls &&
              Object.entries(userStats?.calls).map(([key, val], i) => (
                <CCol sm={3} key={i}>
                  <Block title={key} value={val} color={getColor(i)} />
                </CCol>
              ))}
          </CRow>

		  <CRow>
                   <Graph type="pie" title="Calls Data" subtitle="Details of different call statuses" chartData={chartData} />
                   <Graph type="line" title="Activity Time" subtitle=" Details of different call statuses" chartData={chartData} timeline={timeline} staff="True" />
            </CRow>
        </CardBody>
      </Card>
    </div>
  );
}

const mapStateToProps = state => {
	return {
		 branchId : state.selectedBranchId,
	  }
  }
  
  
  export default connect(mapStateToProps,null)(Detail);
  
