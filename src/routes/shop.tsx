import { useEffect } from "react";
import { Routes, Route } from "react-router";
import { useDispatch } from "react-redux";
import { fetchCategoriesStart } from "../store";
import { CategoriesPreview } from "./categories-preview";
import { Category } from "./category";

const Shop = (): JSX.Element => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategoriesStart());
  }, []);

  return (
    <Routes>
      <Route index element={<CategoriesPreview />} />
      <Route path=":category" element={<Category />} />
    </Routes>
  );
};

export default Shop;
