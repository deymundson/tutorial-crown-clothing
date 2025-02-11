import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import styled from "styled-components";
import { setCartHidden, selectCartItems, selectCartHidden } from "../store";
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
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartItems = useSelector(selectCartItems);
  const cartHidden = useSelector(selectCartHidden);

  if (cartHidden) return null;

  const onCheckout = () => {
    dispatch(setCartHidden(true));
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
