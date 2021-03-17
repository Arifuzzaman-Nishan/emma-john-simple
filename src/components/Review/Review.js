import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import fakeData from '../../fakeData';
import { getDatabaseCart, processOrder, removeFromDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import ReviewItem from '../ReviewItem/ReviewItem';
import './Review.css';
import happyImage from '../../images/giphy.gif';



const Review = () => {
    const [cart, setCart] = useState([]);
    const [orderPlaced, setOrderPlaced] = useState(false);
    const history = useHistory();

    const handleProceedCheckOut = () => {
       history.push('/shipment');
    }

    const removeProduct = (productKey) => {
        const newCart = cart.filter(pd => pd.key !== productKey);
        setCart(newCart);
        removeFromDatabaseCart(productKey);
    }

    useEffect(() => {
        const saveCart = getDatabaseCart();   //from database
        const productkeys = Object.keys(saveCart);

        const cartProduct = productkeys.map(key => {
            const product = fakeData.find(pd => pd.key === key);
            product.quantity = saveCart[key];
            return product;
        });
        setCart(cartProduct);
    }, []);

    let thankYou;
    if (orderPlaced) {
        thankYou = <img src={happyImage} alt=""/>
    }

    return (
        <div className="review-container">
            <div className="review-product">
                {
                    cart.map(pd => <ReviewItem removeProduct={removeProduct} key={pd.key} product={pd}></ReviewItem>)
                }
                {thankYou}
            </div>
            <div>
                <div className="review-cart-container">
                    <Cart cart={cart}>
                            <button onClick={handleProceedCheckOut} className="button">Proceed Checkout</button>
                    </Cart>
                </div>
            </div>
        </div>
    );
};

export default Review;