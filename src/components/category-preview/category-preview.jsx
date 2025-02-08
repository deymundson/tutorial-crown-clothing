import { Link } from "react-router";
import { ProductCard } from "../product-card";

import "./category-preview.scss";

export const CategoryPreview = ({ title, products }) => {
  return (
    <div className="category-preview">
      <h2>
        <Link to={`./${title}`} className="title">
          {title}
        </Link>
      </h2>
      <div className="products-container">
        {products
          .filter((_, index) => index < 4)
          .map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </div>
    </div>
  );
};
