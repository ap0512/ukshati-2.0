import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "../Styles/Scheduling.css";
import axios from "axios";

const Scheduling = ({valveId}) => {
  const [startDate, setStartDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [duration, setDuration] = useState(30);
  const [weatherAutomation, setWeatherAutomation] = useState(false);
  const [status, setStatus] = useState("Not Scheduled");

  const payload = [
    {
      time: startTime,
      duration: parseInt(duration),
      scheduleChange: true,
      weatherAutomation,
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();


    try{
      if(!valveId) return;
  
      const token = localStorage.getItem('token')
      console.log("token from schedule component",token)
  
      if (!token){
        console.warn('No auth token found at batteryapi');
        return null;
      }
  
      await axios.put(`http://localhost:3001/api/updateSchedule/${valveId}`,
        payload,
        {
          headers:{
            'Authorization' :`Bearer ${token}`
          }
        })
      
  
      setStatus("Scheduled")
    }catch(error){
      console.error("Error updating schedule:", error);
      alert("Failed to schedule. Check console for details.");
    };



    // setCurrentSchedule({
    //   startDate: startDate || "Not set",
    //   startTime: startTime || "Not set",
    //   duration,
    //   weatherAutomation,
    //   status: "Scheduled",
    // });
  };

  return (
    <div className="scheduling-container">
      {/* Scheduling Input Card */}
      <Card className="mb-3 scheduling-card">
        <Card.Body>
          <Card.Title className="stitle">Set a Schedule</Card.Title>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="startDate">
              <Form.Label className="label">Select Date</Form.Label>
              <Form.Control
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="startTime" className="mt-3">
              <Form.Label className="label">Select Time</Form.Label>
              <Form.Control
                className="form-time"
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="durationSlider" className="mt-3">
              <Form.Label className="label">
                Select Duration: {duration} minutes
              </Form.Label>
              <Form.Range
                min="10"
                max="120"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="weatherAutomation" className="mt-3">
              <Form.Check
                type="checkbox"
                label="Enable Weather-based Automation"
                checked={weatherAutomation}
                onChange={(e) => setWeatherAutomation(e.target.checked)}
                className="label"
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="mt-3">
              Set Schedule
            </Button>
          </Form>
        </Card.Body>
      </Card>

      {/* Display Current Scheduling */}
     {/* Display Scheduled Info */}
      <Card className="scheduling-card">
        <Card.Body>
          <Card.Title className="stitle">Current Schedule</Card.Title>
          <p><strong>Start Date:</strong> {startDate || "Not set"}</p>
          <p><strong>Start Time:</strong> {startTime || "Not set"}</p>
          <p><strong>Duration:</strong> {duration} minutes</p>
          <p><strong>Status:</strong> {status}</p>
          <p>
            <strong>Weather-based Automation:</strong>{" "}
            {weatherAutomation ? "Enabled" : "Disabled"}
          </p>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Scheduling;




// const [currentSchedule, setCurrentSchedule] = useState({
//   startDate: "",
//   startTime: "",
//   duration: 30,
//   weatherAutomation: false,
//   status: "Not Scheduled",
// });