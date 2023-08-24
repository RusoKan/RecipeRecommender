import { useEffect ,useState } from "react"
import "./SuggestionRecipe.css"
import axios from "axios"
import {  Row, Col, Container, Modal} from 'react-bootstrap';
import RecipeCard from "./RecipeCard";
import RecipeContainer from "./RecipeContainer";
import Button from "../FormElement/Button";
import Buttons from 'react-bootstrap/Button';
import PlaceholderCard from "./PlaceholderCard";
function SuggestionRecipe(props) {
    const [RecipeID,setRecipeID]=useState([])
    const [Datafetched,setDataFetched]=useState(false)
    const [ShowRecipeModal, setShowRecipeModal] = useState(false)
    const [recipeData,setRecipe]=useState({})
    useEffect(() => {
        axios.get("/api/SuggestionRecipe")
            .then(response => {
                setRecipeID(response.data.mealID)
                setDataFetched(true)
            })
    }, [])
    


 const handlingRecipeClick=(recipe=>{
    
    setRecipe(recipe)
    console.log("INFOE",recipe)
    setShowRecipeModal(true)
 })
 if(!Datafetched)
        return<>
        <Container fluid>
        <Row>
        {Array(3).fill().map((value,index)=>{
            
            return <Col key={index}>
            <PlaceholderCard/>
            </Col>
        })}
</Row>
</Container>
        </>

    return <>
        <h1 className="title">Our Suggestion for You today.</h1>
        <Container fluid>
        <Row className="RecipeImageContainer">
        {RecipeID.map((value, index)=>{
           return <Col key={value}>
            <RecipeCard
            RecipeID={value}
            handleClickRecipe={handlingRecipeClick}
            />
            </Col>
            
        })}
        

        </Row>
        

        </Container>
        <Modal
            show={ShowRecipeModal}
            onHide={() => setShowRecipeModal(false)}
            
            fullscreen={true}
            backdrop="static"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Recipe
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <RecipeContainer
                    mealID={recipeData.mealID}
                    mealImg={recipeData.mealImg}
                    mealName={recipeData.mealName}
                    mealtag={recipeData.mealtag}
                    mealCategory={recipeData.mealCategory}
                    mealLink={recipeData.mealLink}
                    SetRemoveRecipeButton={false}
                    SetAddReviewButton={true}
                    handleReview={() => setshowReviewModal(true)}
                    mealIngredients={recipeData.mealIngredients}
                    mealInstruction={recipeData.mealInstruction}
                    // AddAllIngredientsToShoppingList={handleAddAllIngredientsToShoppingList}
                />

            </Modal.Body>

            <Modal.Footer>
                <Button style="primary" onClick={() => setShowRecipeModal(false)}>Close</Button>
            </Modal.Footer>
        </Modal>
        
    </>
}
export default SuggestionRecipe