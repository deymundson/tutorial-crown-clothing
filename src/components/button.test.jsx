import { expect, test, describe } from "vitest";
import { render, screen } from "@testing-library/react";
import { Button } from "./button";

describe("Button", () => {
  test("render default button when no type is passed", () => {
    render(<Button>Test</Button>);
    const buttonEl = screen.getByRole("button");
    // Uses hover style
    expect(buttonEl).toHaveStyle("background-color: rgb(255, 255, 255)");
  });
  test("render based on type: default", () => {
    render(<Button buttonType="default">Test</Button>);
    const buttonEl = screen.getByRole("button");
    // Uses hover style
    expect(buttonEl).toHaveStyle("background-color: rgb(255, 255, 255)");
  });
  test("render based on type: inverted", () => {
    render(<Button buttonType="inverted">Test</Button>);
    const buttonEl = screen.getByRole("button");
    // Uses hover style
    expect(buttonEl).toHaveStyle("background-color: rgb(0, 0, 0)");
  });
  test("render based on type: google", () => {
    render(<Button buttonType="google">Test</Button>);
    const buttonEl = screen.getByRole("button");
    // Uses hover style
    expect(buttonEl).toHaveStyle("background-color: rgb(53, 122, 232)");
  });
  test("is disabled when loading", () => {
    render(<Button isLoading={true}>Test</Button>);
    const buttonEl = screen.getByRole("button");
    expect(buttonEl).toBeDisabled();
  });
});
