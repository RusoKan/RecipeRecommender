import axios from "axios"
import Button from "../Shared/FormElement/Button"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserNavigationBar from "../Shared/Component/UserNavigationBar";
import {useLocation} from 'react-router-dom';



function UserPage(props) {
    const [CurrentAccountData,setCurrentAccountData]=useState(null)
    const [dataFetched, setDataFetched] = useState(false);
    // const location = useLocation();
    // const[isLoading,setIsLoading]=useState(false)
    useEffect(()=>{
        axios.get("/api/dashboard")
        .then(response=>{
            setCurrentAccountData(response.data)
            setDataFetched(true)
        })
    },[])
    
    
// }
    const navigate = useNavigate();

function handleclick(event){
    axios(
        {
            method: "post",
            url: "/api/logout"
        }
    ).then((response) => {
        console.log(response.data)
        if (!response.data)
            navigate("/login")
    })
}
if (!dataFetched ) {
    return <>Still loading...</>;
  }
    
    return <div>
    <UserNavigationBar handleclick={handleclick}/>
    
        <h1>Hello {CurrentAccountData.first_name} </h1>
    
        
        
    </div>

}
export default UserPage