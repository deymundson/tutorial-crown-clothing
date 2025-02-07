import { useContext } from "react";
import { CartContext } from "../../contexts";
import { Button } from "../button";

import "./cart-dropdown.scss";

export const CartDropdown = () => {
  const { hidden } = useContext(CartContext);

  if (hidden) return null;

  return (
    <div className="cart-dropdown">
      <div className="cart-items"></div>
      <Button>Checkout</Button>
    </div>
  );
};
