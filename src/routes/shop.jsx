import { useEffect } from "react";
import { Routes, Route } from "react-router";
import { useDispatch } from "react-redux";
import { getCategoriesAndDocuments } from "../backend/firebase";
import { setCategories } from "../store";
import { CategoriesPreview } from "./categories-preview";
import { Category } from "./category";

export const Shop = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const categories = await getCategoriesAndDocuments();
      dispatch(setCategories(categories));
    })();
  }, []);

  return (
    <Routes>
      <Route index element={<CategoriesPreview />} />
      <Route path=":category" element={<Category />} />
    </Routes>
  );
};
