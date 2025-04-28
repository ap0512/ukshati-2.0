import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import Pagination from "react-bootstrap/Pagination";
import axios from "axios";
import "../Styles/History.css";

const History = ({ valveId }) => {
  const [wateringData, setWateringData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  useEffect(() => {
    const fetchWateringData = async () => {
        if (!valveId) return; // Prevent request if valveId is not set

        try {
          const token = localStorage.getItem('token');
          console.log("token from historyapi" ,token)
  
          if (!token) {
            console.warn('No auth token found at history api');
            return null;
          }
          
            const response = await axios.get(`http://localhost:3001/api/displayHistory/${valveId}`,
             {
                headers: {
                  'Authorization': `Bearer ${token}`
                }
              });


            setWateringData(response.data);
            console.log("from history api res:", response.data)
        } catch (error) {
            console.error("Error fetching History info:", error);
        }
    };

    fetchWateringData();
}, [valveId]);



  // useEffect(() => {
  //   const fetchWateringData = async () => {
  //     try {
  //       const response = await axios.get(`http://localhost:3001/api/displayHistory/${valveId}`);
  //       setWateringData(response.data);
  //       console.log("history",response)
  //     } catch (error) {
  //       console.error("Error fetching watering history:", error);
  //     }
  //   };

  //   if (valveId) {
  //     fetchWateringData();
  //   }
  // }, [valveId]);




  const totalPages = Math.ceil(wateringData.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = wateringData.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="watering-history-container">
      <h2 className="history-title">Watering History</h2>
      <Table striped bordered hover className="history-table">
        <thead>
          <tr>
            <th>Date and Time</th>
            <th>Duration (mins)</th>
            <th>Volume (liters)</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((item, index) => (
            <tr key={index}>
              <td>{new Date(item.wateredDateTime).toLocaleString()}</td>
              <td>{item.wateredDuration}</td>
              <td>{item.waterVolume}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Pagination>
        <Pagination.First
          onClick={() => handlePageChange(1)}
          disabled={currentPage === 1}
        />
        <Pagination.Prev
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        />
        {[...Array(totalPages)].map((_, pageIndex) => (
          <Pagination.Item
            key={pageIndex + 1}
            active={pageIndex + 1 === currentPage}
            onClick={() => handlePageChange(pageIndex + 1)}
          >
            {pageIndex + 1}
          </Pagination.Item>
        ))}
        <Pagination.Next
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        />
        <Pagination.Last
          onClick={() => handlePageChange(totalPages)}
          disabled={currentPage === totalPages}
        />
      </Pagination>
    </div>
  );
};

export default History;
