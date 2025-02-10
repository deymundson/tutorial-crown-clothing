import { useContext } from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";
import { CartContext } from "../contexts";
import { BaseButton, Button } from "./button";
import { CartItem } from "./cart-item";

const Container = styled.div`
  position: absolute;
  width: 260px;
  height: 360px;
  display: flex;
  flex-direction: column;
  padding: 20px;
  border: 1px solid black;
  background-color: white;
  top: 90px;
  right: 40px;
  z-index: 5;

  ${BaseButton} {
    margin-top: auto;
  }
`;

const CartItems = styled.div`
  height: 250px;
  display: flex;
  flex-direction: column;
  row-gap: 15px;
  overflow-x: hidden;
  overflow-y: auto;
`;

const EmptyMessage = styled.span`
  font-size: 18px;
  margin: 50px auto;
`;

export const CartDropdown = () => {
  const { hidden, hide, cartItems } = useContext(CartContext);
  const navigate = useNavigate();

  if (hidden) return null;

  const onCheckout = () => {
    hide();
    navigate("/checkout");
  };

  return (
    <Container>
      <CartItems>
        {cartItems.length ? (
          cartItems.map((item) => <CartItem key={item.id} cartItem={item} />)
        ) : (
          <EmptyMessage>Your cart is empty</EmptyMessage>
        )}
      </CartItems>
      <Button type="button" onClick={onCheckout}>
        Checkout
      </Button>
    </Container>
  );
};
