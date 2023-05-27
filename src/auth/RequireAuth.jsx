import React, { useEffect, useState ,useContext  } from "react";
import axios from "axios";
import { Navigate ,Outlet } from "react-router-dom";


function RequireAuth(props) {
    const [authentication, setAuthentication] = useState(null);
    const [dataFetched, setDataFetched] = useState(false);
  
    useEffect(() => {
        axios.get("/api/authenticationCheck")
          .then(response => {
            setAuthentication(response.data);
            setDataFetched(true)
            console.log("authentication",response.data)
          })
          .catch(error => {
            console.log(error)
          });
      }, []);

   
    if (!dataFetched ) {
        return <>Still loading...</>;
      }
    
   
    return (authentication
      ? <Outlet/>
      : <Navigate to="/login"  />
)

}



export default RequireAuth;