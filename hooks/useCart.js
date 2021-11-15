import { createContext, useState, useContext } from 'react';

import products from '../products.json';
import { initiateCheckout } from '../lib/payments';

export const CartContext = createContext();

const defaultCart = {
    products: {},
};

export function useCartState() {
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

    return {
        cart,
        subTotal,
        totalItems,
        addToCart,
        checkout,
    };
}

export function useCart() {
    const cart = useContext(CartContext);
    return cart;
}
