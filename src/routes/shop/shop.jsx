import { useContext } from "react";
import { ProductCard } from "../../components";
import { ProductsContext } from "../../contexts";

import "./shop.scss";

export const Shop = () => {
  const { products } = useContext(ProductsContext);

  return (
    <div className="shop">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};
