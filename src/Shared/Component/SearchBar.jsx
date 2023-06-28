import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Card from '../Wrapper/Card';
import Button from '../FormElement/Button';
import { useState } from 'react';
import axios from "axios"
import "./SearchBar.css"
var Meallist=[] 
function SearchBar(props) {
 const[MealList,setMealList]=useState([])
  const[currentSearch,setCurrentSearch]=useState("")
  const[searchOptions,setSearchOptions]=useState(false)
    function handleClickSearch(event) {
        
        setCurrentSearch(event.target.innerHTML)
        setSearchOptions(false)
    }
    function SendSearch(event) {
        event.preventDefault()
        props.Search(currentSearch)
    }
    function handleChange(event) {
        console.log("letter",event.target.value)
        setCurrentSearch(event.target.value)
        setSearchOptions(true)
        if(event.target.value.length===1 && event.target.value.match(/[a-z]/i))
        {
            Meallist=[]
            axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?f=${event.target.value}`)
            .then((response)=>
            {
                for (let index = 0; index < response.data.meals.length; index++) {

                    Meallist.push(response.data.meals[index].strMeal)
                     
                }
                setMealList([Meallist][0])
                
                // 
                
            // Meallist=response.data.meals.length
            })
        }
        else if(event.target.value.length>1 && event.target.value.match(/[a-z]/i)){
            let newMealList= []
            for (let index = 0; index < Meallist.length; index++) {
                if( Meallist[index].slice(0,event.target.value.length).toLowerCase()===event.target.value.toLowerCase()){
                    newMealList.push(Meallist[index])
                }
                
            }

            console.log("2letter",Meallist[0].slice(0,event.target.value.length))
            setMealList([newMealList][0])
        }
        else{
            setMealList([])
        }
        
    }
    
    return  <Card>
       <Form onSubmit={SendSearch}>
           <InputGroup size="lg">
                
                <Form.Control
                  aria-label="Large"
                  aria-describedby="inputGroup-sizing-sm"
                  
                  value={currentSearch}
                  onChange={handleChange}
                />
                <Button type="submit"  style="primary">Search</Button>
              </InputGroup>
       </Form>
       <div className={`${searchOptions &&'searchBarContainer'}`}>
           
           { searchOptions && MealList.map((value, index) => {  
         return (
            
                <ul 
                className='searchBarLine' 
                key={index}><li onClick={handleClickSearch} >{value}</li>
                </ul>
    
         )
       
     
})}
</div>
   </Card>
}
export default SearchBar