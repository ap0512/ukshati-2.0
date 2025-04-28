// import React from "react";
// import { Line } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   LineElement,
//   CategoryScale,
//   LinearScale,
//   PointElement,
// } from "chart.js";
// import "../Styles/BatteryHealth.css";

// ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

// const BatteryHealth = () => {
//   const data = {
//     labels: [
//       "08:00",
//       "09:00",
//       "10:00",
//       "11:00",
//       "12:00",
//       "13:00",
//       "14:00",
//       "15:00",
//     ], // dummy data
//     datasets: [
//       {
//         label: "Voltage (V)",
//         data: [3.7, 3.8, 3.9, 4.0, 4.1, 3.9, 3.8, 3.7], //dummy data
//         fill: false,
//         backgroundColor: "rgba(75,192,192,0.2)",
//         borderColor: "rgba(75,192,192,1)",
//         tension: 0.4,
//       },
//     ],
//   };

//   const options = {
//     scales: {
//       x: {
//         title: {
//           display: true,
//           text: "Time (h)",
//         },
//       },
//       y: {
//         title: {
//           display: true,
//           text: "Voltage (V)",
//         },
//         beginAtZero: false,
//       },
//     },
//     responsive: true,
//     maintainAspectRatio: false,
//     plugins: {
//       legend: {
//         display: true,
//         position: "top",
//       },
//     },
//   };

//   return (
//     <div className="battery-health-container">
//       <h2>Battery Health</h2>
//       <div className="chart-container">
//         <Line data={data} options={options} />
        
//       </div>
//     </div>
//   );
// };

// export default BatteryHealth;

// old code with no function 

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { FaBolt } from "react-icons/fa6";

const BatteryHealth = ({ valveId }) => {
    const [batteryInfo, setBatteryInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const { id } = useParams()

    useEffect(() => {
        const fetchBatteryInfo = async () => {
            if (!valveId) return; // Prevent request if valveId is not set

            try {
              const token = localStorage.getItem('token');
              console.log("token from batteryapi" ,token)
      
              if (!token) {
                console.warn('No auth token found at batteryapi');
                return null;
              }
              
                const response = await axios.get(`http://localhost:3001/api/displayBattery/${id}/${valveId}`,
                 {
                    headers: {
                      'Authorization': `Bearer ${token}`
                    }
                  });


                setBatteryInfo(response.data[0]);
                console.log("from battery api res: and param ",id, response.data[0])
            } catch (error) {
                console.error("Error fetching battery info:",id, error);
            } finally {
                setLoading(false);
            }
        };

        fetchBatteryInfo();
    }, [valveId,id]);

    return (
        <div>
            <h2>Battery Health</h2>
            {loading ? (
                <p>Loading battery info...</p>
            ) : batteryInfo ? (
              <div className="flex items-center bg-gradient-to-r from-[rgba(87,199,133,1)] to-[rgba(139,237,83,1)] 
              w-3/5 text-center mb-2 h-[5em] mx-auto rounded-md px-4 shadow-md gap-x-2 ">
                <p className="text-xs sm:text-lg mx-auto flex items-center gap-x-2 text-black">
                  Battery Status for this NODE is:
                  <FaBolt />
                  <span className="font-bold text-xl">{batteryInfo.batteryVoltage}</span> Volts
                </p>
              </div>
               
            ) : (
                <p>No battery data available.</p>
            )}
        </div>
    );
};

export default BatteryHealth;
