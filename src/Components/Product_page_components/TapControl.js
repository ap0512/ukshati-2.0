import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import "../Styles/Tapcontrol.css";
import axios from "axios";

const TapControl = ({ valveId }) => {
  const [isTapOn, setIsTapOn] = useState(false);
  const [city, setCity] = useState("Mangalore");
  const [weatherData, setWeatherData] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isLoading, setIsLoading] = useState(false);

  // Fetch the current tap status when component mounts
  useEffect(() => {
    if (valveId) {
      fetchTapStatus();
    }
  }, [valveId]);

  // Function to fetch current tap status
  const fetchTapStatus = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.warn('No auth token found');
        return;
      }
      
      // You would need to create an API endpoint to get the current status
      // This is a placeholder - you may need to adjust based on your API
      const response = await axios.get(`http://localhost:3001/api/displaySchedule/${valveId}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      // Assuming your API returns the schedule with an onoff property
      if (response.data && response.data.length > 0) {
        setIsTapOn(response.data[0].onoff === 1);
      }
    } catch (error) {
      console.error("Error fetching tap status:", error);
    }
  };

  const toggleTap = async (e) => {
    e.preventDefault();
    
    if (!valveId) {
      console.warn("No valve ID provided");
      return;
    }
    
    setIsLoading(true);
    
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.warn('No auth token found at taponoffapi');
        setIsLoading(false);
        return;
      }
      
      // Create the payload in the format expected by the backend
      // The backend expects an array of schedule objects
      const payload = [
        {
          onoff: isTapOn ? 0 : 1 // Toggle between 0 (off) and 1 (on)
        }
      ];
      
      // Make the PUT request to update the schedule
      await axios.put(
        `http://localhost:3001/api/updateTaponoff/${valveId}`,
        payload,
        {
          headers: { 'Authorization': `Bearer ${token}` }
        }
      );
      
      // Update the local state if the request was successful
      setIsTapOn(!isTapOn);
      
    } catch (error) {
      console.error("Error toggling tap:", error);
      alert("Failed to turn on/off tap. Check console for details.");
    } finally {
      setIsLoading(false);
    }
  };

  // Function to format the current time
  const getFormattedTime = (date) => {
    return (
      date.getHours().toString().padStart(2, "0") +
      ":" +
      date.getMinutes().toString().padStart(2, "0") +
      ":" +
      date.getSeconds().toString().padStart(2, "0")
    );
  };

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  
  const month = currentTime.getMonth();
  const day = currentTime.getDate();
  const year = currentTime.getFullYear();
  const formattedDate = `${months[month]} ${day}, ${year}`;

  const API_KEY = "cbc279b2a6fc2027db989296e5c35428";
  
  const fetchWeatherData = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      setWeatherData(response.data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  // Update the time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    fetchWeatherData();
  }, [city]);

  return (
    <div className="tapControl-container">
      <Card className="tap-control-card">
        <div>
          <h4>{formattedDate}</h4>
          <h2>{getFormattedTime(currentTime)}</h2>
          <h3>{city}</h3>
          {weatherData ? (
            <p>
              Temperature: {weatherData.main.temp}°C | Weather:{" "}
              {weatherData.weather[0].description} | Wind Speed:{" "}
              {weatherData.wind.speed} m/s
            </p>
          ) : (
            <p>Loading weather data...</p>
          )}
        </div>
        <Card.Body>
          <Card.Title className="tap-title">Tap Control</Card.Title>
          <p>
            <strong>Status:</strong> {isTapOn ? "Tap is ON" : "Tap is OFF"}
          </p>
          <Button 
            variant={isTapOn ? "danger" : "success"} 
            onClick={toggleTap}
            disabled={isLoading}
          >
            {isLoading ? "Processing..." : (isTapOn ? "Turn Off Tap" : "Turn On Tap")}
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default TapControl;