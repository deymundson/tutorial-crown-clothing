import { compose, createStore, applyMiddleware } from "redux";
import logger from "redux-logger";

import { rootReducer } from "./root-reducer";

const middlewares = [logger];

export const store = createStore(
  rootReducer,
  undefined,
  compose(applyMiddleware(...middlewares))
);
