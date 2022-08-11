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
    Carousel
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

    const [dropDwn, setDropDwn] = useState(false)

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
                    <div className='drop-down-filter'>
                        <div className='drop-down-title' onClick={() => setDropDwn(!dropDwn)}>
                            <h4>Category</h4> <i class="fa-solid fa-chevron-down"></i>
                        </div>
                        <ListGroup variant="flush" className={'drop-down-menu ' + (dropDwn && 'closed')}>
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
                    </div>
                </Offcanvas.Body>
            </Offcanvas>

            <Row>
                <Col lg={3} xl={2} className="d-none d-lg-block">
                    <div className='drop-down-filter'>
                        <div className='drop-down-title' onClick={() => setDropDwn(!dropDwn)}>
                            <h4>Category</h4> <i className="fa-solid fa-chevron-down"></i>
                        </div>
                        <ListGroup variant="flush" className={'drop-down-menu ' + (dropDwn && 'closed')}>
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
                    </div>
                </Col>
                <Col>
                    <h1>Home</h1>

                    {/* Search Product */}

                    <InputGroup className="mb-3">
                        <Form.Control
                            placeholder="Start typing a product..."
                            aria-describedby="basic-addon2"
                            value={productSearched}
                            onChange={e => setProductSearched(e.target.value)}
                        />
                        <Button
                            variant="secondary"
                            className='search-btn'
                            onClick={() => dispatch(filteredProductsThunk(productSearched))}
                        >
                            <i className="fa-solid fa-magnifying-glass"></i>
                        </Button>

                        {/* Filter Buton */}

                        <Button variant="primary" className="d-lg-none search-btn" onClick={handleShow}>
                            <i className="fa-solid fa-filter"></i>
                        </Button>
                    </InputGroup>
                    <Row className='p-0'>
                        <Carousel>
                            <Carousel.Item
                                onClick={() => {
                                    dispatch(filterCategoryThunk(2))
                                    window.scroll({
                                        top: 300,
                                        left: 100,
                                        behavior: 'smooth'
                                      })
                                }}
                            >
                                <img
                                    className="d-block w-100"
                                    src="/assets/3.png"
                                    alt="First slide"
                                />
                            </Carousel.Item>
                            <Carousel.Item
                                onClick={() => {
                                    dispatch(filterCategoryThunk(3))
                                    window.scroll({
                                        top: 400,
                                        left: 100,
                                        behavior: 'smooth'
                                      })
                                }}>
                                <img
                                    className="d-block w-100"
                                    src="/assets/1.png"
                                    alt="Second slide"
                                />
                            </Carousel.Item>
                            <Carousel.Item>
                                <img
                                    className="d-block w-100"
                                    src="/assets/2.png"
                                    alt="Third slide"
                                />
                            </Carousel.Item>
                        </Carousel>
                    </Row>
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