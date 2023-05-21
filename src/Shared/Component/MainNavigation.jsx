import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button'
import "./MainNavigation.css"
import { useState } from 'react';

import Card from 'react-bootstrap/Card';
function MainNavigation(props) {

    const [isMouseOver, setisMouseOver] = useState(
        {
            Main: false,
            Login: false,
            SignUp: false,
            About: false
        }
    )

    const { login = true, signup = true } = props;


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
                <span><img src="/images/MainLogo.png" alt="" /></span>
                <Navbar.Brand className='title' href="/">

                    Recipe Court
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">

                        <Nav.Link name="Main"
                            onMouseOver={onMouseOverHandler}
                            onMouseOut={onMouseOutHandler}
                            className={`mx-4 option-style ${isMouseOver.Main && "menu"}`}

                            href="#Meal">Today's Meal
                        </Nav.Link>


                       
                            <NavDropdown title="Today's Meal" name="Main" 
                            onMouseOver={onMouseOverHandler}
                            onMouseOut={onMouseOutHandler}
                            className={`mx-4 option-style ${isMouseOver.Main && "menu"}`}
                             id="basic-nav-dropdown ">
                            <div className='flexedbox'>
                                <NavDropdown.Item className='flexedbox' href="#action/3.1">
    
                                    <Card style={{ width: '10rem', height: "15rem" }}>
                                        <Card.Img variant="top" className='resizepicture' src="https://images.immediate.co.uk/production/volatile/sites/30/2013/05/Puttanesca-fd5810c.jpg?quality=90&resize=556,505" />
                                        <Card.Body>
                                            <Card.Title>Pasta</Card.Title>
                                            <Card.Text>
                                                Find out More...
                                            </Card.Text>
    
                                        </Card.Body>
                                    </Card>
                                    </NavDropdown.Item>
                                    <NavDropdown.Item className='flexedbox' href="#action/3.2">
                                    <Card style={{ width: '10rem', height: "15rem" }}>
                                        <Card.Img variant="top" className='resizepicture' src="https://images.immediate.co.uk/production/volatile/sites/30/2013/05/Puttanesca-fd5810c.jpg?quality=90&resize=556,505" />
                                        <Card.Body>
                                            <Card.Title>Pasta</Card.Title>
                                            <Card.Text>
                                                Find out More...
                                            </Card.Text>
    
                                        </Card.Body>
                                    </Card>
                                    </NavDropdown.Item>
                                    <NavDropdown.Item className='flexedbox' href="#action/3.2">
                                    <Card style={{ width: '10rem', height: "15rem" }}>
                                        <Card.Img variant="top" className='resizepicture' src="https://images.immediate.co.uk/production/volatile/sites/30/2013/05/Puttanesca-fd5810c.jpg?quality=90&resize=556,505" />
                                        <Card.Body>
                                            <Card.Title>Pasta</Card.Title>
                                            <Card.Text>
                                                Find out More...
                                            </Card.Text>
    
                                        </Card.Body>
                                    </Card>
                                    </NavDropdown.Item>
                                
                              
                                    </div>
                            </NavDropdown>
    
                        
                        {login && <Nav.Link name="Login"
                            onMouseOver={onMouseOverHandler}
                            onMouseOut={onMouseOutHandler}
                            className={`mx-4 option-style ${isMouseOver.Login && "menu"}`}
                            href="login">Login
                        </Nav.Link>
                        }

                        {signup && <Nav.Link name="SignUp"
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
                    </Nav>
                </Navbar.Collapse>
            </Container>

        </Navbar>
    );


}

export default MainNavigation