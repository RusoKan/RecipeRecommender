import { useNavigate } from "react-router-dom";
import Button from "../Shared/FormElement/Button";
import Card from "../Shared/Wrapper/Card";

function PageNotFound(props) {
    const navigate=useNavigate()
const  handleclick=()=>{
    navigate("/")
}
    return <Card>
        <h1 className="RecipeTitle PageTitle">Uh Oh! Something Went Wrong.. </h1>
        <h2 className="flexcentered SubTitle">Please, Try Again Later.</h2>
        <br/>

        <div className="flexcentered" onClick={handleclick}><Button style="primary"> Return to Home page</Button></div>

    </Card>

    
}
 export default PageNotFound;