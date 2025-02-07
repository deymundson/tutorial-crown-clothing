import { useContext } from "react";
import { CartContext } from "../../contexts";
import { Button } from "../button";
import { CartItem } from "../cart-item";

import "./cart-dropdown.scss";

export const CartDropdown = () => {
  const { hidden, cartItems } = useContext(CartContext);

  if (hidden) return null;

  return (
    <div className="cart-dropdown">
      <div className="cart-items">
        {cartItems.map((item) => (
          <CartItem key={item.id} cartItem={item} />
        ))}
      </div>
      <Button>Checkout</Button>
    </div>
  );
};
