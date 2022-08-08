import React, { useEffect, useState } from 'react';
import { Card, Carousel, Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getProductsThunk } from '../store/slices/products.slice';

const ProductDetail = () => {

    const products = useSelector(state => state.products)
    const [product, setProduct] = useState({})
    const { id } = useParams()
    const [suggestedProducts, setSuggestedProducts] = useState([])
    const [quantity, setQuantity] = useState(0)

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
        if(quantity > 0){
            setQuantity(quantity - 1)
        }
    }

    const increment = () => {
        setQuantity(quantity + 1)
    }

    return (
        <div>
            <Row className='nav-product'>
                <Link to={'/'} className='home-link'>Home</Link>
                <div className='circle'></div>
                <div className='nav-product-title'><b>{product?.title}</b></div>
            </Row>
            <Row>
                <Carousel variant="dark">
                    {product?.productImgs?.map(img => (
                        <Carousel.Item>
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
                <h2>{product?.title}</h2>
                <Row>
                    <Col>
                        <p>Price</p>
                        <p>{product.price}</p>
                    </Col>
                    <Col>
                        <p>Quantiy</p>
                        <div>
                            <button onClick={decrement}>-</button>
                            {quantity}
                            <button onClick={increment}>+</button>
                        </div>
                    </Col>
                </Row>
                <p>{product?.description}</p>
            </Row>
            <Row className=" card-container">
                <h3>Discover similar Items</h3>
                {
                    suggestedProducts.map(product => (
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
                    ))
                }
            </Row>
        </div>
    );
};

export default ProductDetail;