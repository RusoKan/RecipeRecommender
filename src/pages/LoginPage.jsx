import Form from 'react-bootstrap/Form';
import Button from '../Shared/FormElement/Button';
import MainNavigation from "../Shared/Component/MainNavigation"
import Title from '../Shared/Component/Title';
import Card from '../Shared/Wrapper/Card';

import "./LoginPage.css"
function LoginPage(props) {

    return (
        <>
         <MainNavigation login={false} />

         <Card>
             <Title>Login</Title>
                <Form className='centered'>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="name@example.com" />
                    </Form.Group>
                    <Form.Group className="mb-4" controlId="formPlaintextPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" />
                    </Form.Group>
        
                    <Button style="primary" >Log in</Button>
                </Form>
         </Card>
        </>
    )

}
export default LoginPage
