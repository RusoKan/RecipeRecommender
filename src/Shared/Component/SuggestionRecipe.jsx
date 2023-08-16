import { useEffect ,useState } from "react"
import "./SuggestionRecipe.css"
import axios from "axios"
import {  Row, Col, Container, Modal} from 'react-bootstrap';
import RecipeCard from "./RecipeCard";
function SuggestionRecipe(props) {
    const [RecipeID,setRecipeID]=useState([])
    const [Datafetched,setDataFetched]=useState(false)
    useEffect(() => {
        axios.get("/api/SuggestionRecipe")
            .then(response => {
                setRecipeID(response.data.mealID)
                setDataFetched(true)
            })
    }, [])
    if(!Datafetched)
        return<>Loading</>

    return <>
        <h1 className="title">Our Suggestion for You today.</h1>
        <Container fluid>
        <Row>
        {RecipeID.map((value, index)=>{
           return <Col key={value}>
            <RecipeCard
            RecipeID={value}
            />
            </Col>
            
        })}
        

        </Row>
        

        </Container>
        
    </>
}
export default SuggestionRecipe