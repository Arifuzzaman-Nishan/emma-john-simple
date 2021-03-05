import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.png';
import './Header.css';

const Header = () => {
    return (
        <div className="header">
            <img src={logo} alt="" />
            <nav>
                <ul className="nav-list">
                    <li>
                        <a href="/shop">Shop</a>
                    </li>
                    <li>
                        <a href="/review">Order Review</a>
                    </li>
                    <li>
                        <a href="/inventory">Manage Inventory here</a>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Header;