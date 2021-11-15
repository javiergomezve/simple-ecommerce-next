import Nav from '../components/Nav';
import { CartContext, useCartState } from '../hooks/useCart';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
    const cart = useCartState();

    return (
        <CartContext.Provider value={cart}>
            <Nav />
            <Component {...pageProps} />
        </CartContext.Provider>
    );
}

export default MyApp;
