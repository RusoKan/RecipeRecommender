import MainNavigation from "../Shared/Component/MainNavigation";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import "./HomePage.css";
import { useEffect, useState } from "react";
import axios from "axios"
import Card from "../Shared/Wrapper/Card";
import Button from "../Shared/FormElement/Button";
import Footer from "../Shared/Component/Footer";
function HomePage(props) {
  const [LoggedIn, setLoggedIn] = useState(false)
  const [animate, setAnimate] = useState(false);
  useEffect(() => {
    axios.get('/api/authenticationCheck',

    ).then(response => {

      setLoggedIn(response.data)
    }
    )


  }, [])

  useEffect(() => {
    const handleLoad = () => {

      setAnimate(true);
      // Add a delay of 1 second (adjust as needed)
    };

    handleLoad(); // Call the function immediately

    return () => {
      // Clean up the event listener when the component unmounts
      window.removeEventListener('load', handleLoad);
    };
  }, []);

  return (
    <>
      <MainNavigation LoggedIN={LoggedIn} />
      <Container fluid className="backgroundtransition">
        <div >

          <Row className="backgroundRow">
            <Col >
              {/* <img className="ingredient" src="/images/celery.png" alt="" />
            <img className="ingredient" src="/images/Tomatoes.png" alt="" />
            <img className="ingredient" src="/images/SmokedSalmon.png" alt="" /> */}
            
            </Col>
            <Col >

              <img className="bodyImage" src="/images/FoodImage.png" alt="" />
            </Col>
            <Col >
              

            </Col>
            {/* <h1 className=" main-title"> Recipe Court</h1> */}
          </Row>
          <hr className="Line" />
        </div>

        <Row>

        </Row>
        <Row >

          <Col lg={4} md={6} xs={12}>
            <h1 className="subTitleforMainPage">Discover new Recipes</h1>
            <p>
              Have a recipe in mind? We have a hundred of recipes available to choose from! All recipes includes the necessary ingredients
              and instructions to create the meal. Every week, we have a three meals selected just for you. You can also set up your diet preferences 
              which will allow us to give you the recipes that are best suited for you.
            </p>
          </Col>
          <Col md={6} lg={4}>
            <h1>Try different type of cuisines </h1>
            <p>
              Expand your horizon by trying out different cuisines from different part of the world. If you don't know how to make it, we have a tutorial, 
              showing you step by step how to make it. If you like it, you can save the recipe and leave a review.
            </p>
          </Col>
          <Col lg={4}>
            <h1>Create your own Shopping list</h1>
            <p>
              You can create your own grocery list by adding the ingredients of your favorite recipes to make your shopping more conveniant!
            </p>
          </Col>
        </Row>
        <br />
        <hr className="Line" />
        <Row >
        {LoggedIn&&<Col className="content-flex-center px-4 py-5">
          <a className='linkSet' href="/dashboard"><Button style="secondary">Go to Dashboard</Button></a>
            
          </Col>}
        {!LoggedIn&&<Col className="content-flex-end px-4 py-5">
          <a className='linkSet' href="/login"><Button style="primary">Login</Button></a>
            
          </Col>}

          {!LoggedIn&&<Col className="content-flex-start px-4 py-5">
          <a className='linkSet' href="/Signup"><Button style="primary">Sign Up</Button></a>
            
          </Col>}

        </Row>

        <hr className="Line" />
        <Row >
          <Col>
       <Footer/>
          </Col>
        </Row>
      </Container>

    </>
  );
}

export default HomePage;