import Head from 'next/head';
import Image from 'next/image';
import { useState } from 'react';

import products from '../products.json';
import styles from '../styles/Home.module.css';
import { initiateCheckout } from '../lib/payments';

const defaultCart = {
    products: {},
};

export default function Home() {
    const [cart, setCart] = useState(defaultCart);

    const cartItems = Object.keys(cart.products).map(key => {
        const product = products.find(({ id }) => id === key);

        return {
            ...cart.products[key],
            pricePerItem: product.price,
        };
    });

    const subTotal = cartItems.reduce(
        (accumulator, { pricePerItem, quantity }) => {
            return accumulator + pricePerItem * quantity;
        },
        0
    );

    const totalItems = cartItems.reduce((accumulator, { quantity }) => {
        return accumulator + quantity;
    }, 0);

    const addToCart = ({ id } = {}) => {
        setCart(prev => {
            const cartState = { ...prev };

            if (cartState.products[id]) {
                cartState.products[id].quantity =
                    parseInt(cartState.products[id].quantity) + 1;
            } else {
                cartState.products[id] = {
                    id,
                    quantity: 1,
                };
            }

            return cartState;
        });
    };

    const checkout = () => {
        initiateCheckout({
            lineItems: cartItems.map(item => ({
                price: item.id,
                quantity: item.quantity,
            })),
        });
    };

    const renderProduct = ({ id, title, description, image, price }) => {
        return (
            <li className={styles.card} key={id}>
                <a href="#!">
                    <Image
                        src={image}
                        alt={description}
                        width="100%"
                        height="100%"
                    />
                    <h2>{title}</h2>
                    <p>$ {price}</p>
                    <p>{description}</p>
                </a>
                <p>
                    <button
                        className={styles.button}
                        onClick={() => addToCart({ id })}
                    >
                        Add to cart
                    </button>
                </p>
            </li>
        );
    };

    return (
        <div className={styles.container}>
            <Head>
                <title>Space Jelly Shop</title>
                <meta
                    name="description"
                    content="Buy any Space Jelly items online"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={styles.main}>
                <h1 className={styles.title}>Space Jelly Shop</h1>

                <p className={styles.description}>
                    The best space jellyfish swag on the web!
                </p>

                <p className={styles.description}>
                    <strong>Items:</strong> {totalItems} <br />{' '}
                    <strong>Total cost:</strong> $ {subTotal} <br />{' '}
                    <button className={styles.button} onClick={checkout}>
                        Check out!
                    </button>
                </p>

                <ul className={styles.grid}>{products.map(renderProduct)}</ul>
            </main>

            <footer className={styles.footer}>
                <a
                    href="https://javiergomezve.com"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Powered by{' '}
                    <span className={styles.logo}>javiergomezve</span>
                </a>
            </footer>
        </div>
    );
}
