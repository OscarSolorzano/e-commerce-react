import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';

const NavBar = () => {
    return (
        <Container>
            <Navbar bg="light" expand="lg" className='navbar'>
                    <Navbar.Brand href="/#/">e-Commerce</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link  href="/#/login"><i className="fa-solid fa-user"></i></Nav.Link>
                            <Nav.Link  href="/#/purchases"><i className="fa-solid fa-store"></i></Nav.Link>
                            <Nav.Link  href="/#/login"><i className="fa-solid fa-cart-shopping"></i></Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
            </Navbar>
        </Container>
    );
};

export default NavBar;