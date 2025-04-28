import axios from "axios";

export const fetchvalveid = async(id) => {

// const [valveID,setvalveID] = useState(null)
        try {
          // Get the token from localStorage or wherever you store it
          const token = localStorage.getItem('token');
          console.log(token)
  
          if (!token) {
            console.warn('No auth token found');
            return null;
          }
          
          const response = await axios.get(`http://localhost:3001/api/fetchValveID/${id}`, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });

          console.log("from valveidfetcher",response)
          return response;
        //   if (response.data.valveID){
        //     setvalveID(response.data.valveID)
  
        //   }
        }
        catch(error){
          console.warn("error fetching valveid" ,error,id)
        }
      
      
}