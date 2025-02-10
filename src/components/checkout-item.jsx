import { useContext } from "react";
import styled from "styled-components";
import { CartContext } from "../contexts";

const ItemRow = styled.div`
  width: 100%;
  display: flex;
  min-height: 100px;
  border-bottom: 1px solid darkgrey;
  padding: 15px 0;
  font-size: 20px;
  align-items: center;
`;

const ItemBlock = styled.div`
  width: 23%;
`;

const ImageContainer = styled(ItemBlock)`
  padding-right: 15px;

  & img {
    width: 100%;
    height: 100%;
  }
`;

const QuantityContainer = styled(ItemBlock)`
  display: flex;

  & div:nth-child(2) {
    margin: 0 10px;
  }

  & div:first-child,
  & div:last-child {
    cursor: pointer;
  }
`;

const RemoveButton = styled.div`
  padding-left: 12px;
  font-weight: 700;
  cursor: pointer;
`;

export const CheckoutItem = ({ item }) => {
  const { name, imageUrl, price, quantity } = item;

  const { addProductToCart, removeItemFromCart, clearItemFromCart } =
    useContext(CartContext);

  const addItemHandler = () => addProductToCart(item);
  const removeItemHandler = () => removeItemFromCart(item);
  const clearItemHandler = () => clearItemFromCart(item);

  return (
    <ItemRow>
      <ImageContainer>
        <img src={imageUrl} alt={name} />
      </ImageContainer>
      <ItemBlock as="span">{name}</ItemBlock>
      <QuantityContainer>
        <div onClick={removeItemHandler}>&#10094;</div>
        <div>{quantity}</div>
        <div onClick={addItemHandler}>&#10095;</div>
      </QuantityContainer>
      <ItemBlock as="span">{price}</ItemBlock>
      <RemoveButton onClick={clearItemHandler}>&#10005;</RemoveButton>
    </ItemRow>
  );
};
