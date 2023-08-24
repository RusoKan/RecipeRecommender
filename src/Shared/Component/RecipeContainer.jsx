import Container from 'react-bootstrap/Container';
import { Row, Col,  Modal, Form  } from 'react-bootstrap';

import Button from '../FormElement/Button';
import Buttons from 'react-bootstrap/Button';
import Rating from './RatingRecipe';
import ReactStars from "react-rating-stars-component";
import "./RecipeContainer.css"
import axios from 'axios';
import { useEffect, useState, useRef } from "react";
import CreateModal from './Modal';
function RecipeContainer(props) {
  const inputRef = useRef({});
  const [showReviewModal, setshowReviewModal] = useState(false)
  const [showIngredientModal, setshowIngredientModal] = useState(false)
    // const {SetAddRecipeButton=false,SetAddReviewButton=false}=props
    const handleReview = (event) => {
      console.log(props.mealID)
      console.log(inputRef.current.ratingText.value)
      console.log(inputRef.current.ratingStar)
      const data={
          
          RecipeId:props.mealID,
          ratingStar:(typeof inputRef.current.ratingStar === 'undefined') ? 1: inputRef.current.ratingStar,
          ratingText:inputRef.current.ratingText.value,
          
      }
      console.log(data)
      axios.post("/api/ReviewForRecipe",{data})
      .then((response)=>{
        console.log("CLOSING")
        
      })
      setshowReviewModal(false)
  }
  function handleAddAllIngredientsToShoppingList() {
    const  data={
        RecipeId:props.mealID
    }
    
    axios.put("/api/AddingIngredientsToShoppingList",data )
    .then(response=>{
        console.log(response.data)
        setshowIngredientModal(true)
    })
    .catch(response=>{
        
    })
  }


   return <>
     <Container fluid>
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
          
          {props.SetAddReviewButton&&<Button onClick={()=>setshowReviewModal(true)} style="primary">Leave us a review</Button>}
          </Col>
        </Row>
        
        <hr className="seperator" />
        <Row>
          <Col  md={5}>
          <h3 className="RecipeStrucutre">Ingredients</h3>
          {props.mealIngredients?.map((value,index)=>{
              return <ul key={index}><li>{value}</li></ul>
          })}
          <div className="IngredientButton">
          <Button onClick={handleAddAllIngredientsToShoppingList} style="primary">Add all Ingredients to Shopping List</Button>
          </div>
          <hr className='toggleLine'/>
          </Col>
          
          <Col>
          <br />
          <h3 className="RecipeStrucutre">Instruction</h3>
          <p>{props.mealInstruction}</p>
          </Col>
          
        </Row>
      </Container>
      <Modal show={showReviewModal} onHide={() => { setshowReviewModal(false) }}>
            <Modal.Header closeButton>
                <Modal.Title>Review</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Rate the Recipe!</Form.Label>
                        <br />
                        <ReactStars
                            count={5}
                            onChange={(rating) => {(inputRef.current.ratingStar = rating)}}
                            value={(typeof inputRef.current.ratingStar === 'undefined') ? 1: inputRef.current.ratingStar}
                            size={35}
                            activeColor="#ffd700"
                            isHalf={true}
  

                        />
                    </Form.Group>
                    <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlTextarea1"
                    >
                        <Form.Label>Leave us a review !</Form.Label>
                        <Form.Control as="textarea" ref={(e1) => (inputRef.current.ratingText = e1)} rows={3} />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button style="primary" onClick={() => { setshowReviewModal(false) }}>
                    Close
                </Button>
                <Button style="primary" onClick={handleReview}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
        <CreateModal
            show={showIngredientModal}
            onHide={()=>setshowIngredientModal(false)}
            title= {` ${props.mealName}`}
            body="The ingredients was succesfully Added to the Shopping List"
        />
   </>

    
    
}
export default RecipeContainer