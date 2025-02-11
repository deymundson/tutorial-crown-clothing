import { combineReducers } from "redux";
import { cartReducer } from "./cart";
import { categoriesReducer } from "./categories";
import { userReducer } from "./user";

export const rootReducer = combineReducers({
  cart: cartReducer,
  categories: categoriesReducer,
  user: userReducer,
});
