import UserNavigationBar from "../Shared/Component/UserNavigationBar"
import Card from 'react-bootstrap/Card';
import Button from "../Shared/FormElement/Button";
import { useEffect, useState } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from "axios";
import "./MyRecipe.css"
function MyRecipes(props) {
const[RecipeCardInfo,setRecipeCardInfo]=useState([])
    useEffect(()=>{
        axios.get("/api/recipeFinderbyID")
        .then(response=>{
            console.log(response.data)
            setRecipeCardInfo(response.data)
        })
    },[])
    
   return <>
    
       <UserNavigationBar/>
        <h1 className="RecipeTitle">My Recipes</h1>
        <Container fluid   >
        <Row className="RecipeImageContainer">
        {RecipeCardInfo.map(recipe=>{
            
         return   <Col m={4}>
        <Card style={{ width: '18rem' }}>
          <Card.Img  variant="top" src={recipe.Image} />
          <Card.Body>
            <Card.Title className="MyRecipeTitle">{recipe.mealName}</Card.Title>
            <Card.Text>
              {recipe.MealCategory}
              <br/>                 
              {recipe.Area}
            </Card.Text>
            <Button style="primary">Show me the Recipe!</Button>
          </Card.Body>
        </Card>
        </Col>
        
        })}
      

        


        
      </Row>
     
    </Container>
    
           
    
</>
}
export default MyRecipes