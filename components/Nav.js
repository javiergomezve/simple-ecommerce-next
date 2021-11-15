import Link from 'next/link';

import styles from '../styles/Nav.module.css';
import { useCart } from '../hooks/useCart';
import CartIcon from './CartIcon';

const Nav = () => {
    const { subTotal } = useCart();

    return (
        <nav className={styles.nav}>
            <Link href="/">
                <a className={styles.navTitle}>Space Jelly Shop</a>
            </Link>

            <p className={styles.navCart}>
                <Link href="/cart">
                    <a>
                        <CartIcon />
                        <span>$ {subTotal}</span>
                    </a>
                </Link>
            </p>
        </nav>
    );
};

export default Nav;
