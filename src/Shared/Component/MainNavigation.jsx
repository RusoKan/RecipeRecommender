import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button'
import "./MainNavigation.css"
import { useState } from 'react';
function MainNavigation(props) {
    
    const [isMouseOver, setisMouseOver] = useState(
        {
            Main: false,
            Login: false,
            SignUp: false,
            About: false
        }
    )
    
    const { login= true, signup=true } = props;
    

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
                <Navbar.Brand className='title' href="#home">
               
                    Recipe Court
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">

                        <Nav.Link name="Main"
                            onMouseOver={onMouseOverHandler}
                            onMouseOut={onMouseOutHandler}
                            className={`mx-4 option-style ${isMouseOver.Main && "menu"}`}
                            href="/">Today's Meal
                        </Nav.Link>

                   { login &&    <Nav.Link name="Login" 
                            onMouseOver={onMouseOverHandler}
                            onMouseOut={onMouseOutHandler}
                            className={`mx-4 option-style ${isMouseOver.Login && "menu"}`}
                            href="login">Login
                        </Nav.Link>
                   }

                    { signup   &&<Nav.Link name="SignUp"
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