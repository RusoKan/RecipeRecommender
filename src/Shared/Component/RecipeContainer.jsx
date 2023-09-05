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
import Card from '../Wrapper/Card';
function RecipeContainer(props) {
  const inputRef = useRef({});
  const [showReviewModal, setshowReviewModal] = useState(false)
  const [showIngredientModal, setshowIngredientModal] = useState(false)
  const [lgShow, setLgShow] = useState(false);
    const [modalMessage, setModalMessage] = useState("");
    // const {SetAddRecipeButton=false,SetAddReviewButton=false}=props
    function handleAddRecipe() {
        const data={
            mealID:props.mealID
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
    let tag=""
  if(props.mealtag){
     tag=props.mealtag.replaceAll(",",",  ")||""
  }
  
console.log(tag)
   return <>
     <Container fluid>
        <Row className="RecipeRow">
          <Col md={12} lg={6} className="RecipeImageContainer  ">
          <img className="RecipeImage " src={props.mealImg} alt="Meal-Img" />
          </Col>
          <Col lg={6} className="RecipeInfoContainer"  >

          <h2 className="RecipeTitle">{props.mealName}</h2>
          
          <h4 className="SubTitle">{tag}</h4>
          
          <h5 className="SubTitle opaque">{props.mealCategory}</h5>
          <Container fluid className='marginfix flexcentered'>
              <Card >
                  <Row >
                  {props.SetAddRecipeButton&&<Col xs={12} lg={6} className='centeringitem'>
                  <Button onClick={handleAddRecipe} style="tertiary">Add to Your Recipe!</Button>
                  </Col>}
                  
                  <Col xs={12} lg={6} className='centeringitem'>
                  <a target="_blank" className='linkSet' href={props.mealLink}><Button style="tertiary">Watch a tutorial !</Button></a>
                  </Col >
                  
                  
                  </Row>
                  
                <Row>
                {props.SetAddReviewButton&&
                <div>
                <hr />
                      <br />
                    <Col className='centeringitem'> 
                      <Button onClick={()=>setshowReviewModal(true)} style="secondary">Leave a review</Button> 
                      </Col>
                </div>
                  }
                </Row>
              </Card>
          </Container>
         

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
                <Modal.Title className="SubTitle opaque" >Review</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label className='RecipeTitle fontsizeControl'>Rate the Recipe!</Form.Label>
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
                        <Form.Label className="SubTitle">Leave us a review !</Form.Label>
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
export default RecipeContainer