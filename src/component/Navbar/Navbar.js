import React from "react";
import { NavDropdown } from "react-bootstrap";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import './Navbar.scss';

const Navbar = () => {

    const state = useSelector((state) => state.handleCart);

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-white py-3 shadow-sm">
                <div className="container">
                    <NavLink className="navbar-brand fw-bold fs-4" to="/">
                        AKI SHOP
                    </NavLink>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">

                        {/* <input type='text'
                            placeholder="検索"
                            className="search mx-auto mb-2 mb-lg-0 "
                        // onChange={(event) => setQuery(event.target.value)}
                        /> */}

                        <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <NavLink className="nav-link" aria-current="page" to="/">
                                    ホームページ
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/users">
                                    ユーザー管理
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/about">
                                    AKIについて
                                </NavLink>
                            </li>
                        </ul>


                        <div className="buttons">
                            {/* <NavLink to="/login" className="btn btn-outline-dark">
                                <i className="fa fa-sign-in me-1"> ログイン</i>
                            </NavLink>
                            <NavLink to="/register" className="btn btn-outline-dark ms-2">
                                <i className="fa fa-user-plus"> 登録</i>
                            </NavLink> */}
                            <NavLink to="/cart" className="btn btn-outline-dark ms-2">
                                <i className="fa fa-shopping-cart"> カート({state.length})</i>
                            </NavLink>
                        </div>

                        <div className="drop-down">
                            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">
                                    Another action
                                </NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action/3.4">
                                    Separated link
                                </NavDropdown.Item>
                            </NavDropdown>
                        </div>
                    </div>
                </div>
            </nav>
        </div>

    );
};

export default Navbar;