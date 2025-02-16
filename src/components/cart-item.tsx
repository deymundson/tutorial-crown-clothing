import { memo } from "react";
import styled from "styled-components";
import { CartItem as CartItemData } from "../store";

const Container = styled.div`
  width: 100%;
  display: flex;
  height: 80px;

  & img {
    width: 30%;
  }
`;

const ItemDetails = styled.div`
  width: 70%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding: 10px 20px;
`;

const Name = styled.span`
  font-size: 16px;
`;

type Props = {
  cartItem: CartItemData;
};

export const CartItem = memo(({ cartItem }: Props): JSX.Element => {
  const { name, imageUrl, price, quantity } = cartItem;
  return (
    <Container>
      <img src={imageUrl} />
      <ItemDetails>
        <Name>{name}</Name>
        <span>
          {quantity} x ${price}
        </span>
      </ItemDetails>
    </Container>
  );
});
