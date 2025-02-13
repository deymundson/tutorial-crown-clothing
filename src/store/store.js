import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import logger from "redux-logger";
import createSagaMiddleware from "redux-saga";

import { rootReducer } from "./root-reducer";
import { rootSaga } from "./root-saga";

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: persistReducer(
    {
      key: "root",
      storage,
      whitelist: ["cart"],
    },
    rootReducer
  ),
  middleware: (getDefaultMiddleware) =>
    [
      process.env.NODE_ENV === "development" && logger,
      sagaMiddleware,
      ...getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
    ].filter(Boolean),
});

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);
