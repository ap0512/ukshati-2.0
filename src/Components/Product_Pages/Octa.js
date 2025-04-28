import React, { useState, useEffect } from "react";
import BatteryHealth from "../Product_page_components/BatteryHealth.js";
import FlowMeter from "../Product_page_components/FlowMeter.js";
import ValveControl from "../Product_page_components/ValveControl.js";
import "../Styles/Octa.css";
import Layout from "../Layouts/Layout.js";
import { useValve } from '../Utils/ValveContext.js';

const NodesHeader = ({ nodes, selectedNode, onNodeSelect }) => {
  return (
    <div className="nodes-header">
      {nodes.map((node, index) => (
        <button
          key={index}
          className={`node-button ${
            selectedNode && selectedNode.nodeId === node.nodeId ? "active" : ""
          }`}
          onClick={() => onNodeSelect(node)}
        >
          {node.nodeName}
        </button>
      ))}
    </div>
  );
};

const NodeCard = ({ node, onButtonClick }) => {
  return (
    <div className="node-card Octa-card">
      <h3 className="node-title">{node.nodeName}</h3>
      <button className="Octa-btn" onClick={() => onButtonClick("battery")}>
        Battery Health
      </button>
      <button className="Octa-btn" onClick={() => onButtonClick("flowmeter")}>
        Flowmeter
      </button>
      {node.valves.map((valve, index) => (
        <button
          key={index}
          className="Octa-btn"
          onClick={() => onButtonClick(`valveControl_${index}`, valve)}
        >
          {valve.valveName || `Valve ${index + 1}`}
        </button>
      ))}
    </div>
  );
};

const ControlCard = ({ controlType, node, selectedValve }) => {
  const renderControlDetails = () => {
    if (controlType === "battery") {
      console.log("this from octa son",node.valves[0].valveID);
      return <BatteryHealth valveId={node.valves[0].valveID} />;
    } else if (controlType === "flowmeter") {
      return <FlowMeter flowRate={node.flowmeter} />;
    } else if (controlType && controlType.startsWith("valveControl_")) {
      console.log("the valvecontrol debug object", selectedValve)
      return <ValveControl valve={selectedValve.valveID} />;
    } else {
      return <div>Select a control to view details</div>;
    }
  };

  return (
    <div className="control-card Octa-card">
      <h4 className="Octa-title">Control Details</h4>
      {renderControlDetails()}
    </div>
  );
};

// Main Octa component
const Octa = () => {
  // Use the valve hook here, inside the function component
  const { valves, loading } = useValve();
  
  const [selectedNode, setSelectedNode] = useState(null);
  const [controlType, setControlType] = useState(null);
  const [selectedValve, setSelectedValve] = useState(null);
  const [nodes, setNodes] = useState([]);
  
  // Process the valve data into the nodes structure when valves change
  useEffect(() => {
    if (!loading && valves) {
      // Transform the valve data into the node structure
      // This is just an example transformation based on your comments
      // You'll need to adjust this according to your actual data structure
      const nodeMap = {};
      
      valves.forEach(valve => {
        // Assuming each valve has a nodeId property to associate it with a node
        if (!nodeMap[valve.nodeId]) {
          nodeMap[valve.nodeId] = {
            nodeId: valve.nodeId,
            nodeName: valve.nodeName || `Node ${valve.nodeId}`,
            valves: []
          };
        }
        
        nodeMap[valve.nodeId].valves.push(valve);
      });
      
      // Convert the map to an array
      setNodes(Object.values(nodeMap));
    }
  }, [valves, loading]);

  const handleNodeSelect = (node) => {
    setSelectedNode(node);
    setControlType(null);
    setSelectedValve(null);
  };

  const handleButtonClick = (control, valve = null) => {
    setControlType(control);
    setSelectedValve(valve);
  };

  if (loading) {
    return <div>Loading valve data...</div>;
  }

  return (
    <>
      <Layout>
        <section className="Octa-section">
          <div className="Octa-header">
            <h1 className="Octa-title pt-16">Octa Dashboard</h1>
          </div>
          
          {/* Nodes Header */}
          <NodesHeader
            nodes={nodes}
            selectedNode={selectedNode}
            onNodeSelect={handleNodeSelect}
          />
          
          <div className="Octa-content">
            {/* Left Side: Node Card */}
            {selectedNode && (
              <NodeCard
                node={selectedNode}
                onButtonClick={handleButtonClick}
              />
            )}
            
            {/* Right Side: Control Card */}
            {controlType && selectedNode && (
              <ControlCard
                controlType={controlType}
                node={selectedNode}
                selectedValve={selectedValve}
              />
            )}
          </div>
        </section>
      </Layout>
    </>
  );
};

export default Octa;