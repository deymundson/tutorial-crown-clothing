import { createContext, useState } from "react";

const addProductToCartItems = (cartItems, product) => {
  const existingCartItem = cartItems.find((item) => item.id === product.id);
  if (existingCartItem) {
    existingCartItem.quantity++;
    return [...cartItems];
  }

  return [...cartItems, { ...product, quantity: 1 }];
};

const removeItemFromCartItems = (cartItems, itemId) => {
  const existingCartItem = cartItems.find((item) => item.id === itemId);
  if (existingCartItem.quantity === 1) {
    return cartItems.filter((item) => item.id !== itemId);
  }

  existingCartItem.quantity--;
  return [...cartItems];
};

export const CartContext = createContext({
  hidden: true,
  toggleHidden: () => {},
  hide: () => {},
  cartItems: [],
  addProductToCart: () => {},
  removeItemFromCart: () => {},
  clearItemFromCart: () => {},
});

export const CartProvider = ({ children }) => {
  const [hidden, setHidden] = useState(true);
  const [cartItems, setCartItems] = useState([]);

  const addProductToCart = (product) => {
    setCartItems(addProductToCartItems(cartItems, product));
  };

  const removeItemFromCart = (item) => {
    setCartItems(removeItemFromCartItems(cartItems, item.id));
  };

  const clearItemFromCart = (item) => {
    setCartItems(cartItems.filter((cartItem) => cartItem.id !== item.id));
  };

  const toggleHidden = () => setHidden(!hidden);
  const hide = () => setHidden(true);

  return (
    <CartContext.Provider
      value={{
        hidden,
        toggleHidden,
        hide,
        cartItems,
        addProductToCart,
        removeItemFromCart,
        clearItemFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
