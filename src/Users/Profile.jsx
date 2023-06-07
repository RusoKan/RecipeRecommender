import UserNavigationBar from "../Shared/Component/UserNavigationBar"
import Card from "../Shared/Wrapper/Card"
import { Form } from "react-bootstrap"
import { useEffect, useRef, useState } from 'react';
import DataFetching from "../Shared/Component/DataFetching";
import Button from "../Shared/FormElement/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CountryOptions from "../Shared/FormElement/CountryOptions";

function Profile(props) {
  const [disableOption, setDisableOption] = useState(false)
  const [user, setCurrentAccountData] = useState(null)
  const [country, setCountry] = useState("N/A") 
  const [gender,setGender]=useState("N/A")
  const[dateofBirth, setDateofBirth]=useState(null)
  const [diet,setDiet]=useState({})
  // const [checked,setChecked]=useState(null)
  // const user = DataFetching()
  useEffect(() => {
    axios.get("/api/dashboard")
      .then(response => {
        setCurrentAccountData(response.data)
        setCountry(response.data.country)
        
        setGender(response.data.gender)
        setDateofBirth(response.data.date_of_birth)
        setDataFetched(true)
        console.log(response.data.Diet.glutenFree)
        setDiet(response.data.Diet)
      })
    console.log("called ")
  }, [])



  const [dataFetched, setDataFetched] = useState(false);
  // useEffect(()=>{

  //   setCountry(user.country)
  //   setDataFetched(true)
  //   console.log("im herffe");
  // },[])


  
  const navigate = useNavigate()
  
  async function handleSubmitting(event) {
    let diet={}
    event.preventDefault()
    // const selected_radio=inputRef.current.diet_restriction.checked?inputRef.current.diet_restriction.value:inputRef.current.no_diet_restriction.value
    if(inputRef.current.diet_restriction.checked){
      diet={
      TypeOfdiet:inputRef.current.diet_restriction.value,
      glutenFree:inputRef.current.glutenFree.checked,
      dairyFree:inputRef.current.dairyFree.checked,
      Vegetarian:inputRef.current.Vegetarian.checked,
      Vegan:inputRef.current.Vegan.checked,
      }
    }
    else{
       diet={
        TypeOfdiet:inputRef.current.no_diet_restriction.value,
        glutenFree:false,
        dairyFree:false ,
        Vegetarian:false ,
        Vegan:false,
        }
    }
    axios
      .put("/api/update", {
        first_name: inputRef.current.firstname.value,
        last_name: inputRef.current.lastname.value,
        date_of_birth: inputRef.current.date_birth.value,
        gender: inputRef.current.gender.value,
        country: inputRef.current.country.value,
        Diet:diet,
      })
      .then((response) => {
        console.log("Inside", response);
        navigate(`/${user.id}`, { state: { doc: response } });
      })
      .catch(err => {
        console.log(err)
      })


  }
function handlingChangeGender(event) {
  const gender=event.target.value
  setGender(event.target.value)
}
function handlingDateOfBirth(event) {
  setDateofBirth(event.target.value)
  
}

  function handlingChangeCountry(event) {
  
    setCountry(event.target.value)

  }

  function handleClickNoFoodRestriction(event) {
    setDisableOption(true)

  }
  function handleClickFoodRestriction(event) {
    setDisableOption(false)

  }
  console.log("the Country is", country)
  const inputRef = useRef({});
  
  if (!dataFetched) {
    return <>Loading...</>;
  }
  return <>
    <UserNavigationBar profile={false} />

    <h1>PROFILE</h1>

    <Card>
      <Form onSubmit={handleSubmitting} className=" centered">


        <Form.Group className="mb-3 " controlId="FirstName">
          <Form.Label>First Name</Form.Label>
          <Form.Control ref={(e1) => (inputRef.current.firstname = e1)} type="text" defaultValue={user.first_name} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="LastName">
          <Form.Label>Last Name</Form.Label>
          <Form.Control ref={(e1) => (inputRef.current.lastname = e1)} type="text" defaultValue={user.last_name} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="Email">
          <Form.Label>Email address</Form.Label>
          <Form.Control disabled readOnly ref={(e1) => (inputRef.current.email = e1)} type="email" value={user.Email} placeholder="name@example.com" />


        </Form.Group>

        <Form.Group className="mb-3" controlId="Date">
          <Form.Label>Date of Birth</Form.Label>
          <Form.Control value={dateofBirth} onChange={handlingDateOfBirth} ref={(e1) => (inputRef.current.date_birth = e1)} max="2009-12-31" type="date" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="Gender">
          <Form.Label>Gender</Form.Label>
          <Form.Control as="select" value={gender} onChange={handlingChangeGender} ref={(e1) => (inputRef.current.gender = e1)}>
          <option value="N/A" >Choose your Gender</option>
            <option value="Man" >Man</option>
            <option value="Woman" >Woman</option>
            <option value="Non-Binary" >Non-Binary</option>
            <option value="Other" >Other</option>
            <option value="Prefer not to say" >Prefer not to say</option>
          </Form.Control>
        </Form.Group>
        <Form.Group className="mb-3" controlId="countries">
          <Form.Label>Country</Form.Label>
          <Form.Control as="select" value={country} onChange={handlingChangeCountry} ref={(e1) => (inputRef.current.country = e1)}   >
            <CountryOptions />
          </Form.Control>
        </Form.Group>

        <Form.Group className="mb-3" controlId="Diet">
          <Form.Label>Diet Restriction</Form.Label>
          <Form.Check onClick={handleClickFoodRestriction} defaultChecked={diet.glutenFree ||diet.dairyFree||diet.Vegetarian||diet.Vegan }  type="radio" aria-label="option 1" name="dietRestriction" label="Diet Restriction" value="Diet restriction" ref={(e1) => (inputRef.current.diet_restriction = e1)}  />
          <Form.Check disabled={disableOption} defaultChecked={diet.glutenFree} className="mx-4" aria-label="option 1" ref={(e1) => (inputRef.current.glutenFree = e1)} name="Gluten Free" label="Gluten Free" />
          <Form.Check disabled={disableOption} defaultChecked={diet.dairyFree} className="mx-4" aria-label="option 1" ref={(e1) => (inputRef.current.dairyFree= e1)} name="Dairy Free" label="Dairy Free" />
          <Form.Check disabled={disableOption} defaultChecked={diet.Vegetarian} className="mx-4" aria-label="option 1" ref={(e1) => (inputRef.current.Vegetarian = e1)}label=" Vegetarian" />
          <Form.Check disabled={disableOption} defaultChecked={diet.Vegan} className="mx-4" aria-label="option 1" ref={(e1) => (inputRef.current.Vegan = e1)} label=" Vegan" />
          <Form.Check onClick={handleClickNoFoodRestriction} defaultChecked={!(diet.glutenFree ||diet.dairyFree||diet.Vegetarian||diet.Vegan)}  type="radio"  name="dietRestriction" value="No Diet restriction" ref={(e1) => (inputRef.current.no_diet_restriction = e1)}  aria-label="option 2" label=" No Diet Restriction" />


        </Form.Group>


        <div className="flexcentered"><Button type="submit" style="primary" >Save</Button></div>
      </Form>

    </Card>

  </>

}
export default Profile