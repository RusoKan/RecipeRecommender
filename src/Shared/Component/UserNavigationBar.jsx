import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import "./MainNavigation.css"
import { useState  } from 'react';
import Button from "../FormElement/Button"
import { Dropdown } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import Profile from '../../Users/Profile';
import axios from 'axios';
import Recipes from '../../Users/Recipes';
import MyRecipes from '../../Users/MyRecipes';
import "./UserNavigationBar.css"

import { Link, Navigate, useNavigate } from 'react-router-dom';
function UserNavigationBar(props) {
    const navigate=useNavigate()
    const [showDropdown, setShowDropdown] = useState(false);
    const [isMouseOver, setisMouseOver] = useState(
        {
            Main: false,
            Login: false,
            SignUp: false,
            About: false
        }
    )
  
    
   
    
    const { profile = true } = props;
    

    function onMouseOverHandler(event) {


        setisMouseOver((prev) => {
            return { ...prev, [event.target.name]: true }
        })
    }
    function onMouseOutHandler(event) {

        setisMouseOver((prev) => {
            return { ...prev, [event.target.name]: false }
        })
    }
    function logoutHandleClick(event){
        axios(
            {
                method: "post",
                url: "/api/logout"
            }
        ).then((response) => {
            console.log(response.data)
            if (!response.data)
                navigate("/login")
        })
    }

    return (
        <>
            <Navbar expand="lg" className='NavbarAttribute'>
                <Container>
                    <span><img className='ImageResponsiveness' src="/images/MainLogo.png" alt="" /></span>
                    <Navbar.Brand className='title' href="/">

                        Recipe Court
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto">
                            <Dropdown
                                onMouseLeave={() => setShowDropdown(false)}
                                onMouseOver={() => setShowDropdown(true)}
                            // style={{ width: '166px' }}
                            >
                                <Dropdown.Toggle
                                    className="mx-4 option-style defaultsetting"

                                    id="dropdown-basic"
                                >
                                    Today's Meal
                                </Dropdown.Toggle>

                                <Dropdown.Menu show={showDropdown} >
                                    <div className='flexedbox'>
                                        <Dropdown.Item href="#/action-1">
                                            <Card style={{ width: '10rem', height: "15rem" }}>
                                                <Card.Img variant="top" className='resizepicture' src="https://images.immediate.co.uk/production/volatile/sites/30/2013/05/Puttanesca-fd5810c.jpg?quality=90&resize=556,505" />
                                                <Card.Body>
                                                    <Card.Title>Pasta</Card.Title>
                                                    <Card.Text>
                                                        Find out More...
                                                    </Card.Text>

                                                </Card.Body>
                                            </Card>
                                        </Dropdown.Item>
                                        <Dropdown.Item href="#/action-2">
                                            <Card style={{ width: '10rem', height: "15rem" }}>
                                                <Card.Img variant="top" className='resizepicture' src="https://images.immediate.co.uk/production/volatile/sites/30/2013/05/Puttanesca-fd5810c.jpg?quality=90&resize=556,505" />
                                                <Card.Body>
                                                    <Card.Title>Pasta</Card.Title>
                                                    <Card.Text>
                                                        Find out More...
                                                    </Card.Text>

                                                </Card.Body>
                                            </Card>
                                        </Dropdown.Item>
                                        <Dropdown.Item href="#/action-3">
                                            <Card style={{ width: '10rem', height: "15rem" }}>
                                                <Card.Img variant="top" className='resizepicture' src="https://images.immediate.co.uk/production/volatile/sites/30/2013/05/Puttanesca-fd5810c.jpg?quality=90&resize=556,505" />
                                                <Card.Body>
                                                    <Card.Title>Pasta</Card.Title>
                                                    <Card.Text>
                                                        Find out More...
                                                    </Card.Text>

                                                </Card.Body>
                                            </Card>
                                        </Dropdown.Item>
                                    </div>
                                </Dropdown.Menu>
                            </Dropdown>

                            
                            <Nav.Link 
                            className="mx-4 option-style defaultsetting"
                            href="recipes"
                            >
                            Recipes
                            </Nav.Link>




                            <Dropdown>
                                <Dropdown.Toggle variant="success" className="mx-4 option-style defaultsetting"  id="dropdown-basic">
                                    Setting
                                </Dropdown.Toggle>

                                <Dropdown.Menu >
                                    {profile &&<Dropdown.Item className='flexcentered' href={`/${props.id}/profile`}>
                                   
                                    Manage your profile

                                    </Dropdown.Item>}
                                    <Dropdown.Item className='flexcentered' href="/my-recipes">My Recipes</Dropdown.Item>
                                    <Dropdown.Item className='flexcentered' href="/shoppinglist">My Shopping List</Dropdown.Item>
                                    <Dropdown.Item  className='flexcentered'>
                                    
                                    <Button onClick={logoutHandleClick} style="primary">Log Out</Button>
                                    
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>

                        </Nav>
                    </Navbar.Collapse>
                </Container>

            </Navbar>
        </>
    );


}

export default UserNavigationBar