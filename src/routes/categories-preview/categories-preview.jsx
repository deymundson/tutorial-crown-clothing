import { Fragment, useContext } from "react";
import { CategoryPreview } from "../../components";
import { CategoriesContext } from "../../contexts";

export const CategoriesPreview = () => {
  const { categories } = useContext(CategoriesContext);

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
