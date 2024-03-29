import React, { useEffect, useState } from 'react';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css'
import { Link } from 'react-router-dom';

const Shop = () => {
    // const first10 = fakeData.slice(0, 10);
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);

    useEffect(() => {
        fetch('https://secure-springs-28866.herokuapp.com/products')
            .then(res => res.json())
            .then(data => setProducts(data))
    }, [])

    useEffect(() => {
        const saveCart = getDatabaseCart();
        const productKeys = Object.keys(saveCart);
        // console.log(products, productKeys);

        fetch('https://secure-springs-28866.herokuapp.com/productsByKeys', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(productKeys)
        })
            .then(res => res.json())
            .then(data => setCart(data))



        // if (products.length > 0) {
        //     const previousCart = productKeys.map(existingKey => {
        //         const product = products.find(pd => pd.key === existingKey);
        //         product.quantity = saveCart[existingKey];
        //         return product;
        //     })
        //     setCart(previousCart);
        // }

    }, [])

    const handleAddProduct = (product) => {
        console.log(product);

        const sameProduct = cart.find(pd => pd.key === product.key);
        console.log(sameProduct);

        let count = 1;
        let newCart;

        if (sameProduct) {
            count = sameProduct.quantity + 1;
            sameProduct.quantity += 1;
            const others = cart.filter(pd => pd.key !== product.key)
            newCart = [...others, sameProduct];
        }
        else {
            product.quantity = 1;
            newCart = [...cart, product];
        }
        setCart(newCart);

        addToDatabaseCart(product.key, count);
    }

    return (
        <div className="shop-container">
            <div className="product-container">

                {
                    products.map(pd => <Product key={pd.key} showAddToCart={true} handleAddProduct={handleAddProduct} product={pd}></Product>)
                }

            </div>
            <div className="cart-container">
                <Cart cart={cart}>
                    <Link to="/review" className="link">
                        <button className="button">Review your order</button>
                    </Link>
                </Cart>
            </div>
        </div>
    );
};

export default Shop;