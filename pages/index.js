import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

import products from '../products.json';
import styles from '../styles/Home.module.css';
import { useCart } from '../hooks/useCart';

export default function Home() {
    const { addToCart } = useCart();

    const renderProduct = ({ id, title, description, image, price }) => {
        return (
            <li className={styles.card} key={id}>
                <Link href={`/products/${id}`}>
                    <a>
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
                </Link>
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
                <p className={styles.description}>
                    The best space jellyfish swag on the web!
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
