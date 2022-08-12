import React, { useEffect, useState } from 'react';
import { Button, Card, Carousel, Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { addCartThunk } from '../store/slices/cart.slice';
import { getProductsThunk } from '../store/slices/products.slice';

const ProductDetail = () => {

    const products = useSelector(state => state.products)
    const [product, setProduct] = useState({})
    const { id } = useParams()
    const [suggestedProducts, setSuggestedProducts] = useState([])
    const [quantity, setQuantity] = useState(1)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(getProductsThunk())
    }, [])

    useEffect(() => {
        const product = products.find(item => item.id === Number(id))
        setProduct(product)

        const filteredProducts = products.filter(item =>
            item.category.id === product.category.id
        )
            .filter(item =>
                item.id !== Number(id)
            )
        setSuggestedProducts(filteredProducts);
    }, [products, id])

    const decrement = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1)
        }
    }

    const increment = () => {
        setQuantity(quantity + 1)
    }

    const addToCart = () => {
        const productToAdd = {
            id: product.id,
            quantity: quantity
        }
        dispatch(addCartThunk(productToAdd))
    }

    const addToCartFast = () => {
        const productToAdd = {
            id: product.id,
            quantity: 1
        }
        dispatch(addCartThunk(productToAdd))
    }

    return (
        <div className='flex-cl'>
            <div className='product-detail-ctnr'>
                <Row className='nav-product'>
                    <Link to={'/'} className='home-link'>Home</Link>
                    <div className='circle'></div>
                    <div className='nav-product-title'><b>{product?.title}</b></div>
                </Row>
                <Row xs={1} md={2}>
                    <Col lg={8}>
                        <Carousel variant="dark">
                            {product?.productImgs?.map(img => (
                                <Carousel.Item key={img}>
                                    <div className='carousel-img-container'>
                                        <img
                                            className="carousel-img"
                                            src={img}
                                            alt="First slide"
                                        />
                                    </div>
                                </Carousel.Item>
                            ))}
                        </Carousel>
                    </Col>
                    <Col lg={4} className='flex-cl'>
                        <h2>{product?.title}</h2>
                        <Row>
                            <Col s={5}>
                                <p>Price</p>
                                <p>{product?.price}</p>
                            </Col>
                            <Col s={7} >
                                <p>Quantiy</p>
                                <div className='quantity-container'>
                                    <Button
                                        onClick={decrement}
                                        variant="light"
                                        className='quantity-btn'
                                    >
                                        -
                                    </Button>
                                    <span className='px-1'>
                                        {quantity}
                                    </span>
                                    <Button
                                        onClick={increment}
                                        variant="light"
                                        className='quantity-btn'
                                    >
                                        +</Button>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Button onClick={addToCart} className='my-4'>Add to Cart</Button>
                        </Row>
                    </Col>
                    <Row>
                        <p className='text-jstfy'>{product?.description}</p>
                    </Row>
                </Row>
                <div className='flex-cl'>
                    <Row className="card-container detail">
                        <h3>Discover similar Items</h3>
                        {
                            suggestedProducts.map(product => (
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
                                            onClick={() => addToCartFast(product)}>
                                            Add to Cart
                                        </Button>
                                    </div>
                                </Card.Body>
                            </Card>
                            ))
                        }
                    </Row>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;