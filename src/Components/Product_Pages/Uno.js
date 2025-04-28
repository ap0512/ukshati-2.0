import React, { useState } from "react";
import "../Styles/Uno.css";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Card from "react-bootstrap/Card";
import Scheduling from "../Product_page_components/Scheduling.js"
import TapControl from "../Product_page_components/TapControl.js"
import History from "../Product_page_components/History.js"
import BatteryHealth from "../Product_page_components/BatteryHealth.js"
import Layout from "../Layouts/Layout.js";
import { useValve } from '../Utils/ValveContext.js';


const Uno = () => {
  const { valves, loading } = useValve(); 
  const [selectedValveId, setSelectedValveId] = useState(null);

  return (
    <Layout>
      <div className="Uno-section">
        <h1 className="Uno-title" style={{ paddingTop: "16px", color: "#0056b3", textShadow: "2px 2px 5px rgba(0, 0, 0, 0.5)" }}>
          UNO Controls
        </h1>

        

        <Card className="Uno-section-card ">
        <div className="mx-auto my-auto w-3/4">
            <div style={{ 
            margin: "1rem",
            display: "flex",
            justifyContent: "center", // centers items horizontally
            alignItems: "center",     // aligns items vertically (optional)
            gap: "1rem",  
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)" ,   
            padding: "10px" ,   
            borderRadius:"5px",
            }} >
            <label style={{ color: "black", margin: 0 ,fontSize:"2rem"}} for="valve-select">Select a valve: </label>
            {!loading && (
                <div class="select-wrapper" style={{
                    display: "flex",
                    alignItems: "center",
                    border: "1px solid #ccc",
                    borderRadius: "10px",         // now it should apply
                    // position: "relative", // if you're going to absolutely position the icon later
                  }}>
                <select id="valve-select"  onChange={(e) => setSelectedValveId(e.target.value)} defaultValue=""
                style={{
                    appearance: "none",           // <== this is the key
                    WebkitAppearance: "none",     // Safari support
                    MozAppearance: "none",        // Firefox support
                    borderRadius: "10px", 
                    fontSize: "1rem",
                    padding:"5px",
                    backgroundColor: "#ffffff",
                    color: "black",
                    cursor: "pointer",
                    width: "120%",
                    height: "40px",
                    outline: "none",
                  }}
                  >
                <option  value="" disabled></option>
                {valves.map((valve) => (
                    <option key={valve.valveID} value={valve.valveID}>
                    {valve.valveName}
                    </option>
                ))}
                </select>
                <img src="/New_Images/icons/down-arrow-svgrepo-com.svg" alt="Valve icon" 
                className="valve-icon" 
                style={{
                  width: "16px",
                  height: "16px",
                  pointerEvents: "none",    // don't block clicks
                  paddingRight: "3px"       // optional, but fixed the syntax
                }} />
                </div>
            )}
            </div>
            </div>


          <Tabs
            defaultActiveKey="Scheduling"
            id="justify-tab-example"
            className="Uno-section-card-tabs mb-3 px-2"
            justify
          >
            <Tab eventKey="Scheduling" title="Scheduling">
              {!loading && selectedValveId ? <Scheduling valveId={selectedValveId} /> : <p>Select a valve...</p>}
            </Tab>
            <Tab eventKey="TapControl" title="Tap Control">
              {!loading && selectedValveId ? <TapControl valveId={selectedValveId} /> : <p>Select a valve...</p>}
            </Tab>
            <Tab eventKey="History" title="History">
              {!loading && selectedValveId ? <History valveId={selectedValveId} /> : <p>Select a valve...</p>}
            </Tab>
            <Tab eventKey="BatteryHealth" title="Battery Health">
              {!loading && selectedValveId ? <BatteryHealth valveId={selectedValveId} /> : <p>Select a valve...</p>}
            </Tab>
          </Tabs>
        </Card>
      </div>
    </Layout>
  );
};

export default Uno;
