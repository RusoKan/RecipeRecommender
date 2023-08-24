import axios from "axios"
import Button from "../Shared/FormElement/Button"
import { useEffect, useState, createContext,  } from "react";
import { useLocation, useNavigate ,useParams } from "react-router-dom";
import UserNavigationBar from "../Shared/Component/UserNavigationBar";
import "./UserPage.css"
import SuggestionRecipe from "../Shared/Component/SuggestionRecipe";
import { Row, Col, Container, Modal, Form } from 'react-bootstrap';
import Card from "../Shared/Wrapper/Card";

export const UserContext = createContext();



function UserPage(props) {
    const parameter  = useParams();

    // const { pickIndex } = state || {};
// console.log(pickIndex)
    console.log("MY ID",);
    const [CurrentAccountData,setCurrentAccountData]=useState(null)
    const [dataFetched, setDataFetched] = useState(false);
    // const location = useLocation();
    // const[isLoading,setIsLoading]=useState(false)
    useEffect(()=>{
        
        console.log("useEffect")
        axios.get("/api/dashboard")
        .then(response=>{
            console.log("CurrentApiData",response.data)
            setCurrentAccountData(response.data)
            setDataFetched(true)
        })
        
    },[])
    
    
// }
    const navigate = useNavigate();


if (!dataFetched ) {
    return <>Still loading...</>;
  }
  console.log("CurrentAccountData:", CurrentAccountData);
    return <div>

    
    <UserNavigationBar id={parameter.user} />
    
    
    <h1 className="HomePageTitle  " > Welcome <span className="TitleCase" >{CurrentAccountData.first_name}</span>  ! </h1>
    <Card>
    <SuggestionRecipe/>

    </Card>

    

    
        
        
    </div>

}
export default UserPage