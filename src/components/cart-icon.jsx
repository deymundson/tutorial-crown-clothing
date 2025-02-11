import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { setCartHidden, selectCartHidden, selectCartCount } from "../store";

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
  const dispatch = useDispatch();

  const cartHidden = useSelector(selectCartHidden);
  const cartCount = useSelector(selectCartCount);

  return (
    <Container onClick={() => dispatch(setCartHidden(!cartHidden))}>
      <ShoppingIcon className="shopping-icon" />
      <ItemCount>{cartCount}</ItemCount>
    </Container>
  );
};
