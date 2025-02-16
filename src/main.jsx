import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
} from "@apollo/client";
import App from "./App.jsx";
import { CartProvider, CategoriesProvider, UserProvider } from "./contexts";

import "./index.css";

const client = new ApolloClient({
  link: new HttpLink({
    uri: "https://crwn-clothing.com/",
    fetchOptions: {
      // mode: "no-cors",
      // referrerPolicy: "unsafe-url",
    },
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  }),
  cache: new InMemoryCache(),
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <UserProvider>
          <CategoriesProvider>
            <CartProvider>
              <App />
            </CartProvider>
          </CategoriesProvider>
        </UserProvider>
      </BrowserRouter>
    </ApolloProvider>
  </StrictMode>
);
