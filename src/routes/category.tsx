import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import styled from "styled-components";
import { ProductCard, Spinner } from "../components";
import {
  selectCategoriesByTitle,
  selectCategoriesLoading,
  CategoryItem,
} from "../store";

const Title = styled.h2`
  font-size: 28px;
  text-align: center;
  margin-bottom: 25px;
  text-transform: uppercase;
`;

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  column-gap: 20px;
  row-gap: 50px;
`;

type RouteParams = {
  category: string;
};

export const Category = (): JSX.Element => {
  const { category } = useParams<RouteParams>() as RouteParams;
  const categories = useSelector(selectCategoriesByTitle);
  const loading = useSelector(selectCategoriesLoading);

  const [products, setProducts] = useState<CategoryItem[]>([]);

  useEffect(() => {
    setProducts(categories[category] || []);
  }, [categories, category]);

  return (
    <>
      <Title>{category}</Title>
      {loading ? (
        <Spinner />
      ) : (
        <Container>
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </Container>
      )}
    </>
  );
};
