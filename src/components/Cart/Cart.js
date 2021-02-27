import { faToriiGate } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import { nativeTouchData } from 'react-dom/test-utils';



const Cart = (props) => {

    let total = 0;
    props.cart.forEach(pd => {
        total += pd.price;
    });

    let shippingCost = 0;
    if (total > 0 && total <= 35) shippingCost = 7.99;
    else if (total > 35) shippingCost = 3.92;
    else if (total === 0) shippingCost = 0;


    const tax = (total + shippingCost)*0.1;

    const formatNumber = (num) => {
        const precision = num.toFixed(2);
        return Number(precision);
    }

    return (
        <div>
            <h2>Order Summary</h2>
            <h3>Items Ordered: {props.cart.length}</h3>
            <div>
                <p><small>Items: ${formatNumber(total)}</small></p>
                <p><small>Shopping & Handling: ${shippingCost} </small></p>
                <p><small>Total before tax: {formatNumber(total + shippingCost)} </small></p>
                <p><small>Estimated Tax: {formatNumber(tax)}</small></p>
                <h3>Order Total: {formatNumber(total + shippingCost + tax)}</h3>
            </div>
        </div>
    );
};

export default Cart;