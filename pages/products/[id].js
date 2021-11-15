import Head from 'next/head';
import Image from 'next/image';

import products from '../../products.json';
import styles from '../../styles/Home.module.css';
import { useCart } from '../../hooks/useCart';

const ProductDetail = props => {
    const { id, title, description, image, price } = props.product;

    const { addToCart } = useCart();

    return (
        <div className={styles.container}>
            <Head>
                <title>{title} - Space Jelly Shop</title>
                <meta
                    name={`${title} - Space Jelly Shop`}
                    content={description}
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={styles.productDetail}>
                {image && (
                    <Image
                        src={image}
                        alt={title}
                        width="300px"
                        height="300px"
                    />
                )}

                <div>
                    <h1>{title}</h1>
                    <p>{description}</p>
                    <p>$ {price}</p>
                    <button
                        className={styles.button}
                        onClick={() => {
                            addToCart({ id });
                        }}
                    >
                        Buy
                    </button>
                </div>
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
};

export default ProductDetail;

export async function getStaticProps({ params }) {
    const product = products.find(product => product.id === params.id);

    console.log(`product`, product);

    return {
        props: {
            product,
        },
    };
}

export async function getStaticPaths() {
    const paths = products.map(({ id }) => ({
        params: {
            id,
        },
    }));

    return {
        paths,
        fallback: false,
    };
}
