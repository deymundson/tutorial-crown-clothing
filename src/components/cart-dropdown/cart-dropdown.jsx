import { useContext } from "react";
import { useNavigate } from "react-router";
import { CartContext } from "../../contexts";
import { Button } from "../button";
import { CartItem } from "../cart-item";

import "./cart-dropdown.scss";

export const CartDropdown = () => {
  const { hidden, hide, cartItems } = useContext(CartContext);
  const navigate = useNavigate();

  if (hidden) return null;

  const onCheckout = () => {
    hide();
    navigate("/checkout");
  };

  return (
    <div className="cart-dropdown">
      <div className="cart-items">
        {cartItems.map((item) => (
          <CartItem key={item.id} cartItem={item} />
        ))}
      </div>
      <Button type="button" onClick={onCheckout}>
        Checkout
      </Button>
    </div>
  );
};
