import { useEffect, useState } from "react"
import UserNavigationBar from "../Shared/Component/UserNavigationBar"
import Card from "../Shared/Wrapper/Card"
import axios from "axios"
import Form from 'react-bootstrap/Form';
import "./ShoppingList.css"
import { Button } from "react-bootstrap";
function ShoppingList(props) {
    const [ListofIngredients,setListOfIngredients]=useState([])
    const [itemsTobeRemoved,setitemstoBeRemoved]=useState([])
    const [HideButton,setHideButton]=useState(true)
    const [AllItemSelected,setAllItemSelected]=useState(false)
    const [selectedItem,setSelectedItem]=useState({})
    useEffect(()=>{
        axios.get("/api/getShoppingList")
        .then(response=>{
            if(response.data.ListofIngredient.length>0){
            setListOfIngredients(response.data.ListofIngredient)
            setHideButton(false)}
            else{
                setHideButton(true)
            }
        })
        .catch(err=>{
            console.log(err.response.data.msg)
        })
    },[])
    function handleSelectAll() {
        setAllItemSelected(true)
        setitemstoBeRemoved(ListofIngredients)
    }
    function handleCheckList(event) {
        const itemChecked=event.target.checked;
        const ingredientName=event.target.name

        if(itemChecked)
        {setitemstoBeRemoved((prev)=>[...prev,ingredientName])}
        else if(!itemChecked)
        {
            setitemstoBeRemoved(itemsTobeRemoved.filter(ingredient=>ingredient!==ingredientName))
        }
    }
    function DeleteSelectedItem(props) {
        axios.post("/api/removeFromShoppingList",{data:itemsTobeRemoved})
        .then((response)=>{
            window.location.reload()
        
        })
        .catch(response=>{
            console.log(response.data)
        })
    }
    return <>
    <UserNavigationBar/>
    <h1 className="titleSecond">Shopping List</h1>
    
    <Card>
    
    <div  className="IngredientContainer">
   {!HideButton&&<div className="ButtonCenteringContainer"> 
   <Button className="FormButton white" variant="dark" onClick={handleSelectAll} >{"Select All"}</Button>
   <Button className="FormButton red" variant="danger" onClick={DeleteSelectedItem} >Remove selected Ingredients from list</Button>
   </div>}
   {HideButton&&<h3 className="NoIngredientstext">Go to your Recipes' list and add some ingredients for your next Grocery Shopping!</h3>}
    <br />
        {ListofIngredients.map((value,index)=>{
        return <label key={index}  className="form-control " >
    <input type="checkbox" checked={AllItemSelected?true:null} onChange={handleCheckList} name={`${value}`} />
    {`${value}`}
  </label>
              
              
        })}

        
    </div>

    </Card>
    </>
}
export default ShoppingList