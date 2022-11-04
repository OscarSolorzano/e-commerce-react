import axios from 'axios';
import React from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

const SingUp = () => {

    const { register, handleSubmit, reset } = useForm()
    const navigate = useNavigate()

    const submit = data => {
        const newUser = data
        newUser.role = "admin"
        axios.post('https://ecommerce-api-react.herokuapp.com/api/v1/users',newUser)
        .then(()=>{
            alert('User Created')
            navigate('/login')
        })
        .catch(error => alert(error.response.data.message))
        reset({
            email: '',
            password: '',
            firstName:'',
            lastName:'',
            phone:''
        })
    }
    return (
        <div>
            <div className='user-info-container'>
            <Card className='sing-up-card'>
                <Card.Body>
                    <h1>Sing Up</h1>
                    <Form onSubmit={handleSubmit(submit)}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email"  {...register('email')} />
                            <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                            </Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control type="text" placeholder="First Name" {...register('firstName')} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control type="text" placeholder="Last Name" {...register('lastName')} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" {...register('password')} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Phone 10 characters</Form.Label>
                            <Form.Control type="password" placeholder="Phone" {...register('phone')} />
                        </Form.Group>

                        <div className='big-btn-container'>
                            <Button variant="primary" type="submit" className='big-btn mt-3 mb-3'>
                                Submit
                            </Button>
                        </div>
                    </Form>
                    <div>
                        <p>Already have an account? <Link to={'/login'}>Log in</Link></p>
                    </div>
                </Card.Body>
            </Card>
        </div>
        </div>
    );
};

export default SingUp;