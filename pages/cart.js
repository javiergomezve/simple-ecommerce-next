import Head from 'next/head';
import Link from 'next/link';

import products from '../products.json';
import styles from '../styles/Home.module.css';
import { useCart } from '../hooks/useCart';
import CartIcon from '../components/CartIcon';
import QuantityForm from '../components/QuantityForm';

export default function Cart() {
    const { cartItems, checkout } = useCart();

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
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <h1 style={{ marginRight: '.3em' }}>Cart</h1>
                    <CartIcon />
                </div>

                <table className={styles.table} cellSpacing="0" cellPadding="0">
                    <thead>
                        <tr>
                            <th>Product name</th>
                            <th>Quantity</th>
                            <th>Price per item</th>
                            <th>Item total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cartItems.length === 0 && (
                            <tr>
                                <td colSpan={4}>
                                    Your cart is empty.{' '}
                                    <Link href="/">
                                        <a>Keep buying.</a>
                                    </Link>
                                </td>
                            </tr>
                        )}

                        {cartItems.map(({ id, quantity, pricePerItem }) => (
                            <tr key={id}>
                                <td>{products.find(p => p.id === id).title}</td>
                                <td>
                                    <QuantityForm id={id} quantity={quantity} />
                                </td>
                                <td>$ {pricePerItem}</td>
                                <td>$ {pricePerItem * quantity}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {cartItems.length > 0 && (
                    <button className={styles.button} onClick={checkout}>
                        Check out
                    </button>
                )}
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
