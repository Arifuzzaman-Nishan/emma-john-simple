import React from 'react';
import './ReviewItem.css';

const ReviewItem = (props) => {
    // console.log(props.product);
    const { name, quantity, price ,key } = props.product;
    return (
        <div>
            <div className = "bd">
                <h3>{name}</h3>
                <p>${price}</p>
                <p>Quantity: {quantity}</p>
                <button onClick = {() => props.removeProduct(key)} className="button">Remove</button>
            </div>

        </div>
    );
};

export default ReviewItem;