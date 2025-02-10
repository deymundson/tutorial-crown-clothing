import { useContext } from "react";
import styled from "styled-components";
import { CartContext } from "../contexts";

import ShoppingBag from "../assets/shopping-bag.svg?react";

const Container = styled.div`
  width: 45px;
  height: 45px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const ShoppingIcon = styled(ShoppingBag)`
  width: 24px;
  height: 24px;
`;

const ItemCount = styled.span`
  position: absolute;
  font-size: 10px;
  font-weight: bold;
  bottom: 12px;
`;

export const CartIcon = () => {
  const { toggleHidden, cartItems } = useContext(CartContext);

  const itemCount = cartItems.reduce(
    (total, cartItem) => total + cartItem.quantity,
    0
  );

  return (
    <Container onClick={toggleHidden}>
      <ShoppingIcon className="shopping-icon" />
      <ItemCount>{itemCount}</ItemCount>
    </Container>
  );
};
