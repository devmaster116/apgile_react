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
            <h3>Adroit Dashboard</h3>

            <div className="text-center">
                <img src="https://call-button.test/public/assets/images/fp-icon.png" height="30%" />
            </div>
        </div>
    );
};

export default Dashboard;
