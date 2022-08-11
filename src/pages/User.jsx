import React from 'react';
import { Button, Card, Container, Row } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

const User = () => {

    const navigate = useNavigate()

    const logOut = () => {
        localStorage.setItem('token', '')
        navigate('/login')
    }

    const userInfo = JSON.parse(localStorage.getItem('userInfo'))


    return (
        <>
            <Row className='nav-product'>
                <Link to={'/'} className='home-link'>Home</Link>
                <div className='circle'></div>
                <div className='nav-product-title'><b>User Info</b></div>
            </Row>
            <h1 className='ms-5'>User Info</h1>
            <Container className='user-info-container'>                
                <Card className="text-center mx-5">
                    <Card.Body>
                        <Card.Title className='mt-5'><i className="fa-solid fa-user"></i> Name</Card.Title>
                        <Card.Text>
                            {userInfo?.firstName + ' ' + userInfo?.lastName}
                        </Card.Text>
                        <Card.Title><i className="fa-solid fa-envelope"></i> e-mail</Card.Title>
                        <Card.Text>
                            {userInfo?.email}
                        </Card.Text>
                        <Card.Title><i className="fa-solid fa-phone"></i> Phone</Card.Title>
                        <Card.Text>
                            {userInfo?.phone}
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer className="text-muted">
                        <Button
                            variant="danger"
                            onClick={logOut}
                            className='big-btn my-3'
                        >
                            Log Out
                        </Button>
                    </Card.Footer>
                </Card>
            </Container>
        </>
    );
};

export default User;