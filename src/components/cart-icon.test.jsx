import { expect, test, describe } from "vitest";
import { render, screen } from "@testing-library/react";
import { renderWithProviders } from "../../tests/provider-render";
import { CartIcon } from "./cart-icon";

describe("CartIcon", () => {
  test("Uses preloaded state to render", () => {
    const initialCartItems = [
      {
        id: 1,
        name: "Test Product",
        imageUrl: "test",
        price: 100,
        quantity: 1,
      },
      {
        id: 2,
        name: "Test Product 2",
        imageUrl: "test",
        price: 100,
        quantity: 2,
      },
    ];
    renderWithProviders(<CartIcon />, {
      preloadedState: {
        cart: {
          cartItems: initialCartItems,
        },
      },
    });
    const cartIconEl = screen.getByText("3");
    expect(cartIconEl).toBeInTheDocument();
  });
});
