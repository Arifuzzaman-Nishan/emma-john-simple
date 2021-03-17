import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { userContext } from '../../App';
import logo from '../../images/logo.png';
import './Header.css';

const Header = () => {
    const [loggedInUser,setLoggedInUser] = useContext(userContext);
    return (
        <div className="header">
            <img src={logo} alt="" />
            <nav>
                <ul className="nav-list">
                    <li>
                        <Link to="/shop">Shop</Link>
                    </li>
                    <li>
                        <Link to="/review">Order Review</Link>
                    </li>
                    <li>
                        <Link to="/inventory">Manage Inventory here</Link>
                    </li>
                    <li>
                        <button onClick={()=>setLoggedInUser({})}>Sign Out</button>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Header;