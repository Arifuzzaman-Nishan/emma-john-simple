import React from 'react';
import './Product.css';

const Product = (props) => {
  const {img,name,seller,price,stock} = props.product;
    return (
        <div className = "product">
           <div>
                <img src={img} alt=""/>
           </div>
           <div className = "">
                <h4 className = "product-name">{name}</h4>
                <p><small>by: </small>{seller}</p>
                <p>${price}</p>
                <p><small>only {stock} left in stock - order soon</small></p>
           </div>
        </div>
    );
};

export default Product;