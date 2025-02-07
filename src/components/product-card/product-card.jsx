import { useContext } from "react";
import { CartContext } from "../../contexts";
import { Button } from "../button";

import "./product-card.scss";

export const ProductCard = ({ product }) => {
  const { name, price, imageUrl } = product;
  const { addItemToCart } = useContext(CartContext);

  const handleClick = () => addItemToCart(product);

  return (
    <div className="product-card">
      <img src={imageUrl} />
      <div className="footer">
        <span className="name">{name}</span>
        <span className="price">{price}</span>
      </div>
      <Button buttonType="inverted" onClick={handleClick}>
        Add to cart
      </Button>
    </div>
  );
};
