import axios from 'axios';
import { useState,useEffect } from 'react';
import { Card} from 'react-bootstrap';
import Button from '../FormElement/Button';

function RecipeCard(props) {
    const [recipe,setRecipe]=useState([])
    const data={
        search:props.RecipeID
    }
     useEffect(()=>{
        
        axios.post("/api/getOneRecipeFromID",data)
        .then(response=>{
            setRecipe(response.data)
            console.log(response.data)
        })
     },[])
    return<>
        {console.log("REC",recipe)}
        <Card onClick={() => props.handleClickRecipe(recipe.id)} className="ZoomEffect" style={{ width: '18rem' }}>
                                <Card.Img variant="top" src={recipe.Image} />
                                <Card.Body className="MyCardBodyimageResponsiveness">
                                    <Card.Title className="MyRecipeTitle logoColor">{recipe.mealName}</Card.Title>
                                    <Card.Text>
                                        {recipe.MealCategory}
                                        <br />
                                        {recipe.Area}
                                    </Card.Text>
                                    
                                    <Button onClick={() => props.handleClickRecipe(recipe.id)} style="primary">Show me the Recipe!</Button>
                                </Card.Body>
                            </Card>

    </>
}
export default RecipeCard