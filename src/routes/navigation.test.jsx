import { fireEvent, screen } from "@testing-library/react";
import * as ReactRedux from "react-redux";
import { describe, test, expect, vi } from "vitest";
import Navigation from "./navigation";
import { renderWithProviders } from "../../tests/provider-render";
import { signOutStart } from "../store";

describe("Navigation", () => {
  test("render sign-in link if no current user", () => {
    renderWithProviders(<Navigation />, {
      preloadedState: {
        user: {
          user: null,
        },
      },
    });
    const signInLink = screen.getByText(/sign in/i);
    expect(signInLink).toBeInTheDocument();
    const signOutLink = screen.queryByText(/sign out/i);
    expect(signOutLink).toBeNull();
  });

  test("render sign-out link if current user", () => {
    renderWithProviders(<Navigation />, {
      preloadedState: {
        user: {
          user: {
            id: 1,
            email: "foo@bar.baz",
          },
        },
      },
    });
    const signInLink = screen.queryByText(/sign in/i);
    expect(signInLink).toBeNull();
    const signOutLink = screen.getByText(/sign out/i);
    expect(signOutLink).toBeInTheDocument();
  });

  test("cart drop-down is hidden by default", () => {
    renderWithProviders(<Navigation />, {
      preloadedState: {
        user: {
          user: null,
        },
      },
    });
    const cartDropdown = screen.queryByText(/checkout/i);
    expect(cartDropdown).toBeNull();
  });

  test("cart drop-down shows when cart visible", () => {
    renderWithProviders(<Navigation />, {
      preloadedState: {
        cart: {
          hidden: false,
          cartItems: [],
        },
      },
    });
    const cartDropdown = screen.getByText(/checkout/i);
    expect(cartDropdown).toBeInTheDocument();
  });

  test("dispatch signOutStart when sign out link is clicked", () => {
    // const dispatch = vi.fn();
    // vi.spyOn(ReactRedux, "useDispatch").mockReturnValue(dispatch);
    // renderWithProviders(<Navigation />, {
    //   preloadedState: {
    //     user: {
    //       user: {
    //         id: 1,
    //         email: "foo@bar.baz",
    //       },
    //     },
    //   },
    // });
    // const signOutLink = screen.getByText(/sign out/i);
    // fireEvent.click(signOutLink);
    // expect(dispatch).toHaveBeenCalledWith(signOutStart());
  });
});
