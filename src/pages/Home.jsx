import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { filterCategoryThunk, filteredProductsThunk, getProductsThunk } from '../store/slices/products.slice';
import {
    Row,
    Col,
    Card,
    InputGroup,
    Form,
    Button,
    ListGroup,
    Offcanvas,
    Dropdown
} from 'react-bootstrap'
import axios from 'axios';

const Home = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [productSearched, setProductSearched] = useState('')
    const [categories, setCategories] = useState([])

    const [show, setShow] = useState(false)
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    useEffect(() => {
        dispatch(getProductsThunk())

        axios.get('https://ecommerce-api-react.herokuapp.com/api/v1/products/categories')
            .then(res => setCategories(res.data.data.categories))
    }, [])

    const products = useSelector(state => state.products)

    return (
        <div>
            <Offcanvas show={show} onHide={handleClose} responsive="lg" placement={'end'}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Filters</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Dropdown className="d-inline mx-2" autoClose={false}>
                        <Dropdown.Toggle className='drop-dwn-category-btn' id="dropdown-autoclose-false">
                            Category
                        </Dropdown.Toggle>
                        <Dropdown.Menu className='drop-dwn-category' show={true}>
                            <ListGroup variant="flush">
                                <ListGroup.Item
                                    className='drop-down-item'
                                    onClick={() => {
                                        dispatch(getProductsThunk())
                                        handleClose()
                                    }}
                                >
                                    All
                                </ListGroup.Item>
                                {
                                    categories.map(categorie => (
                                        <ListGroup.Item
                                            className='drop-down-item'
                                            key={categorie.id}
                                            onClick={() => {
                                                dispatch(filterCategoryThunk(categorie.id))
                                                handleClose()
                                            }}
                                        >
                                            {categorie.name}
                                        </ListGroup.Item>
                                    ))
                                }
                            </ListGroup>
                        </Dropdown.Menu>
                    </Dropdown>
                </Offcanvas.Body>
            </Offcanvas>

            <Row>
                <Col lg={3} xl={2} className="d-none d-lg-block">
                    <Dropdown className="d-inline mx-2" autoClose={false}>
                        <Dropdown.Toggle className='drop-dwn-category-btn' id="dropdown-autoclose-false">
                            Category
                        </Dropdown.Toggle>
                        <Dropdown.Menu className='drop-dwn-category' show={true}>
                            <ListGroup variant="flush">
                                <ListGroup.Item
                                    className='drop-down-item'
                                    onClick={() => {
                                        dispatch(getProductsThunk())
                                    }}
                                >
                                    All
                                </ListGroup.Item>
                                {
                                    categories.map(categorie => (
                                        <ListGroup.Item
                                            className='drop-down-item'
                                            key={categorie.id}
                                            onClick={() => {
                                                dispatch(filterCategoryThunk(categorie.id))
                                            }}
                                        >
                                            {categorie.name}
                                        </ListGroup.Item>
                                    ))
                                }
                            </ListGroup>
                        </Dropdown.Menu>
                    </Dropdown>
                </Col>
                <Col>
                    <h1>Home</h1>

                    {/* Search Product */}

                    <InputGroup className="mb-3">
                        <Form.Control
                            placeholder="Recipient's username"
                            aria-label="Recipient's username"
                            aria-describedby="basic-addon2"
                            value={productSearched}
                            onChange={e => setProductSearched(e.target.value)}
                        />
                        <Button
                            variant="outline-secondary"
                            className='search-btn'
                            onClick={() => dispatch(filteredProductsThunk(productSearched))}
                        >
                            <i className="fa-solid fa-magnifying-glass"></i>
                        </Button>

                        {/* Filter Buton */}

                        <Button variant="secondary" className="d-lg-none search-btn" onClick={handleShow}>
                            <i className="fa-solid fa-filter"></i>
                        </Button>
                    </InputGroup>


                    {/* Product Cards */}

                    <Row className=" card-container">
                        {
                            products.map(product => (
                                <Card
                                    className='card'
                                    key={product.id}
                                    onClick={() => navigate(`/product/${product.id}`)}
                                >
                                    <Card.Img
                                        variant='top'
                                        className='card-img'
                                        src={product.productImgs[0]}
                                    />
                                    <Card.Body>
                                        <Card.Title>{product.title}</Card.Title>
                                        <Card.Subtitle className="mb-2 text-muted">
                                            <b>Price:</b>
                                        </Card.Subtitle>
                                        <Card.Text>${product.price}</Card.Text>
                                    </Card.Body>
                                </Card>
                            ))}
                    </Row>
                </Col>
            </Row>
        </div>
    );
};

export default Home;