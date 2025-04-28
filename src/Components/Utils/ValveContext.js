import { createContext, useContext, useState, useEffect } from "react";
import { fetchvalveid } from "./valveidfetcher";
import { useParams } from "react-router-dom";

const ValveContext = createContext();

export const ValveProvider = ({ children }) => {
    // const { productName } = useParams(); // Get product name from URL
    const [valves, setValveId] = useState([]);
    const [loading, setLoading] = useState(true);
    const {id} = useParams()

  useEffect(() => {
    async function valveidfetch(){
        try{
            const response = await fetchvalveid(id);
            const fullresponse = response.data;

            const allValves = fullresponse.flatMap(node => 
                node.valves.map(valve => ({
                  ...valve,
                  nodeId: node.nodeId,
                  nodeName: node.nodeName
                }))
              );
                
        if (allValves) {
            setValveId(allValves);  // Accessing the valveId from the returned data
            console.log("got the valve response",allValves);
          } 
          else {
            console.error("ValveId not found in the response");
          }

        }catch (error) {
            console.error("Error fetching valveId:", error);
        } finally {
            setLoading(false);
        }

  }   
  valveidfetch()
  },[id]);

    return (
        <ValveContext.Provider value={{ valves, loading }}>
            {children}
        </ValveContext.Provider>
    );
};

export const useValve = () => useContext(ValveContext);
