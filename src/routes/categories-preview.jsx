import { Fragment } from "react";
import { useSelector } from "react-redux";
import { CategoryPreview } from "../components";
import { selectCategoriesByTitle } from "../store";

export const CategoriesPreview = () => {
  const categories = useSelector(selectCategoriesByTitle);

  return (
    <Fragment>
      {Object.keys(categories).map((title) => {
        const products = categories[title];
        return (
          <CategoryPreview key={title} title={title} products={products} />
        );
      })}
    </Fragment>
  );
};
