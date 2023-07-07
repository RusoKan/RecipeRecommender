import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from '../FormElement/Button';
import Buttons from 'react-bootstrap/Button';
import Rating from './RatingRecipe';
function RecipeContainer(props) {
    // const {SetAddRecipeButton=false,SetAddReviewButton=false}=props
   return <Container fluid>
      <Row className="RecipeRow">
        <Col md={5} className="RecipeImageContainer">
        <img className="RecipeImage " src={props.mealImg} alt="Meal-Img" />
        </Col>
        <Col className="RecipeInfoContainer"  >
        <h2 className="RecipeTitle">{props.mealName}</h2>
        <h4 className="RecipeTag">{props.mealtag}</h4>
        <h5>{props.mealCategory}</h5>
        
        {props.SetAddRecipeButton&&<Button onClick={props.handleAddRecipe} style="primary">Add to Your Recipe!</Button>}
        <a target="_blank" href={props.mealLink}>Learn to make it through watching!</a>
        
        {props.SetAddReviewButton&&<Button onClick={props.handleReview}style="primary">Leave us a review</Button>}
        </Col>
      </Row>
      
      <hr className="seperator" />
      <Row>
        <Col  md={5}>
        <h3 className="RecipeStrucutre">Ingredients</h3>
        {props.mealIngredients?.map((value,index)=>{
            return <ul key={index}><li>{value}</li></ul>
        })}
        </Col>
        <Col>
        <h3 className="RecipeStrucutre">Instruction</h3>
        <p>{props.mealInstruction}</p>
        </Col>
        
      </Row>
    </Container>
    
}
export default RecipeContainer