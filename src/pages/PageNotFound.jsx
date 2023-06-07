import { useNavigate } from "react-router-dom";
import Button from "../Shared/FormElement/Button";
import Card from "../Shared/Wrapper/Card";

function PageNotFound(props) {
    const navigate=useNavigate()
const  handleclick=()=>{
    navigate("/")
}
    return <Card>
        <h1>Uh Oh! Something Went Wrong.. :(</h1>
        <h2 className="flexcentered">Please, Try Again Later</h2>
        <br/>

        <div className="flexcentered" onClick={handleclick}><Button style="primary"> Go back</Button></div>

    </Card>

    
}
 export default PageNotFound;