import axios from 'axios';
import React from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const { register, handleSubmit, reset } = useForm()
    const navigate = useNavigate()



    const submit = data => {
        localStorage.setItem('token', '')
        localStorage.setItem('userInfo', {})
        axios.post('https://ecommerce-api-react.herokuapp.com/api/v1/users/login', data)
            .then(res => {
                navigate('/')
                localStorage.setItem('token', res.data.data.token)
                localStorage.setItem('userInfo', JSON.stringify(res.data.data.user))
            })
            .catch(error => {
                if (error.response?.status === 404) {
                    alert('Invalid Credentials')
                }
                else {
                    console.log(error.response)
                }
            })
        reset({
            email: '',
            password: ''
        })
    }

    return (
        <div className='user-info-container'>
            <Card>
                <Card.Body>
                    <h1>Login</h1>
                    <div className='test-data'>
                        <h5>Test Data</h5>
                        <div>
                            <i className="fa-solid fa-envelope mx-2"></i>
                            <span>alex@gmail.com</span>
                        </div>
                        <div>
                            <i className="fa-solid fa-lock mx-2"></i>
                            <span>password</span>
                        </div>

                    </div>
                    <Form onSubmit={handleSubmit(submit)}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email"  {...register('email')} />
                            <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                            </Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" {...register('password')} />
                        </Form.Group>
                        <div className='big-btn-container'>
                            <Button variant="primary" type="submit" className='big-btn mt-5'>
                                Submit
                            </Button>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </div>
    );
};

export default Login;