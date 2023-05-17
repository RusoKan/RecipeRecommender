import MainNavigation from "../Shared/Component/MainNavigation"
import Form from 'react-bootstrap/Form';
import Button from '../Shared/FormElement/Button';
import Title from '../Shared/Component/Title';
import Card from '../Shared/Wrapper/Card';
import "./SignUpPage.css"
function SignUpPage(props) {
    return<>
        <MainNavigation signup={false}/>
        <Title>Sign Up</Title>
        <Card>
                 
                    <Form className=" centered">

                       <div className="NameContent">
                            <Form.Group className="mb-3 " controlId="FirstName">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control type="text" placeholder="First Name" />
                            </Form.Group>
    
                            <Form.Group className="mb-3" controlId="LastName">
                            <Form.Label>Last Name</Form.Label>
                                <Form.Control type="text" placeholder="Last Name" />
                            </Form.Group>
    
                            </div>
                        <Form.Group className="mb-3" controlId="Email">
                        <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="name@example.com" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="Password">
                        <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" />
                            
                        </Form.Group>
                        
                            <div style={{display:"flex",justifyContent:"center"}}><Button style="primary " >Register</Button></div>
                                
                        
                            
                            {/* <Form.Label>Confirm Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" /> */}
                        
                            
                        
                    </Form>
                    
             </Card>
        
    </>
}


export default SignUpPage