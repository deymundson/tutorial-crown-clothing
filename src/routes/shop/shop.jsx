import { Routes, Route } from "react-router";
import { CategoriesPreview } from "../categories-preview";
import { Category } from "../category";

import "./shop.scss";

export const Shop = () => {
  return (
    <Routes>
      <Route index element={<CategoriesPreview />} />
      <Route path=":category" element={<Category />} />
    </Routes>
  );
};
