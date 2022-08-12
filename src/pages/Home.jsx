import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { filterCategoryThunk, filteredProductsThunk, getProductsThunk, setProducts } from '../store/slices/products.slice';
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
import { addCartThunk } from '../store/slices/cart.slice';

const Home = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [productSearched, setProductSearched] = useState('')
    const [categories, setCategories] = useState([])


    const { register, handleSubmit, reset } = useForm()



    const [show, setShow] = useState(false)
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    const [dropDwn, setDropDwn] = useState(false)
    const [dropDwn2, setDropDwn2] = useState(false)

    useEffect(() => {
        dispatch(getProductsThunk())

        axios.get('https://ecommerce-api-react.herokuapp.com/api/v1/products/categories')
            .then(res => setCategories(res.data.data.categories))
    }, [])

    let products = useSelector(state => state.products)

    const addToCart = product => {
        const productToAdd = {
            id: product.id,
            quantity: 1
        }
        dispatch(addCartThunk(productToAdd))
    }

    const submit = data => {
        const filteredProductsPrice = products.filter(product =>
            Number(product.price) >= data.min
        ).filter(product =>
            Number(product.price) <= data.max
        )
        console.log(filteredProductsPrice)
        dispatch(setProducts(filteredProductsPrice))
        reset({
            min: '',
            max: ''
        })
    }

    const submit2 = data => {
        const filteredProductsPrice = products.filter(product =>
            Number(product.price) >= data.min2
        ).filter(product =>
            Number(product.price) <= data.max2
        )
        console.log(filteredProductsPrice)
        dispatch(setProducts(filteredProductsPrice))
        reset({
            min2: '',
            max2: ''
        })
    }


    return (
        <div>
            <Offcanvas show={show} onHide={handleClose} responsive="lg" placement={'end'}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Filters</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <div className='drop-down-filter'>
                        <div className='drop-down-title' onClick={() => setDropDwn(!dropDwn)}>
                            <h4>Category</h4> <i className="fa-solid fa-chevron-down"></i>
                        </div>
                        <ListGroup variant="flush" className={'drop-down-menu ' + (dropDwn && 'closed')}>
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
                    </div>
                    <div className='drop-down-filter'>
                        <div className='drop-down-title' onClick={() => setDropDwn2(!dropDwn2)}>
                            <h4>Price</h4> <i className="fa-solid fa-chevron-down"></i>
                        </div>
                        <div className={'drop-down-menu ' + (dropDwn2 && 'closed')}>
                            <div>
                                <Form onSubmit={handleSubmit(submit2)}>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>From</Form.Label>
                                        <Form.Control type="number" placeholder="$"  {...register('min2')} />
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="formBasicPassword">
                                        <Form.Label>Up To</Form.Label>
                                        <Form.Control type="number" placeholder="$" {...register('max2')} />
                                    </Form.Group>
                                    <div className='big-btn-container'>
                                        <Button variant="primary" type="submit" className='big-btn'>
                                        Filter by Price
                                        </Button>
                                    </div>
                                </Form>
                            </div>
                        </div>
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
                    <div className='drop-down-filter'>
                        <div className='drop-down-title' onClick={() => setDropDwn2(!dropDwn2)}>
                            <h4>Price</h4> <i className="fa-solid fa-chevron-down"></i>
                        </div>
                        <div className={'drop-down-menu ' + (dropDwn2 && 'closed')}>
                            <div>
                                <Form onSubmit={handleSubmit(submit)}>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>From</Form.Label>
                                        <Form.Control type="number" placeholder="$"  {...register('min')} />
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="formBasicPassword">
                                        <Form.Label>Up To</Form.Label>
                                        <Form.Control type="number" placeholder="$" {...register('max')} />
                                    </Form.Group>
                                    <div className='big-btn-container'>
                                        <Button variant="primary" type="submit" className='big-btn'>
                                        Filter by Price
                                        </Button>
                                    </div>
                                </Form>
                            </div>
                        </div>
                    </div>
                </Col>
                <Col className='home-container'>
                    <div className='home'>
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
                                    >
                                        <Card.Img
                                            variant='top'
                                            className='card-img'
                                            src={product.productImgs[0]}
                                            onClick={() => navigate(`/product/${product.id}`)}
                                        />
                                        <Card.Body
                                            className='pb-0 mb-0'
                                        >
                                            <Card.Title onClick={() => navigate(`/product/${product.id}`)}>
                                                {product.title}
                                            </Card.Title>
                                            <Card.Subtitle
                                                className="mb-2 text-muted"
                                                onClick={() => navigate(`/product/${product.id}`)}
                                            >
                                                <b>Price:</b>
                                            </Card.Subtitle>
                                            <Card.Text onClick={() => navigate(`/product/${product.id}`)}>
                                                ${product.price}
                                            </Card.Text>
                                            <div className='add-to-cart-btn-cntnr'>
                                                <Button
                                                    className='add-to-cart-btn'
                                                    onClick={() => addToCart(product)}>
                                                    Add to Cart
                                                </Button>
                                            </div>
                                        </Card.Body>
                                    </Card>
                                ))}
                        </Row>
                    </div>
                </Col>
            </Row>
        </div>
    );
};

export default Home;