import { createContext, useEffect, useState } from "react";
import { getCategoriesAndDocuments } from "../backend/firebase";

export const CategoriesContext = createContext({
  categories: {},
});

export const CategoriesProvider = ({ children }) => {
  const [categories, setCategories] = useState({});

  useEffect(() => {
    (async () => {
      setCategories(await getCategoriesAndDocuments());
    })();
  }, []);

  return (
    <CategoriesContext.Provider value={{ categories }}>
      {children}
    </CategoriesContext.Provider>
  );
};
