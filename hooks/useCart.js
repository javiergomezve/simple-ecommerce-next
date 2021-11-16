import { createContext, useState, useContext, useEffect } from 'react';

import products from '../products.json';
import { initiateCheckout } from '../lib/payments';

export const CartContext = createContext();

const defaultCart = {
    products: {},
};

export function useCartState() {
    const [cart, setCart] = useState(defaultCart);

    useEffect(() => {
        const stateFromLocalStorage =
            window.localStorage.getItem('spacejelly_cart');
        const data = stateFromLocalStorage && JSON.parse(stateFromLocalStorage);
        if (data) {
            setCart(data);
        }
    }, []);

    useEffect(() => {
        const data = JSON.stringify(cart);
        window.localStorage.setItem('spacejelly_cart', data);
    }, [cart]);

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
                    cartState.products[id].quantity + 1;
            } else {
                cartState.products[id] = {
                    id,
                    quantity: 1,
                };
            }

            return cartState;
        });
    };

    const updateItem = ({ id, quantity }) => {
        setCart(prev => {
            const cartState = { ...prev };

            if (cartState.products[id]) {
                if (quantity > 0) {
                    cartState.products[id].quantity = quantity;
                } else {
                    delete cartState.products[id];
                }
            }

            return cartState;
        });
    };

    const checkout = () => {
        const lineItems = cartItems.map(item => ({
            price: item.id,
            quantity: parseInt(item.quantity),
        }));

        initiateCheckout({
            lineItems,
        });
    };

    return {
        cart,
        subTotal,
        totalItems,
        cartItems,
        addToCart,
        updateItem,
        checkout,
    };
}

export function useCart() {
    const cart = useContext(CartContext);
    return cart;
}
