import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { addItemToCart, selectCartItems } from "../store";
import { Button } from "./button";

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  height: 350px;
  align-items: center;
  position: relative;

  img {
    width: 100%;
    height: 95%;
    object-fit: cover;
    margin-bottom: 5px;
  }

  button {
    width: 80%;
    opacity: 0.7;
    position: absolute;
    top: 255px;
    display: none;
  }

  &:hover {
    img {
      opacity: 0.8;
    }

    button {
      opacity: 0.85;
      display: flex;
    }
  }
`;

const Footer = styled.div`
  width: 100%;
  height: 5%;
  display: flex;
  justify-content: space-between;
  font-size: 18px;

  & :first-child {
    width: 90%;
    margin-bottom: 15px;
  }

  & :last-child {
    width: 10%;
  }
`;

export const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const { name, price, imageUrl } = product;

  const cartItems = useSelector(selectCartItems);

  const handleClick = () => dispatch(addItemToCart(cartItems, product));

  return (
    <Container>
      <img src={imageUrl} />
      <Footer>
        <span>{name}</span>
        <span>{price}</span>
      </Footer>
      <Button buttonType="inverted" onClick={handleClick}>
        Add to cart
      </Button>
    </Container>
  );
};
