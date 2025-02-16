import { Fragment } from "react";
import { useSelector } from "react-redux";
import { CategoryPreview, Spinner } from "../components";
import { selectCategoriesByTitle, selectCategoriesLoading } from "../store";

export const CategoriesPreview = (): JSX.Element => {
  const categories = useSelector(selectCategoriesByTitle);
  const loading = useSelector(selectCategoriesLoading);

  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        Object.keys(categories).map((title) => {
          const products = categories[title];
          return (
            <CategoryPreview key={title} title={title} products={products} />
          );
        })
      )}
    </Fragment>
  );
};
