import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import "./MainNavigation.css"
import { useState } from 'react';
import  {Dropdown}  from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import Button from '../FormElement/Button';
import axios from "axios"
import { useNavigate } from "react-router-dom";
function MainNavigation(props) {
   const navigate= useNavigate()
    const [showDropdown, setShowDropdown] = useState(false);
    const [isMouseOver, setisMouseOver] = useState(
        {
            Main: false,
            Login: false,
            SignUp: false,
            About: false
        }
    )

    const { login = true, signup = true } = props;
    async function handleMyAccountClick(event) {
        event.preventDefault()
        axios.get("api/dashboard",{

        })
        .then(response=>{
            navigate(`/dashboard`, {state:{name:response.data.first_name}})
        }

        )
        
    }

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


    return (
        <Navbar expand="lg" className='NavbarAttribute'>
            <Container>
                <span><img className='ImageResponsiveness resizeLogo' src="/images/MainLogo2.png" alt="" /></span>
                <Navbar.Brand className='NavBarTitle' href="/">

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
                      
                    
                        {!props.LoggedIN && login && <Nav.Link name="Login"
                            onMouseOver={onMouseOverHandler}
                            onMouseOut={onMouseOutHandler}
                            className={`mx-4 option-style ${isMouseOver.Login && "menu"}`}
                            href="login">Login
                        </Nav.Link>
                        }

                        { !props.LoggedIN && signup && <Nav.Link name="SignUp"
                            onMouseOver={onMouseOverHandler}
                            onMouseOut={onMouseOutHandler}
                            className={`mx-4 option-style ${isMouseOver.SignUp && "menu"}`}
                            href="signup">Sign up
                        </Nav.Link>}
                        <Nav.Link
                            name="About" onMouseOver={onMouseOverHandler}
                            onMouseOut={onMouseOutHandler}
                            className={`mx-4 option-style ${isMouseOver.About && "menu"}`}
                            href="#link">About
                        </Nav.Link>
                        {props.LoggedIN &&<Nav.Link 
                        className={`mx-4 option-style `}
                        onClick={handleMyAccountClick}
                        >
                         My Account
                        </Nav.Link>}
                    </Nav>
                </Navbar.Collapse>
            </Container>

        </Navbar>
    );


}

export default MainNavigation