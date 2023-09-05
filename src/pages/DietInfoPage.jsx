import { Container, Row ,Col,Modal, Offcanvas, Dropdown} from "react-bootstrap"
import UserNavigationBar from "../Shared/Component/UserNavigationBar"
import Card from "../Shared/Wrapper/Card"
import "./DietInfoPage.css"
import { useEffect, useState } from "react"
import axios from "axios"
import Button from "../Shared/FormElement/Button"
import RecipeCard from "../Shared/Component/RecipeCard"
import RecipeContainer from "../Shared/Component/RecipeContainer"
import Footer from "../Shared/Component/Footer"
function DietInfoPage(props) {
    const title={
        byDiet:"Meal Category",
        byCountry:"Ethnic Cuisine",
    }
    const [Categories,setCategories]=useState([])
    const[RecipeInfo,setRecipeInfo]=useState([])
    const[ShowModalInfo,setShowModalInfo]=useState(false)
    const[ShowoffCanvasfilter,setShowoffCanvasfilter]=useState(false)
    const[FilterName,setFilterName]=useState(title.byDiet)
    const[RecipeIdsByCountry,setRecipeIdsbyCountry]=useState([])
    const[ShowRecipeModal,setShowRecipeModal]=useState(false)
    const [recipeData, setRecipeData] = useState({})
   
 useEffect(()=>{

    handleMealCategoryFilter()
 },[])

function handleClick(event) {
    console.log(event)
    let Category;
if (!event.target.innerText) {
    Category=event.target.name
    
}else{
   Category=event.target.innerText
}
    console.log(Category)
    let CategoryorArea;
    if(FilterName===title.byDiet){
        console.log("inside functionMeal")
     CategoryorArea=Categories.filter(recipe=>(recipe.strCategory)===Category )
    }
   else if(FilterName===title.byCountry){
        console.log("inside function")
    CategoryorArea=Categories.filter(recipe=>(recipe.strArea)===Category )
    const data={
        "Area":CategoryorArea[0].strArea,
    }
    axios.post("/api/getListofMealFromSelectedCountry",data)
    .then(response=>{
        const max=10
        if(response.data.meals.length>max){
            setRecipeIdsbyCountry(response.data.meals.slice(0,max))
        }
        else{
        setRecipeIdsbyCountry(response.data.meals)
        }
    })
    }

    console.log(CategoryorArea)
    setRecipeInfo(CategoryorArea[0])
    setShowModalInfo(true)
    
}
function handlefilter(){
    setShowoffCanvasfilter(true)
    
}
function recipeClick(recipe) {
    setRecipeData(recipe)
    setShowRecipeModal(true)
}
function handleAreaFilter(){
    axios.get("/api/recipeArea")
    .then(response=>{
        console.log(response.data)
        setCategories(response.data)
        setFilterName(title.byCountry)
        setShowoffCanvasfilter(false)
    })
}
function handleMealCategoryFilter(){
    axios.get("/api/recipeCategories")
    .then(response=>{
setCategories(response.data.categories)
setFilterName(title.byDiet)
setShowoffCanvasfilter(false)
    })
}
function handleError(params) {
    
}

    return<>

        <UserNavigationBar/>
       
        <Container fluid>
        <h1 className="RecipeTitle PageTitle">{FilterName}</h1>

        <div className="filterBy"><Button onClick={handlefilter} style="secondary">Filter by</Button></div>
         
        
        <Row>
        
        {Categories.map((value,index)=>{

           return <Col key={index}>
        <Card onClick={handleClick}  >
            <Row  onClick={handleClick} >
                <Col ><h4 className="CategoryTitle">{value.strCategory|| `${value.strArea}`}</h4></Col>
                <Col className="noevent"><img onClick={handleClick} className={!value.strArea?"resizeImage":"resizeImageflags"} name={value.strCategory||value.strArea} src={value.strCategoryThumb||value.flag}></img></Col>
            </Row>
            
        </Card>
        </Col>
        })}
        </Row>

        </Container>

    {<Modal
      show={ShowModalInfo}
      onHide={() => setShowModalInfo(false)}
      size={"lg"}
      
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title className="CategoryTitle" id="contained-modal-title-vcenter">
          Diet Information
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {
           FilterName===title.byDiet && <h4 className="SubTitle" onError={handleError}>{RecipeInfo.strCategory}</h4> ||
           FilterName===title.byCountry && <h4 className="SubTitle centeredtext">{`${RecipeInfo.strArea} Cuisine`}</h4>
            }
            {console.log(RecipeIdsByCountry)}
          {FilterName===title.byDiet && <p className="Subtext">{RecipeInfo.strCategoryDescription}</p>||
          
            FilterName===title.byCountry && 
                
               <Container fluid>
               <Row className="RecipeImageContainer">
               {RecipeIdsByCountry.map((recipe, index)=>{
                return    <Col key={recipe.idMeal}>
                    <RecipeCard
                    RecipeID={recipe.idMeal}
                    handleClickRecipe={recipeClick}
                />
                    </Col>
               })}
                
</Row>
                </Container>
                 
                    
                
                

            
          }
        
      </Modal.Body>
      
    </Modal>}

    <Offcanvas scroll backdrop={false} show={ShowoffCanvasfilter} onHide={()=>[setShowoffCanvasfilter(false)]} >
    <Offcanvas.Header closeButton>
                                            <Offcanvas.Title className='title'>Filter by</Offcanvas.Title>
                                        </Offcanvas.Header>
                                        <Offcanvas.Body className='settingOptions'>
                                        <Dropdown.Item className='flexcentered' onClick={handleMealCategoryFilter}  > Meal Categories</Dropdown.Item>
                                    
                                        <Dropdown.Item   className='flexcentered' onClick={handleAreaFilter} >Area</Dropdown.Item>
                                        <Dropdown.Item  disabled  className='flexcentered'  >Ingredients</Dropdown.Item>
                                        {/* <Dropdown.Item className='flexcentered' >Ingredients</Dropdown.Item> */}
                                        <Dropdown.Item className='flexcentered' ><Button style="primary">Close </Button></Dropdown.Item>
                                            
                                           
                                        </Offcanvas.Body>
                                    </Offcanvas>

       

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
            mealCategory={recipeData.mealCat}
            SetAddRecipeButton={true}
            SetAddReviewButton={true}
            
            mealLink={recipeData.mealLink}
            mealIngredients={recipeData.mealIngredients}
            mealInstruction={recipeData.mealInstruction}
                    // AddAllIngredientsToShoppingList={handleAddAllIngredientsToShoppingList}
                />

            </Modal.Body>

            <Modal.Footer>
                <Button style="primary" onClick={() => setShowRecipeModal(false)}>Close</Button>
            </Modal.Footer>
        </Modal>
 <Footer/>
    </>
    
    
}

export default DietInfoPage