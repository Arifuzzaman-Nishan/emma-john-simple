import React from 'react';

const ReviewItem = (props) => {
    console.log(props.product);
    const {name,quantity,price} = props.product;
    return (
        <div>
            <h3>{name}</h3>
            <p>${price}</p>
            <p>Quantity: {quantity}</p>
            <button className = "button">Remove</button>
           
        </div>
    );
};

export default ReviewItem;