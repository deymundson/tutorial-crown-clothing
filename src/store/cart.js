import { createSelector } from "reselect";

export const CART_ACTION_TYPES = {
  SET_HIDDEN: "SET_HIDDEN",
  SET_CART_ITEMS: "SET_CART_ITEMS",
};

const INITIAL_STATE = {
  hidden: true,
  cartItems: [],
};

export const cartReducer = (state = INITIAL_STATE, action = {}) => {
  const { type, payload } = action;

  switch (type) {
    case CART_ACTION_TYPES.SET_HIDDEN:
      return { ...state, hidden: payload };
    case CART_ACTION_TYPES.SET_CART_ITEMS:
      return { ...state, cartItems: payload };
    default:
      return state;
  }
};

export const addItemToCart = (cartItems, product) => {
  const newCartItems = (() => {
    const existingCartItem = cartItems.find((item) => item.id === product.id);
    if (existingCartItem) {
      existingCartItem.quantity++;
      return [...cartItems];
    }

    return [...cartItems, { ...product, quantity: 1 }];
  })();

  return {
    type: CART_ACTION_TYPES.SET_CART_ITEMS,
    payload: newCartItems,
  };
};

export const removeItemFromCart = (cartItems, item) => {
  const newCartItems = (() => {
    const existingCartItem = cartItems.find((i) => i.id === item.id);
    if (existingCartItem.quantity === 1) {
      return cartItems.filter((i) => i.id !== item.id);
    }

    existingCartItem.quantity--;
    return [...cartItems];
  })();

  return {
    type: CART_ACTION_TYPES.SET_CART_ITEMS,
    payload: newCartItems,
  };
};

export const clearItemFromCart = (cartItems, item) => {
  const newCartItems = cartItems.filter((i) => i.id !== item.id);

  return {
    type: CART_ACTION_TYPES.SET_CART_ITEMS,
    payload: newCartItems,
  };
};

export const setCartHidden = (hidden) => ({
  type: CART_ACTION_TYPES.SET_HIDDEN,
  payload: hidden,
});

export const selectCartItems = createSelector(
  (state) => state.cart,
  (cart) => cart.cartItems
);

export const selectCartHidden = createSelector(
  (state) => state.cart,
  (cart) => cart.hidden
);

export const selectCartCount = createSelector(selectCartItems, (cartItems) =>
  cartItems.reduce((acc, item) => acc + item.quantity, 0)
);

export const selectCartTotal = createSelector(selectCartItems, (cartItems) =>
  cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
);
