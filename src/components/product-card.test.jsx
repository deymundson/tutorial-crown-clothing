import { fireEvent, screen } from "@testing-library/react";
import { renderWithProviders } from "../../tests/provider-render";
import { ProductCard } from "./product-card";
import { describe, expect } from "vitest";

describe("ProductCard", () => {
  test("adds the product item with the Product Card button is clicked", async () => {
    const mockProduct = {
      id: 1,
      imageUrl: "test",
      name: "Product 1",
      price: 100,
    };
    const { store } = renderWithProviders(
      <ProductCard product={mockProduct} />,
      {
        preloadedState: { cart: { cartItems: [] } },
      }
    );
    const addToCartButton = screen.getByText(/Add to Cart/i);
    await fireEvent.click(addToCartButton);
    expect(store.getState().cart.cartItems.length).toBe(1);
  });
});
