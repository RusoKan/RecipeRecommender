import axios from "axios"
import UserNavigationBar from "../Shared/Component/UserNavigationBar"
import { useEffect,useState } from "react"
import SearchBar from "../Shared/Component/SearchBar"
import Card from "../Shared/Wrapper/Card"
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from "../Shared/FormElement/Button"
import Modal from 'react-bootstrap/Modal';
import "./Recipes.css"
import RecipeContainer from "../Shared/Component/RecipeContainer"


function Recipes() {
  const [RecipeFound,SetRecipeFound]=useState(false)
    const[recipeData,setRecipeData]=useState({})
    const [lgShow, setLgShow] = useState(false);
    const [modalMessage, setModalMessage] = useState("");
const handleSearch=(value)=>{
 const data={
    search:value
 }
    axios.post("/api/recipeFinderByName",data)
    .then((response)=>
    {
        SetRecipeFound(true)
    
     const meal=response.data.meals[0]
     
     const Number_of_ingredients=20
     let ingredients=[]
     console.log(meal[`strIngredient18`])
        for (let index = 1; index < Number_of_ingredients; index++) {
            if(meal[`strIngredient${index}`]!="" )
            if(meal[`strIngredient${index}`])
            {
               let Ingredient=meal[`strMeasure${index}`]+ " "+meal[`strIngredient${index}`]
                ingredients.push(Ingredient)
            }
            
        }

        setRecipeData({
            mealName:meal.strMeal,
            mealCat:meal.strCategory,
            mealImg:meal.strMealThumb,
            mealtag:meal.strTags,
            mealInstruction:meal.strInstructions,
            mealLink:meal.strYoutube,
            mealIngredients:ingredients,
            mealID:meal.idMeal,
        })

    })
    .catch(error=>{
    console.log("Uh oh! Recipe does not exist in our database.")
    })

}
 function handleAddRecipe() {
    const data={
        mealID:recipeData.mealID
    }
    axios.put("/api/updateRecipe",data)
    .then((response)=>{
        console.log(response)
        if (response.status==201){
            setLgShow(true)
            setModalMessage(response.data.msg)
        }
         
    })
    .catch((error)=>{
        setLgShow(true)
        setModalMessage(error.response.data.msg); 
    })
    
 }   


    // if(!dataFetched)
    // return <h1>Loading..</h1>

    return <>
        <UserNavigationBar/>
        <SearchBar Search={handleSearch}/>
        {RecipeFound&&<Card>
            <RecipeContainer 
            mealImg={recipeData.mealImg}
            mealName={recipeData.mealName}
            mealtag={recipeData.mealtag}
            mealCategory={recipeData.mealCat}
            handleAddRecipe={handleAddRecipe}
            SetAddRecipeButton={true}
            mealLink={recipeData.mealLink}
            mealIngredients={recipeData.mealIngredients}
            mealInstruction={recipeData.mealInstruction}
            />
        {/* <Container fluid>
      <Row className="RecipeRow">
        <Col md={4} className="RecipeImageContainer">
        <img className="RecipeImage " src={recipeData.mealImg} alt="Meal-Img" />
        </Col>
        <Col className="RecipeInfoContainer"  >
        <h2 className="RecipeTitle">{recipeData.mealName}</h2>
        <h4 className="RecipeTag">{recipeData.mealtag}</h4>
        <h5>{recipeData.mealCat}</h5>
        
        <Button onClick={handleAddRecipe} style="primary">Add to Your Recipe!</Button>
        
       
        </Col>
      </Row>
      
      <hr className="seperator" />
      <Row>
        <Col  md={3}>
        <h3 className="RecipeStrucutre">Ingredients</h3>
        {recipeData.mealIngredients?.map((value,index)=>{
            return <ul key={index}><li>{value}</li></ul>
        })}
        </Col>
        <Col>
        <h3 className="RecipeStrucutre">Instruction</h3>
        <p>{recipeData.mealInstruction}</p>
        </Col>
        
      </Row>
    </Container> */}

        </Card>}
        <Modal
        size="lg"
        show={lgShow}
        onHide={() => setLgShow(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            Adding to your list of recipes
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalMessage}</Modal.Body>
      </Modal>
    </>



    
}
export default Recipes