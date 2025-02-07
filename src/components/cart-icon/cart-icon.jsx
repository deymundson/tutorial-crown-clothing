import { useContext } from "react";
import { CartContext } from "../../contexts";

import ShoppingBag from "../../assets/shopping-bag.svg?react";
import "./cart-icon.scss";

export const CartIcon = () => {
  const { toggleHidden } = useContext(CartContext);

  return (
    <div className="cart-icon" onClick={toggleHidden}>
      <ShoppingBag className="shopping-icon" />
      <span className="item-count">0</span>
    </div>
  );
};
