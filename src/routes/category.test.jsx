import { screen } from "@testing-library/react";
import { Category } from "./category";
import { renderWithProviders } from "../../tests/provider-render";
import { describe, vi } from "vitest";

vi.mock("react-router", async (importOriginal) => ({
  ...(await importOriginal()),
  useParams: () => ({
    category: "mens",
  }),
}));

describe("Category", () => {
  test("renders a spinner when loading", () => {
    renderWithProviders(<Category />, {
      preloadedState: {
        categories: {
          categories: [],
          isLoading: true,
        },
      },
    });
    const spinner = screen.getByTestId("spinner");
    expect(spinner).toBeInTheDocument();
  });

  test("renders no spinner when not loading", () => {
    renderWithProviders(<Category />, {
      preloadedState: {
        categories: {
          categories: [],
          isLoading: false,
        },
      },
    });
    const spinner = screen.queryByTestId("spinner");
    expect(spinner).toBeNull();
  });

  test("renders categories when not loading", () => {
    renderWithProviders(<Category />, {
      preloadedState: {
        categories: {
          categories: [
            {
              title: "Mens",
              items: [
                {
                  id: 1,
                  name: "Product 1",
                },
                {
                  id: 2,
                  name: "Product 2",
                },
              ],
            },
          ],
          isLoading: false,
        },
      },
    });
    const product1 = screen.getByText(/product 1/i);
    expect(product1).toBeInTheDocument();
  });
});
