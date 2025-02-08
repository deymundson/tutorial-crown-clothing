import { useContext, useEffect, useState } from "react";
import { ProductCard } from "../../components";
import { CategoriesContext } from "../../contexts";
import { useParams } from "react-router";

import "./category.scss";

export const Category = () => {
  const { category } = useParams();
  const { categories } = useContext(CategoriesContext);

  const [products, setProducts] = useState([]);

  useEffect(() => {
    setProducts(categories[category] || []);
  }, [categories, category]);

  return (
    <>
      <h2 className="category-title">{category}</h2>
      <div className="category">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </>
  );
};
