import UserNavigationBar from "../Shared/Component/UserNavigationBar"
import Card  from 'react-bootstrap/Card';
import ContainerCard from "../Shared/Wrapper/Card";
import Button from "../Shared/FormElement/Button";
import { useEffect, useState } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from "axios";
import { Modal } from "react-bootstrap";
import RecipeContainer from "../Shared/Component/RecipeContainer";
import "./MyRecipe.css"
function MyRecipes(props) {
const[RecipeCardInfo,setRecipeCardInfo]=useState([])
const[RecentlyAddedRecipes,setRecentlyAddedRecipes]=useState([])
const [ShowRecentlyAddedRecipes,setShowRecentlyAddedRecipes]=useState(false)
const [ShowRecipeModal,setShowRecipeModal]=useState(false)
const[recipeData,setRecipeData]=useState({})
    useEffect(()=>{
        axios.get("/api/MyrecipefromID")
        .then(response=>{
            console.log(response.data)
            setRecipeCardInfo(response.data)
        })
    },[])
    useEffect(()=>{
        axios.get("/api/latestAddedRecipe")
        .then(response=>{
            setRecentlyAddedRecipes(response.data)
            console.log(response.data)
            if(response.data.length!=0){
                setShowRecentlyAddedRecipes(true)
            }
        })
    },[])
    
function handleClickRecipe(value) {
    const data={search:value}
    
    axios.post("/api/RecipefromID",data)
    .then((response)=>{
        const meal=response.data.meals[0]
        console.log(meal)
        let ingredients=[]
        const Number_of_ingredients=20
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
            console.log(meal.strYoutube)
    })
    setShowRecipeModal(true)
    console.log(value)
    
}


   return <>
    
       <UserNavigationBar/>
       {ShowRecentlyAddedRecipes&&<h3 className="RecentlyAddedStyle">Recently Added Recipes</h3>}
       <Container fluid  >
       <Row className="RecipeImageContainer">
       
       {RecentlyAddedRecipes.map(recipe=>{
        return   <Col key={recipe.id} m={3}>
            <Card onClick={()=>handleClickRecipe(recipe.id)} className="ZoomEffect"  style={{ width: '18rem' }}>
              <Card.Img  variant="top" src={recipe.Image} />
              <Card.Body className="MyCardBodyimageResponsiveness">
                <Card.Title className="MyRecipeTitle">{recipe.mealName}</Card.Title>
                <Card.Text>
                  {recipe.MealCategory}
                  <br/>                 
                  {recipe.Area}
                </Card.Text>
                <Button onClick={()=>handleClickRecipe(recipe.id)} style="primary">Show me the Recipe!</Button>
              </Card.Body>
            </Card>
            </Col>

            
            })}

       </Row>
       </Container>
        <h1 className="RecipeTitle PageTitle">Saved Recipes</h1>

    
            <Container fluid  >
            <Row className="RecipeImageContainer">
            {RecipeCardInfo.map(recipe=>{
                
             return   <Col  m={3} key={recipe.id}>
            <Card onClick={()=>handleClickRecipe(recipe.id)} className="ZoomEffect" style={{ width: '18rem' }}>
              <Card.Img  variant="top" src={recipe.Image} />
              <Card.Body className="MyCardBodyimageResponsiveness">
                <Card.Title className="MyRecipeTitle">{recipe.mealName}</Card.Title>
                <Card.Text>
                  {recipe.MealCategory}
                  <br/>                 
                  {recipe.Area}
                </Card.Text>
                <Button onClick={()=>handleClickRecipe(recipe.id)} style="primary">Show me the Recipe!</Button>
              </Card.Body>
            </Card>
            </Col>
            
            })}
          
          </Row>
        </Container>
        

    <Modal
      show={ShowRecipeModal}
      onHide={() => setShowRecipeModal(false)}
      size="xl"
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
          
                mealImg={recipeData.mealImg}
                mealName={recipeData.mealName}
                mealtag={recipeData.mealtag}
                mealCategory={recipeData.mealCat}
                mealLink={recipeData.mealLink}
                SetAddRecipeButton={false}
                mealIngredients={recipeData.mealIngredients}
                mealInstruction={recipeData.mealInstruction}
                />
     
      </Modal.Body>
     
      <Modal.Footer>
        <Button style="primary" onClick={()=>setShowRecipeModal(false)}>Close</Button>
      </Modal.Footer>
    </Modal>
  
           
    
</>
}
export default MyRecipes