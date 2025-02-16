import { useSelector } from "react-redux";
import styled from "styled-components";
import { CheckoutItem, PaymentForm } from "../components";
import { selectCartItems, selectCartTotal } from "../store";

const Container = styled.div`
  width: 55%;
  min-height: 90vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 50px auto 0;
`;

const HeaderRow = styled.div`
  width: 100%;
  padding: 10px 0;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid darkgrey;
`;

const HeaderBlock = styled.div`
  text-transform: capitalize;
  width: 23%;

  &:last-child {
    width: 8%;
  }
`;

const Total = styled.span`
  margin-top: 30px;
  margin-left: auto;
  font-size: 36px;
`;

const Checkout = (): JSX.Element => {
  const cartItems = useSelector(selectCartItems);
  const cartTotal = useSelector(selectCartTotal);

  return (
    <Container>
      <HeaderRow>
        <HeaderBlock>
          <span>Product</span>
        </HeaderBlock>
        <HeaderBlock>
          <span>Description</span>
        </HeaderBlock>
        <HeaderBlock>
          <span>Quantity</span>
        </HeaderBlock>
        <HeaderBlock>
          <span>Price</span>
        </HeaderBlock>
        <HeaderBlock>
          <span>Remove</span>
        </HeaderBlock>
      </HeaderRow>
      {cartItems.map((item) => (
        <CheckoutItem key={item.id} item={item} />
      ))}
      <Total>Total: ${cartTotal}</Total>
      <PaymentForm />
    </Container>
  );
};

export default Checkout;
