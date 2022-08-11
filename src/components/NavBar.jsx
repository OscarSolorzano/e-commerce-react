import React, { useState } from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Cart from './Cart';

const NavBar = () => {

    const token = localStorage.getItem('token')
    const navigate = useNavigate()

    const [show, setShow] = useState(false)

    const handleClose = () => setShow(false)
    const handleShow = () => {
        if (token) {
            setShow(true)
        }
        else{
            navigate('/login')
        }
    }

    return (
        <Container>
            <Navbar bg="light" expand="lg" className='navbar'>
                <Navbar.Brand href="/#/">e-Commerce</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        {
                            token ?
                                <Nav.Link href="/#/user"><i className="fa-solid fa-user"></i></Nav.Link>
                                :
                                <Nav.Link href="/#/login"><i className="fa-solid fa-user"></i></Nav.Link>
                        }

                        <Nav.Link href="/#/purchases"><i className="fa-solid fa-store"></i></Nav.Link>
                        <Nav.Link as={Button} onClick={handleShow}><i className="fa-solid fa-cart-shopping"></i></Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            <Cart show={show} handleClose={handleClose}/>
        </Container>
    );
};

export default NavBar;