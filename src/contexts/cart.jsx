import { createContext, useState } from "react";

const addProductToCartItems = (cartItems, product) => {
  const existingCartItem = cartItems.find((item) => item.id === product.id);
  if (existingCartItem) {
    existingCartItem.quantity++;
    return [...cartItems];
  }

  return [...cartItems, { ...product, quantity: 1 }];
};

export const CartContext = createContext({
  hidden: true,
  toggleHidden: () => {},
  hide: () => {},
  cartItems: [],
  addItemToCart: () => {},
});

export const CartProvider = ({ children }) => {
  const [hidden, setHidden] = useState(true);
  const [cartItems, setCartItems] = useState([]);

  const addItemToCart = (product) => {
    setCartItems(addProductToCartItems(cartItems, product));
  };

  const toggleHidden = () => setHidden(!hidden);
  const hide = () => setHidden(true);

  return (
    <CartContext.Provider
      value={{ hidden, toggleHidden, hide, cartItems, addItemToCart }}
    >
      {children}
    </CartContext.Provider>
  );
};
