import axios from "axios"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function UserPage(props) {
    const[isLoading,setIsLoading]=useState(false)
    const[isLoggedin, setIsLoggedin]=useState(false)
const handleLoad=(event)=>{
    setIsLoading(true)
    axios(
        {
            method: "get",
            url: "api/dashboard"
        }
    ).then((response) => {
        console.log(response.data)
        setIsLoading(false)
        setIsLoggedin(true)
        if (!response.data)
            {navigate("/login")
        }
            
    })

}
    const navigate = useNavigate();
    useEffect(() => {
    //     // Code to run when the component mounts (page loads)
    //     // Add your event listener here
    //     window.addEventListener('load', handleLoad);
    
    //     // Code to clean up the event listener when the component unmounts (page unloads)
    //     return () => {
    //       window.removeEventListener('load', handleLoad);
    //     };
    handleLoad()
      }, []);
function handleclick(event){
    axios(
        {
            method: "post",
            url: "api/logout"
        }
    ).then((response) => {
        console.log(response.data)
        if (!response.data)
            navigate("/login")
    })
}
    
    return isLoggedin&&<div>
        <h1>Hello User</h1>
        <button type="submit" onClick={handleclick}> Logout</button>
        {isLoading &&<h2>Loading...</h2>}
        
    </div>

}
export default UserPage