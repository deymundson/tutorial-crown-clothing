import { useContext } from "react";
import { CartContext } from "../../contexts";

import ShoppingBag from "../../assets/shopping-bag.svg?react";
import "./cart-icon.scss";

export const CartIcon = () => {
  const { toggleHidden, cartItems } = useContext(CartContext);

  const itemCount = cartItems.reduce(
    (total, cartItem) => total + cartItem.quantity,
    0
  );

  return (
    <div className="cart-icon" onClick={toggleHidden}>
      <ShoppingBag className="shopping-icon" />
      <span className="item-count">{itemCount}</span>
    </div>
  );
};
