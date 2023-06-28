import MainNavigation from "../Shared/Component/MainNavigation"
import Form from 'react-bootstrap/Form';
import Button from '../Shared/FormElement/Button';
import Title from '../Shared/Component/Title';
import Card from '../Shared/Wrapper/Card';
import "./SignUpPage.css"
import axios from 'axios';
import { useRef, useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import { useNavigate } from "react-router-dom";
import CreateModal from "../Shared/Component/Modal";
import { GoogleLoginButton } from "react-social-login-buttons";



function SignUpPage(props) {
    const [Accountexist, setAccountexist] = useState(false)
    const [CreatingAccountModal,setCreatingAccountModal]=useState(false)
        const navigate=useNavigate();


    const inputRef = useRef({});
    function onHide() {
        navigate("/login")
        
    }
     function handleAuth() {
        // axios.get("/api/auth/google")
        window.open("/api/auth/google","_self")
        
        
    }

    function handleSubmit(event) {
        event.preventDefault();

        const data = {
            first_name: inputRef.current.firstname.value,
            lastname: inputRef.current.lastname.value,
            Email: inputRef.current.email.value,
            password: inputRef.current.password.value

        }
        axios.post('/api/signup', data)
            .then((response) => {
                // Handle the response from the backend
                setAccountexist(response.data)
                console.log(response.data)
                if(!response.data)
                {
                    setCreatingAccountModal(true)
                    
                }
            })

            .catch((error) => {
                // Handle any errors
                console.error(error);
            });

    }



    return <>
        <MainNavigation signup={false} />
        <Title>Sign Up</Title>
        <Card>
            
            <Form onSubmit={handleSubmit} className=" centered">

                <div className="NameContent">
                    <Form.Group className="mb-3 " controlId="FirstName">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control ref={(e1) => (inputRef.current.firstname = e1)} type="text" placeholder="First Name" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="LastName">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control ref={(e1) => (inputRef.current.lastname = e1)} type="text" placeholder="Last Name" />
                    </Form.Group>

                </div>
                <Form.Group className="mb-3" controlId="Email">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control ref={(e1) => (inputRef.current.email = e1)} type="email" placeholder="name@example.com" />
                
                   { Accountexist && <Alert className="flexbox" variant="danger"  >   
                    <p>Email is already in use.  </p>
                     </Alert>}
                </Form.Group>

                <Form.Group className="mb-3" controlId="Password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control ref={(e1) => (inputRef.current.password = e1)} type="password" placeholder="Password" />

                </Form.Group>

                <div style={{ display: "flex", justifyContent: "center" }}>
                    <Button style="primary" type="submit"  >Register</Button>
                </div>



                {/* <Form.Label>Confirm Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" /> */}



            </Form>

        </Card>
        <h2 style={{textAlign:"center"}}>OR</h2>
        <Card>
        <GoogleLoginButton onClick={handleAuth}><span>Sign Up With Google </span></GoogleLoginButton>
        </Card>
                            <CreateModal show={CreatingAccountModal}
                            heading="Your account has been created succesfully!"
                            text=" Head on to your new account to start creating your own recipes!"
                            onHide={onHide}
                            >

                            </CreateModal>
    </>
}


export default SignUpPage