import React, { useEffect,useState } from "react";

const Dashboard = () => {

	const [counter, setCounter] = useState(0);
  useEffect(() => {
    console.log("rendring");
    // window.location.reload();
	setCounter((prev)=> prev+1)
  }, []);

  return (
    <div>
		{
		counter === 2 && <p>hello</p>
		
		} 
		{console.log(counter,"counter")}
      <h3>White Falcon Dashboard</h3>
    </div>
  );
};

export default Dashboard;
