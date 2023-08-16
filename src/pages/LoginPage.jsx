import Form from 'react-bootstrap/Form';
import Button from '../Shared/FormElement/Button';
import MainNavigation from "../Shared/Component/MainNavigation"
import Title from '../Shared/Component/Title';
import Card from '../Shared/Wrapper/Card';
import Alert from 'react-bootstrap/Alert';
import "./LoginPage.css"
import { useRef, useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Spinner from 'react-bootstrap/Spinner';
import { GoogleLoginButton } from "react-social-login-buttons";

function LoginPage(props) {

    const LoginInputs = useRef({})

    const [LoggedIn, setLoggedIn] = useState(true)
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate();
    function handleAuth() {
        // axios.get("/api/auth/google")
        window.open("/api/auth/google","_self")
        
        
    }
    function handleSubmit(event) {

        event.preventDefault()
        setIsLoading(true)
        axios({
            method: 'post',
            url: "api/login",
            data: {
                email: LoginInputs.current.loginEmail.value,
                password: LoginInputs.current.loginPassword.value,
            },
            withCredentials: true
        })
            .then((response) => {
                console.log(response.data.authentication)
                setLoggedIn(response.data.authentication)
                setIsLoading(false)
                if (response.data.authentication) {
                    console.log(response.data.account.id)
                    navigate(`/dashboard`, );
                }

            })
            .catch(err => {
                console.log(err)
            });

    }




    return (
        <>
            <MainNavigation login={false} />

            <Card>
                <Title>Login</Title>
                {!LoggedIn && <Alert className="flexbox" variant="danger"  >
                    <p style={{ textAlign: "center" }}>Check your email and/or password again</p>
                </Alert>}
                <Form className='centered' onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" ref={(email) => { LoginInputs.current.loginEmail = email }} placeholder="name@example.com" />
                    </Form.Group>
                    <Form.Group className="mb-4" controlId="formPlaintextPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" ref={(password) => { LoginInputs.current.loginPassword = password }} placeholder="Password" />
                    </Form.Group>
                    
                  <div className='flexedbox'>  <Button style="primary" type="submit">Log in</Button></div>
                </Form>
                {isLoading && <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>}
            </Card>
            <h2 style={{textAlign:"center"}}>OR</h2>
            <Card>
        <GoogleLoginButton onClick={handleAuth}><span>Log in With Google </span></GoogleLoginButton>
        </Card>

        </>
    )

}
export default LoginPage
