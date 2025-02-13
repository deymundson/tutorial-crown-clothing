import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    hidden: true,
    cartItems: [],
  },
  reducers: {
    addItemToCart: (state, action) => {
      const product = action.payload;
      const existingCartItem = state.cartItems.find(
        (item) => item.id === product.id
      );
      if (existingCartItem) {
        existingCartItem.quantity += 1;
      } else {
        state.cartItems.push({ ...product, quantity: 1 });
      }
    },
    clearItemFromCart: (state, action) => {
      const item = action.payload;
      state.cartItems = state.cartItems.filter((i) => i.id !== item.id);
    },
    removeItemFromCart: (state, action) => {
      const item = action.payload;
      const existingCartItem = state.cartItems.find((i) => i.id === item.id);
      if (existingCartItem.quantity > 1) {
        existingCartItem.quantity -= 1;
      } else {
        state.cartItems = state.cartItems.filter((i) => i.id !== item.id);
      }
    },
    setCartHidden: (state, action) => {
      state.hidden = action.payload;
    },
    setCartItems: (state, action) => {
      state.cartItems = action.payload;
    },
  },
});

export const cartReducer = cartSlice.reducer;

export const {
  addItemToCart,
  clearItemFromCart,
  removeItemFromCart,
  setCartHidden,
} = cartSlice.actions;

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
