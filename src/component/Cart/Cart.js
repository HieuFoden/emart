import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { addCart, delCart } from '../../redux/action/index';
import './Cart.scss'

const Cart = () => {
    const state = useSelector((state) => state.handleCart);
    const dispatch = useDispatch();
    let total = 0;

    const handleAdd = (item) => {
        dispatch(addCart(item));
    };
    const handleDel = (item) => {
        dispatch(delCart(item));
    };

    const emptyCart = () => {
        return (
            <div className="px-4 my-5 bg-light rounded-3 py-5">
                <div className="container py-4">
                    <div className="row">
                        <h3>カートには製品がありません</h3>
                    </div>
                </div>
            </div>
        );
    };
    const cartItems = (product) => {
        total += product.qty * product.price;
        return (
            <>
                <div className="px-4 my-5 bg-light rounded-3 py-5">
                    <div className="container py-4">
                        <button onClick={() => handleDel(product)} className="btn-close float-end " aria-label="Close"></button>
                        <div className="row justify-content-center">
                            <div className="col-md-4">
                                <img
                                    src={product.image}
                                    alt={product.title}
                                    height="200px"
                                    width="180px"
                                />
                            </div>
                            <div className="col-md-4">
                                <h3>{product.title}</h3>
                                <p className="lead fw-bold">
                                    {product.qty} X ¥{product.price} = ¥ {product.qty * product.price}
                                </p>
                                <button
                                    className="btn btn-outline-dark me-4"
                                    onClick={() => handleDel(product)}
                                >
                                    <i className="fa fa-minus"></i>
                                </button>
                                <button
                                    className="btn btn-outline-dark"
                                    onClick={() => handleAdd(product)}
                                >
                                    <i className="fa fa-plus"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    };
    const buttons = () => {
        return (
            <>
                <div className="container">
                    <div className="row">
                        <NavLink to="/checkout" className="btn btn-outline-dark mb-5 w-25 mx-auto">
                            Proceed to Checkout
                        </NavLink>
                    </div>
                </div>
            </>
        );
    };

    return (
        <div>
            {state.length === 0 && emptyCart()}
            {state.length !== 0 && state.map(cartItems)}

            <h3 className="total">合計 :¥ {total}</h3>

            {state.length !== 0 && buttons()}
        </div>
    );
};

export default Cart;