import { createContext, useReducer } from "react";

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
  setHidden: () => {},
  cartItems: [],
  addProductToCart: () => {},
  removeItemFromCart: () => {},
  clearItemFromCart: () => {},
});

export const CART_ACTION_TYPES = {
  SET_HIDDEN: "SET_HIDDEN",
  SET_CART_ITEMS: "SET_CART_ITEMS",
};

const cartReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case CART_ACTION_TYPES.SET_HIDDEN:
      return { ...state, hidden: payload };
    case CART_ACTION_TYPES.SET_CART_ITEMS:
      return { ...state, cartItems: payload };
    default:
      throw new Error(`Unhandled type in cartReducer: ${type}`);
  }
};

const INITIAL_STATE = {
  hidden: true,
  cartItems: [],
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, INITIAL_STATE);
  const { hidden, cartItems } = state;

  const addProductToCart = (product) =>
    dispatch({
      type: CART_ACTION_TYPES.SET_CART_ITEMS,
      payload: addProductToCartItems(cartItems, product),
    });

  const removeItemFromCart = (item) =>
    dispatch({
      type: CART_ACTION_TYPES.SET_CART_ITEMS,
      payload: removeItemFromCartItems(cartItems, item.id),
    });

  const clearItemFromCart = ({ id }) =>
    dispatch({
      type: CART_ACTION_TYPES.SET_CART_ITEMS,
      payload: cartItems.filter((item) => item.id !== id),
    });

  const setHidden = (newHidden) =>
    dispatch({ type: CART_ACTION_TYPES.SET_HIDDEN, payload: newHidden });

  return (
    <CartContext.Provider
      value={{
        hidden,
        setHidden,
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
