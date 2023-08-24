import UserNavigationBar from "../Shared/Component/UserNavigationBar"
import { Card, Row, Col, Container, Modal, Form } from 'react-bootstrap';

import Button from "../Shared/FormElement/Button";
import "../Shared/FormElement/Button.css"
import Buttons from 'react-bootstrap/Button';
import { useEffect, useState, useRef } from "react";

import axios from "axios";

import RecipeContainer from "../Shared/Component/RecipeContainer";

import "./MyRecipe.css"

import PlaceholderCard from "../Shared/Component/PlaceholderCard";
import RatingRecipe from "./../Shared/Component/RatingRecipe"
import RecipeCard from "../Shared/Component/RecipeCard";

function MyRecipes(props) {
    const [RecipeCardInfo, setRecipeCardInfo] = useState([])
    const [RecentlyAddedRecipes, setRecentlyAddedRecipes] = useState([])
    const [ShowRecentlyAddedRecipes, setShowRecentlyAddedRecipes] = useState(false)
    const [ShowRecipeModal, setShowRecipeModal] = useState(false)
    const [recipeData, setRecipeData] = useState({})
    const [verificationRemove, setVerificationRemove] = useState(false)
    const [selectedMealId, setselectedMealID] = useState("")
    const [Datafetched, setDataFetched] = useState({
        dataFromMyRecipe: false,
        dataFromLatestAddedRecipe: false,
    })
    // const inputRef = useRef({});
    
    useEffect(() => {
        axios.get("/api/MyrecipefromID")
            .then(response => {
                console.log(response.data)
                setRecipeCardInfo(response.data)
                setDataFetched((prev) => ({
                    ...prev, dataFromMyRecipe: true,
                }))
            })
    }, [])
    useEffect(() => {
        axios.get("/api/latestAddedRecipe")
            .then(response => {
                setRecentlyAddedRecipes(response.data)
                console.log(response.data)
                if (response.data.length != 0) {
                    setShowRecentlyAddedRecipes(true)
                }
                setDataFetched(prev => ({ ...prev, dataFromLatestAddedRecipe: true }))
            })
    }, [])

    function handleClickRecipe(value) {
        value=value.mealID
        setselectedMealID(value)
        const data = { search: value }

        axios.post("/api/RecipefromID", data)
            .then((response) => {
                const meal = response.data.meals[0]
                console.log(meal)
                let ingredients = []
                const Number_of_ingredients = 20
                for (let index = 1; index < Number_of_ingredients; index++) {
                    if (meal[`strIngredient${index}`] != "")
                        if (meal[`strIngredient${index}`]) {
                            let Ingredient = meal[`strMeasure${index}`] + " " + meal[`strIngredient${index}`]
                            ingredients.push(Ingredient)
                        }

                }
                setRecipeData({
                    mealName: meal.strMeal,
                    mealCat: meal.strCategory,
                    mealImg: meal.strMealThumb,
                    mealtag: meal.strTags,
                    mealInstruction: meal.strInstructions,
                    mealLink: meal.strYoutube,
                    mealIngredients: ingredients,
                    mealID: meal.idMeal,
                })
                console.log(meal.strYoutube)
            })
        setShowRecipeModal(true)
        console.log(value)

    }

    function handleDeleteRecipe() {
        console.log("DelETING")
        const data = { search: selectedMealId }
        axios.post("/api/deleteRecipe", data).then(() => {



        }

        )
        setVerificationRemove(false)
        setShowRecipeModal(false)
        location.reload();

    }

    
    // const handleReview = (event) => {
    //     console.log(inputRef.current.ratingText.value)
    //     console.log(inputRef.current.ratingStar)
    //     const data={
            
    //         RecipeId:selectedMealId,
    //         ratingStar:(typeof inputRef.current.ratingStar === 'undefined') ? 1: inputRef.current.ratingStar,
    //         ratingText:inputRef.current.ratingText.value,
            
    //     }
    //     console.log(data)
    //     axios.put("/api/ReviewForRecipe",{data})
    //     .then((response)=>{

    //     })
    // }
    // function handleAddAllIngredientsToShoppingList() {
    //     const  data={
    //         RecipeId:selectedMealId
    //     }
        
    //     axios.put("/api/AddingIngredientsToShoppingList",data )
    //     .then(response=>{
    //         console.log(response.data)
    //         setshowIngredientModal(true)
    //     })
    //     .catch(response=>{
            
    //     })
    // }
    //  if(Datafetched.dataFromLatestAddedRecipe===false|| Datafetched.dataFromMyRecipe===false)
    //  {
    //     return<>
    // <Card style={{ width: '18rem' }}>
    //         <Card.Img variant="top" src="holder.js/100px180" />
    //         <Card.Body>
    //           <Placeholder as={Card.Title} animation="glow">
    //             <Placeholder xs={6} />
    //           </Placeholder>
    //           <Placeholder as={Card.Text} animation="glow">
    //             <Placeholder xs={7} /> <Placeholder xs={4} /> <Placeholder xs={4} />{' '}
    //             <Placeholder xs={6} /> <Placeholder xs={8} />
    //           </Placeholder>
    //           <Placeholder.Button variant="primary" xs={6} />
    //         </Card.Body>
    //       </Card>


    //     </>
    //  }

    return <>

        <UserNavigationBar />
        {ShowRecentlyAddedRecipes && <h3 className="RecentlyAddedStyle ">Recently Added Recipes</h3>}
        <Container fluid  >
            <Row className="RecipeImageContainer">
                {ShowRecentlyAddedRecipes && Datafetched.dataFromLatestAddedRecipe === false ?
                    [...Array(2)].map((e, i) => {
                        return <Col key={i} m={3}>
                            <PlaceholderCard />

                        </Col>
                    }) :
                    RecentlyAddedRecipes.map(recipe => {
                        return <Col  key={recipe.id} m={3}>
                            <RecipeCard
                                RecipeID={recipe.id}
                                handleClickRecipe={handleClickRecipe}
                            />
 
                        </Col>
                    })}
            </Row>
        </Container>
        <h1 className="RecipeTitle PageTitle">Saved Recipes</h1>


        <Container fluid  >
            <Row className="RecipeImageContainer">
                {Datafetched.dataFromMyRecipe === false ?
                    [...Array(3)].map((e, i) => {
                        return <Col key={i} m={3}>
                            <PlaceholderCard />

                        </Col>
                    }) :


                    RecipeCardInfo.map(recipe => {

                        return <Col  key={recipe.id}>
                            <RecipeCard
                                RecipeID={recipe.id}
                                handleClickRecipe={handleClickRecipe}
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
                    mealID={selectedMealId}
                    mealImg={recipeData.mealImg}
                    mealName={recipeData.mealName}
                    mealtag={recipeData.mealtag}
                    mealCategory={recipeData.mealCat}
                    mealLink={recipeData.mealLink}
                    SetRemoveRecipeButton={true}
                    SetAddReviewButton={true}
                    mealIngredients={recipeData.mealIngredients}
                    mealInstruction={recipeData.mealInstruction}
                    // AddAllIngredientsToShoppingList={handleAddAllIngredientsToShoppingList}
                />

            </Modal.Body>

            <Modal.Footer>
                `<Buttons onClick={() => { setVerificationRemove(true) }} className="FormButton red" variant="danger">Remove</Buttons>{' '}
                <Button style="primary" onClick={() => setShowRecipeModal(false)}>Close</Button>
            </Modal.Footer>
        </Modal>

        <Modal
            show={verificationRemove}
            onHide={() => setVerificationRemove(false)}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Delete Recipe
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h4>Are you sure you want to delete this recipe?</h4>

            </Modal.Body>
            <Modal.Footer>
                <Buttons className="FormButton red" variant="danger" onClick={handleDeleteRecipe}>Yes</Buttons>
                <Button style="primary" onClick={() => setVerificationRemove(false)}>No</Button>
            </Modal.Footer>
        </Modal>
        
        {/* <CreateModal
            show={showIngredientModal}
            onHide={()=>setshowIngredientModal(false)}
            title= {` ${recipeData.mealName}`}
            body="The ingredients was succesfully Added to the Shopping List"
        /> */}
       









        {/* <Modal show={showReviewModal} onHide={() => { setshowReviewModal(false) }}>
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
        </Modal> */}
    </>


}
export default MyRecipes