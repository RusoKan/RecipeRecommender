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
       
      <div className="bodyImage">
        <Container fluid="md" >
          <Row>
            <Col className="content-flex-center">

              <h1 className="main-title">Welcome To Recipe Court !</h1>
            </Col>
            <Col>
           
            </Col>
          </Row>
          <Row>
            
          </Row>
        </Container>
      </div>
    </>
  );
}

export default HomePage;