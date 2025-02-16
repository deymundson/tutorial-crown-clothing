import { createContext, useEffect, useState } from "react";
import { gql, useQuery } from "@apollo/client";
// import { getCategoriesAndDocuments } from "../backend/firebase";

export const CategoriesContext = createContext({
  categories: {},
});

const COLLECTIONS = gql`
  query GetCollections {
    collections {
      id
      title
      items {
        id
        name
        price
        imageUrl
      }
    }
  }
`;

export const CategoriesProvider = ({ children }) => {
  const { loading, error, data } = useQuery(COLLECTIONS);
  const [categories, setCategories] = useState({});

  console.log(data);

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
