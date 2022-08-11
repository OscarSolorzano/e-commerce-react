import React, { useEffect } from 'react';
import { Button, Offcanvas } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { buyCartThunk, changeQuantityThunk, deleteItemThunk, getCartThunk } from '../store/slices/cart.slice';
import { useNavigate } from 'react-router-dom'

const Cart = ({ show, handleClose }) => {

    const dispatch = useDispatch()

    const cart = useSelector(state => state.cart)

    const navigate = useNavigate()

    useEffect(() => {
        dispatch(getCartThunk())
    }, [])

    const getTotal = () => {
        let total = 0
        cart.forEach(product => {
            total += product.price * product.productsInCart.quantity
        })
        return total
    }

    const increaseItem = (id,quantity) => {
        const updatedItem = {
            id : id,
            newQuantity: quantity + 1
        }
        dispatch(changeQuantityThunk(updatedItem))
    }

    const decreaseItem = (id,quantity) => {
        const updatedItem = {
            id : id,
            newQuantity: quantity - 1
        }
        dispatch(changeQuantityThunk(updatedItem))
    }


    return (
        <Offcanvas placement="end" show={show} onHide={handleClose}>
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>My Shopping Cart</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <div className='cart-products'>
                    {
                        cart.map(item => (
                            <div
                                key={item.id}
                                className='cart-product'>
                                <div className='brand-delete-container'>
                                    <h6>{item.brand}</h6>
                                    <button
                                        className='delete-btn'
                                        onClick={() => dispatch(deleteItemThunk(item.id))}
                                    >
                                        <i className="fa-solid fa-trash-can"></i>
                                    </button>
                                </div>
                                <p onClick={() => {
                                    navigate(`/product/${item.id}`)
                                    handleClose()
                                }}
                                >
                                    {item.title}
                                </p>
                                <div className='quantity-container'>
                                    <Button
                                        onClick={() => decreaseItem( item.id , item.productsInCart.quantity)}
                                        variant="light"
                                        className='quantity-btn'
                                    >
                                        -
                                    </Button>
                                    <span className='px-1'>
                                    {item.productsInCart.quantity}
                                    </span>
                                    <Button
                                        onClick={() => increaseItem( item.id , item.productsInCart.quantity)}
                                        variant="light"
                                        className='quantity-btn'
                                    >
                                        +</Button>
                                </div>
                                <h6 className='cart-total'>Total:</h6>
                                <p className='text-end me-4'>${item.price * item.productsInCart.quantity}</p>
                            </div>
                        ))
                    }
                </div>
                <div className='checkout'>
                    <div className='checkout-total'>
                        <p>Total:</p>
                        <p>${getTotal()}</p>
                    </div>
                    <Button
                        className='checkout-btn'
                        variant="success"
                        onClick={() => dispatch(buyCartThunk())}
                    >
                        Checkout
                    </Button>
                </div>
            </Offcanvas.Body>
        </Offcanvas>
    );
};

export default Cart;