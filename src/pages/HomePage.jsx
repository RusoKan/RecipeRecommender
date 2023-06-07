import MainNavigation from "../Shared/Component/MainNavigation";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import "./HomePage.css";
import { useEffect, useState } from "react";
import axios from "axios"
function HomePage(props) {
  const [LoggedIn,setLoggedIn]=useState(false)
  const [animate, setAnimate] = useState(false);
useEffect(()=>{
  axios.get('/api/authenticationCheck',

  ).then(response=>{

    setLoggedIn(response.data)
  }
  )


},[])
  
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
      <MainNavigation LoggedIN={LoggedIn}/>
      <Container fluid="md">
        <Row>
          <Col className="content-flex-center">
            <div className={`collapse-img ${animate ? 'show' : ''}`}>
              <img
                className={`Main-img ${animate ? 'fade-in' : ''}`}
                src="https://static1.squarespace.com/static/53b839afe4b07ea978436183/53bbeeb2e4b095b6a428a13e/5fd2570b51740e23cce97919/1678505081247/traditional-food-around-the-world-Travlinmad.jpg?format=1500w"
              />
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <h1 className="main-title title">MAKE YOUR RECIPE TODAY !</h1>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default HomePage;