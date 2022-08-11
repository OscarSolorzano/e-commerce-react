import React, { useEffect } from 'react';
import { Card, Col, Row, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { getPurchasesThunk } from '../store/slices/purchases.slice';

const Purchases = () => {

    const dispatch = useDispatch()

    const purchases = useSelector(state => state.purchases)

    useEffect(() => {
        dispatch(getPurchasesThunk())
    }, [])

    const dateFormat = ISOdate => {
        var date = new Date(ISOdate)
        return date.toDateString()
    }

    const getTotal = purchase =>{
        let total = 0
        purchase.cart.products.forEach(product => {
            total += product.price * product.productsInCart.quantity
        })
        return total
    }

    dateFormat()
    return (
        <div>
            <Row className='nav-product'>
                <Link to={'/'} className='home-link'>Home</Link>
                <div className='circle'></div>
                <div className='nav-product-title'><b>My purchases</b></div>
            </Row>
            <Row>
                <h1>My Purchases</h1>
            </Row>
            {
                purchases.map(purchase => (
                    <Row key={purchase.id}>
                        <Card className='purchase'>
                            <Card.Header>{dateFormat(purchase.createdAt)}</Card.Header>
                            <Card.Body className='purchase-body'>
                                <Table striped>
                                    <thead>
                                        <tr>
                                            <th>Product</th>
                                            <th className='text-center'>Quantity</th>
                                            <th className='text-center'>Price</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            purchase.cart.products.map(item => (
                                                <tr key={purchase.id + item.title}>
                                                    <td className='item-title'>{item.title}</td>
                                                    <td className='text-center'>{item.productsInCart.quantity}</td>
                                                    <td className='text-center'>${item.price}</td>
                                                </tr>
                                            ))
                                        }
                                        <tr>
                                            <td className='total-purchase'><b>Total</b></td>
                                            <td colSpan={2} className='total-purchase text-center'><b>{getTotal(purchase)}</b></td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </Card.Body>
                        </Card>
                    </Row>

                ))
            }
        </div>
    );
};

export default Purchases;